// import users proto
const grpc = require("@grpc/grpc-js");
const userServices = require("../proto/user_grpc_pb");
const userMessages = require("../proto/user_pb");
const userClient = new userServices.UserSvcClient(
	process.env.USER_ADDR,
	grpc.credentials.createInsecure()
);

// import express
const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
	console.log(req.body);

	let registerReq = new userMessages.RegisterRequest();
	registerReq.setName(req.body.name);
	registerReq.setEmail(req.body.email);
	registerReq.setPassword(req.body.password);

	console.log("CAME HERE1");

	userClient.register(registerReq, function (err, response) {
		if (err) {
			console.log("CAME HERE2");
			return res.send({ response: {}, err: err });
		}
		console.log("CAME HERE3");
		return res.send({
			response: {
				token: response.getToken(),
			},
		});
	});
});

router.post("/login", (req, res) => {
	let loginReq = new userMessages.LoginRequest();
	loginReq.setEmail(req.body.email);
	loginReq.setPassword(req.body.password);

	userClient.login(loginReq, function (err, response) {
		if (err) {
			return res.send({ response: {}, err: err });
		}
		return res.send({
			response: {
				token: response.getToken(),
			},
		});
	});
});

router.post("/verify", (req, res) => {
	let verifyReq = new userMessages.VerifyRequest();
	verifyReq.setToken(req.headers.authorization.split(" ")[1]);

	userClient.verify(verifyReq, function (err, response) {
		if (err) {
			return res.send({ response: {}, err: err });
		}
		return res.send({
			id: response.getId(),
			name: response.getName(),
			email: response.getEmail(),
		});
	});
});

router.get("/:id", (req, res) => {
	let getUserReq = new userMessages.GetUserRequest();
	getUserReq.setUserId(req.params.id);

	userClient.getUser(getUserReq, function (err, response) {
		if (err) {
			return res.send({ response: {}, err: err });
		}
		return res.send({
			id: response.getId(),
			name: response.getName(),
			email: response.getEmail(),
		});
	});
});

router.post("/example", (req, res) => {
	res.send({
		message: "aHello World!",
		body: req.body,
	});
});

router.get("/example2", (req, res) => {
	res.send({
		message: "aHello World!",
		body: req.body,
	});
});

// export router
module.exports = router;
