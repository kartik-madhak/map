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

const extractCommentList = (comments) => {
	return comments.map((comment) => {
		return {
			id: comment.getId(),
			content: comment.getContent(),
			userId: comment.getUserId(),
			blogId: comment.getBlogId(),
			createdAt: comment.getCreatedAt(),
		}
	});
};

router.post("/create", (req, res) => {

	const createRequest = new commentMessages.CreateRequest();
	createRequest.setBlogId(req.body.blogId);
	createRequest.setToken(req.headers.authorization.split(" ")[1]);
	createRequest.setContent(req.body.content);

	console.log(createRequest);

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
			res.status(200).send(extractCommentList(response.getCommentsList()));
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
			res.status(200).send(extractCommentList(response.getCommentsList()));
		}
	});
});

// export router
module.exports = router;
