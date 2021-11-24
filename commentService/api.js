const blogMessages = require("./proto/blog_pb");
const userMessages = require("./proto/user_pb");
const commentMessages = require("./proto/comment_pb");
const ObjectId = require("mongodb").ObjectID;

module.exports = class API {
	constructor(db, grpc, userClient, blogClient) {
		this.db = db;
		this.grpc = grpc;
		this.userClient = userClient;
		this.blogClient = blogClient
	}

	createComment = (call, callback) => {
		// const commentRequest = call.request.;
		const verifyRequest = new userMessages.VerifyRequest();
		verifyRequest.setToken(call.request.getToken());

		console.log("HERE IS THE CONTENT:", call);

		this.userClient.verify(verifyRequest, (err, response) => {
			if (err) {
				callback(err, null);
			} else {

				let getBlogRequest = new blogMessages.GetBlogRequest();
				getBlogRequest.setId(call.request.getBlogId());
				this.blogClient.blogExists(getBlogRequest, (err, response2) => {

					if (err) {

						callback(err, null);
					} else {

						if (response2.getExists()) {
							const comment = {
								blogId: call.request.getBlogId(),
								userId: response.getId(),
								content: call.request.getContent(),
								createdAt: new Date()
							}

							this.db
								.collection(process.env.TABLE_NAME)
								.insertOne(comment)
								.then((r) => {
									const comment2 = new commentMessages.Comment();

									comment2.setId(comment._id.toString());
									comment2.setBlogId(comment.blogId);
									comment2.setUserId(comment.userId);
									comment2.setContent(comment.content);
									comment2.setCreatedAt(comment.createdAt.toString());

									console.log(comment2)

									callback(null, comment2);
								});
							} else {
								callback({
									code: this.grpc.status.UNAUTHENTICATED,
									message: "Invalid Blog ID",
								});
							}
					}
				});
			}
		});
	}


	getCommentsByBlogId = (call, callback) => {
		this.db
			.collection(process.env.TABLE_NAME)
			.find({ blogId: call.request.getId() })
			.toArray((err, result) => {
				if (err) {
					callback(err, null);
				} else {

					const commentList = new commentMessages.CommentList();
					const comments = [];

					result.forEach((comment) => {
						const comment2 = new commentMessages.Comment();

						comment2.setId(comment._id.toString());
						comment2.setBlogId(comment.blogId);
						comment2.setUserId(comment.userId);
						comment2.setContent(comment.content);
						comment2.setCreatedAt(comment.createdAt.toString());

						comments.push(comment2);
					});

					commentList.setCommentsList(comments);
					callback(null, commentList);
				}
			});
	}

	getCommentsByUserId = (call, callback) => {
		this.db
			.collection(process.env.TABLE_NAME)
			.find({ userId: call.request.getId() })
			.toArray((err, result) => {
				if (err) {
					callback(err, null);
				} else {

					const commentList = new commentMessages.CommentList();
					const comments = [];

					result.forEach((comment) => {
						const comment2 = new commentMessages.Comment();

						comment2.setId(comment._id.toString());
						comment2.setBlogId(comment.blogId);
						comment2.setUserId(comment.userId);
						comment2.setContent(comment.content);
						comment2.setCreatedAt(comment.createdAt.toString());

						comments.push(comment2);
					});

					commentList.setCommentsList(comments);
					callback(null, commentList);
				}
			});
	}


};
