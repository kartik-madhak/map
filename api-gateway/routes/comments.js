// import users proto
const grpc = require("@grpc/grpc-js");
const commentServices = require("../proto/comment_grpc_pb");
const commentMessages = require("../proto/comment_pb");
const commentClient = new commentServices.CommentSvcClient(
	process.env.COMMENT_ADDR,
	grpc.credentials.createInsecure()
);

const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
	const createRequest = new commentMessages.CreateRequest();
	createRequest.setBlogId(req.body.blogId);
	createRequest.setToken(req.headers.authorization.split(" ")[1]);
	createRequest.setContent(req.body.content);

	commentClient.createComment(createRequest, (err, response) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(response);
		}
	});
});

router.get("/getCommentByBlogId/:id", (req, res) => {
	let getBlogRequest = new commentMessages.GetCommentRequest();
	getBlogRequest.setId(req.params.id);

	commentClient.getCommentsByBlogId(getBlogRequest, (err, response) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(response);
		}
	});
});

router.get("/getCommentByUserId/:id", (req, res) => {
	let getBlogRequest = new commentMessages.GetCommentRequest();
	getBlogRequest.setId(req.params.id);

	commentClient.getCommentsByUserId(getBlogRequest, (err, response) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(response);
		}
	});
});

// export router
module.exports = router;
