const blogMessages = require("./proto/blog_pb");
const userMessages = require("./proto/user_pb");
const likeMessages = require("./proto/like_pb");
const ObjectId = require("mongodb").ObjectID;

module.exports = class API {
	constructor(db, grpc, userClient, blogClient) {
		this.db = db;
		this.grpc = grpc;
		this.userClient = userClient;
		this.blogClient = blogClient;
	}

	createLike = (call, callback) => {
		const verifyRequest = new userMessages.VerifyRequest();
		verifyRequest.setToken(call.request.getToken());

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
							const like = {
								blogId: call.request.getBlogId(),
								userId: response.getId(),
								createdAt: new Date(),
							};

							// Check if like already exists
							this.db.collection("likes").findOne(
								{
									blogId: call.request.getBlogId(),
									userId: response.getId(),
								},
								(err, result) => {
									if (err) {
										callback(err, null);
									} else {
										if (result) {
											// delete like
											this.db.collection("likes").deleteOne(
												{
													_id: ObjectId(result._id),
												},
												(err, result) => {
													if (err) {
														return callback(err, null);
													}

													// return deleted like
													const like2 = new likeMessages.Like();
													like2.setId(result.deletedCount);
													like2.setBlogId(call.request.getBlogId());
													like2.setUserId(response.getId());
													like2.setCreatedAt(new Date());

													return callback(null, like2);
												}
											);
										} else {
											this.db
												.collection(process.env.TABLE_NAME)
												.insertOne(like)
												.then((r) => {
													const like2 = new likeMessages.Like();

													like2.setId(like._id.toString());
													like2.setBlogId(like.blogId);
													like2.setUserId(like.userId);
													like2.setCreatedAt(like.createdAt.toString());

													console.log(like2);

													callback(null, like2);
												});
										}
									}
								}
							);
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
	};

	getLikesByBlogId = (call, callback) => {
		this.db
			.collection(process.env.TABLE_NAME)
			.find({ blogId: call.request.getId() })
			.toArray((err, result) => {
				if (err) {
					callback(err, null);
				} else {
					const likeList = new likeMessages.LikeList();
					const likes = [];

					result.forEach((like) => {
						const like2 = new likeMessages.Like();

						like2.setId(like._id.toString());
						like2.setBlogId(like.blogId);
						like2.setUserId(like.userId);
						like2.setCreatedAt(like.createdAt.toString());

						likes.push(like2);
					});

					likeList.setLikesList(likes);
					callback(null, likeList);
				}
			});
	};

	getLikesByUserId = (call, callback) => {
		this.db
			.collection(process.env.TABLE_NAME)
			.find({ userId: call.request.getId() })
			.toArray((err, result) => {
				if (err) {
					callback(err, null);
				} else {
					const likeList = new likeMessages.LikeList();
					const likes = [];

					result.forEach((like) => {
						const like2 = new likeMessages.Like();

						like2.setId(like._id.toString());
						like2.setBlogId(like.blogId);
						like2.setUserId(like.userId);
						like2.setCreatedAt(like.createdAt.toString());

						likes.push(like2);
					});

					likeList.setLikesList(likes);
					callback(null, likeList);
				}
			});
	};
};
