// userService/testClient.js

const messages = require("./proto/user_pb");
const services = require("./proto/user_grpc_pb");
const grpc = require("@grpc/grpc-js");

const fetch = require("node-fetch");

function main() {

	const client = new services.UserSvcClient('localhost:50051', grpc.credentials.createInsecure());

	let registerReq = new messages.RegisterRequest();
	registerReq.setName("Jenishk");
	registerReq.setEmail("jensihk@world.com");
	registerReq.setPassword("Password");
	client.register(registerReq, function(err, response) {
	    console.log(response, err);
	});
}

main();
