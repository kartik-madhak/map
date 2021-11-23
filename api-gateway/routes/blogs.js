// import users proto
const grpc = require("@grpc/grpc-js");
const blogServices = require("../proto/blog_grpc_pb");
const blogMessages = require("../proto/blog_pb");
const blogClient = new blogServices.BlogSvcClient(
	process.env.BLOG_ADDR,
	grpc.credentials.createInsecure()
);

const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
    let createRequest = new blogMessages.CreateBlogRequest();
    createRequest.setTitle(req.body.title);
    createRequest.setContent(req.body.content);

    if (!req.headers.authorization)
        return res.status(401).send("Unauthorized");

    createRequest.setToken(req.headers.authorization.split(" ")[1]);

    blogClient.createBlog(createRequest, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(response);
        }
    });
});

router.get('/', (req, res) => {

    let empty = new blogMessages.Empty();

    blogClient.getBlogs(empty, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(response);
        }
    });
});

router.get('/:id', (req, res) => {

    let getBlogRequest = new blogMessages.GetBlogRequest();
    getBlogRequest.setId(req.params.id);

    blogClient.getBlogsByUserId(getBlogRequest, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(response);
        }
    });
});

router.post('/exists', (req, res) => {

    let getBlogRequest = new blogMessages.GetBlogRequest();
    getBlogRequest.setId(req.body.id);

    blogClient.blogExists(getBlogRequest, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(response);
        }
    });
});

router.post("/example", (req, res) => {
	res.send({
		message: "aHello World!",
		body: req.body,
	});
});

// export router
module.exports = router;
