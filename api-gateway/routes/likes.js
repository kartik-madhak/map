// import users proto
const grpc = require("@grpc/grpc-js");
const likeServices = require("../proto/like_grpc_pb");
const likeMessages = require("../proto/like_pb");
const likeClient = new likeServices.LikeSvcClient(
	process.env.LIKE_ADDR,
	grpc.credentials.createInsecure()
);

const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {

    const createRequest = new likeMessages.CreateRequest();
    createRequest.setBlogId(req.body.blogId);
	createRequest.setToken(req.headers.authorization.split(" ")[1]);

    likeClient.createLike(createRequest, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(response);
        }
    });
});

router.get("/getLikesByBlogId/:id", (req, res) => {
	let getBlogRequest = new likeMessages.GetLikeRequest();
	getBlogRequest.setId(req.params.id);

	likeClient.getLikesByBlogId(getBlogRequest, (err, response) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(response);
		}
	});
});

router.get("/getLikesByUserId/:id", (req, res) => {
	let getBlogRequest = new likeMessages.GetLikeRequest();
	getBlogRequest.setId(req.params.id);

	likeClient.getLikesByUserId(getBlogRequest, (err, response) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(response);
		}
	});
});

// export router
module.exports = router;
