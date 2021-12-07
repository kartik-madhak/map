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


const extractLikeList = (likes) => {
	return likes.map((like) => {
		return {
			id: like.getId(),
			userId: like.getUserId(),
			blogId: like.getBlogId(),
			createdAt: like.getCreatedAt(),
		};
	});
};

router.post("/create", (req, res) => {

    const createRequest = new likeMessages.CreateRequest();
    createRequest.setBlogId(req.body.blogId);
	createRequest.setToken(req.headers.authorization.split(" ")[1]);

    likeClient.createLike(createRequest, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({
				id: response.getId(),
				userId: response.getUserId(),
				blogId: response.getBlogId(),
				createdAt: response.getCreatedAt(),
			});
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

			res.status(200).send(extractLikeList(response.getLikesList()));
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
			res.status(200).send(extractLikeList(response.getLikesList()));
		}
	});
});

// export router
module.exports = router;
