// userService/testClient.js

const messages = require("./proto/comment_pb");
const services = require("./proto/comment_grpc_pb");
const grpc = require("@grpc/grpc-js");

const fetch = require("node-fetch");

function main() {

	const client = new services.CommentSvcClient('localhost:50053', grpc.credentials.createInsecure());

	// let createRequest = new messages.CreateRequest();
	// createRequest.setTitle("My First Blog");
	// createRequest.setContent("This is my first blog post");
	// createRequest.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmVuaXNoayIsImVtYWlsIjoiamVuc2loa0B3b3JsZC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRUYUV5TGF4ZUNHNmZxVEI4TUlTNFN1ZThOZnRnNzJKSE1SdnJMUWJQd1pNdXpueUpONnZSeSIsIl9pZCI6IjYxOWNmMmExOGQxODM5M2Q0MGNlYjkxNiIsImlhdCI6MTYzNzY3NTY4MSwiZXhwIjoxNjQxMjc1NjgxfQ.L6biZ_odMswCpmnWqgmrkLhElzQGvjbxw4ELeRDrnY0");

	// client.createBlog(createRequest, (err, response) => {
	//     console.log(response, err);
	// });

	// let empty = new messages.Empty();
	let commentRequest = new messages.GetCommentRequest();
	commentRequest.setId('619cf1198d18393d40ceb915');

	client.getCommentsByUserId(commentRequest, (err, response) => {
		console.log(response.getCommentsList(), err);
	});
}

main();
