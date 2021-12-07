const bcrypt = require("bcrypt");
const blogMessages = require("./proto/blog_pb");
const userMessages = require("./proto/user_pb");
const ObjectId = require("mongodb").ObjectID;

module.exports = class API {
	constructor(db, grpc, userClient) {
		this.db = db;
		this.grpc = grpc;
		this.userClient = userClient;
	}

	createBlog = (call, callback) => {
		const blogRequest = call.request;

		const verifyRequest = new userMessages.VerifyRequest();
		verifyRequest.setToken(blogRequest.getToken());

		this.userClient.verify(verifyRequest, (err, response) => {
			if (err) {
				callback(err, null);
			} else {
                const blog = {
                    title: blogRequest.getTitle(),
                    content: blogRequest.getContent(),
                    createdAt: new Date(),
                    userId: response.array[0]
                }

				this.db
					.collection(process.env.TABLE_NAME)
					.insertOne(blog)
					.then((r) => {

                        const blog2 = new blogMessages.Blog();
                        // console.log('blog', blog)

						blog2.setId(blog._id.toString());
						blog2.setTitle(blog.title);
						blog2.setContent(blog.content);
						blog2.setUserid(blog.userId);
						blog2.setCreatedat(blog.createdAt.toString());

                        // console.log('blog2', blog2)
						callback(null, blog2);
					});
			}
		});
	};

	getBlogs = (call, callback) => {

		this.db
			.collection(process.env.TABLE_NAME)
			.find()
			.toArray((err, result) => {
				if (err) {
					callback(err, null);
				} else {

                    const blogList = new blogMessages.BlogList();
            		const blogs = [];

					for (let i = 0; i < result.length; i++) {
						const blog = new blogMessages.Blog();

                        console.log(result[i])

						blog.setId(result[i]._id.toString());
						blog.setTitle(result[i].title);
						blog.setContent(result[i].content);
						blog.setUserid(result[i].userId);
						blog.setCreatedat(result[i].createdAt.toString());

						blogs.push(blog);
					}

                    blogList.setBlogList(blogs);
					callback(null, blogList);
				}
			});
	};

	getBlogsByUserId = (call, callback) => {
		this.db
		.collection(process.env.TABLE_NAME)
		.find({ userId: call.request.array[0] })
		.toArray((err, result) => {
			if (err) {
				callback(err, null);
			} else {

				const blogList = new blogMessages.BlogList();
				const blogs = [];

				for (let i = 0; i < result.length; i++) {
					const blog = new blogMessages.Blog();

					console.log(result[i])

					blog.setId(result[i]._id.toString());
					blog.setTitle(result[i].title);
					blog.setContent(result[i].content);
					blog.setUserid(result[i].userId);
					blog.setCreatedat(result[i].createdAt.toString());

					blogs.push(blog);
				}

				blogList.setBlogList(blogs);
				callback(null, blogList);
			}
		});
	};

	blogExists = (call, callback) => {
		this.db
			.collection(process.env.TABLE_NAME)
			.findOne({ _id: new ObjectId(call.request.getId()) }, (err, result) => {
				if (err) {
					callback(err, null);
				} else {
                    const blogExists = new blogMessages.GetBlogExistsResponse();
                    blogExists.setExists(result != null);
                    callback(null, blogExists);
				}
			});
	};
};
