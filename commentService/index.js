require('dotenv').config();
const grpc = require('@grpc/grpc-js');
const { MongoClient } = require("mongodb");
const userServices = require('./proto/user_grpc_pb');
const blogServices = require('./proto/blog_grpc_pb');
const commentServices = require('./proto/comment_grpc_pb');
const API = require("./api");

// Mongo Connection
const dbClient = new MongoClient(process.env.DB_URI, { useUnifiedTopology: true });
let api = null;

async function connectDB() {
    try {
        await dbClient.connect();
        let db = await dbClient.db(process.env.DB_NAME);
        db.command({ ping: 1 });
        console.log("Connected successfully to mongo server");
        // Create index
        await db.collection(process.env.TABLE_NAME);

        const userClient = new userServices.UserSvcClient(process.env.USER_ADDR, grpc.credentials.createInsecure());
        const blogClient = new blogServices.BlogSvcClient(process.env.BLOG_ADDR, grpc.credentials.createInsecure());

        // Init api
        api = new API(db, grpc, userClient, blogClient);
    } catch (e) {
        console.error(e);
    }
}

async function main() {
    await connectDB().catch(console.dir);
    let server = new grpc.Server();
    server.addService(commentServices.CommentSvcService, {
        createComment: api.createComment,
        getCommentsByBlogId: api.getCommentsByBlogId,
        getCommentsByUserId: api.getCommentsByUserId,
    });
    let address = process.env.HOST + ":" + process.env.PORT;
    server.bindAsync(address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log("Blog service running at " + address);
    });
}

main();