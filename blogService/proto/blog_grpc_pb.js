// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var blog_pb = require('./blog_pb.js');

function serialize_demo_user_Blog(arg) {
  if (!(arg instanceof blog_pb.Blog)) {
    throw new Error('Expected argument of type demo_user.Blog');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_user_Blog(buffer_arg) {
  return blog_pb.Blog.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_demo_user_BlogList(arg) {
  if (!(arg instanceof blog_pb.BlogList)) {
    throw new Error('Expected argument of type demo_user.BlogList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_user_BlogList(buffer_arg) {
  return blog_pb.BlogList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_demo_user_CreateRequest(arg) {
  if (!(arg instanceof blog_pb.CreateRequest)) {
    throw new Error('Expected argument of type demo_user.CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_user_CreateRequest(buffer_arg) {
  return blog_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_demo_user_Empty(arg) {
  if (!(arg instanceof blog_pb.Empty)) {
    throw new Error('Expected argument of type demo_user.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_user_Empty(buffer_arg) {
  return blog_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_demo_user_GetBlogExistsResponse(arg) {
  if (!(arg instanceof blog_pb.GetBlogExistsResponse)) {
    throw new Error('Expected argument of type demo_user.GetBlogExistsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_user_GetBlogExistsResponse(buffer_arg) {
  return blog_pb.GetBlogExistsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_demo_user_GetBlogRequest(arg) {
  if (!(arg instanceof blog_pb.GetBlogRequest)) {
    throw new Error('Expected argument of type demo_user.GetBlogRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_demo_user_GetBlogRequest(buffer_arg) {
  return blog_pb.GetBlogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var BlogSvcService = exports.BlogSvcService = {
  createBlog: {
    path: '/demo_user.BlogSvc/createBlog',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.CreateRequest,
    responseType: blog_pb.Blog,
    requestSerialize: serialize_demo_user_CreateRequest,
    requestDeserialize: deserialize_demo_user_CreateRequest,
    responseSerialize: serialize_demo_user_Blog,
    responseDeserialize: deserialize_demo_user_Blog,
  },
  getBlogs: {
    path: '/demo_user.BlogSvc/getBlogs',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.Empty,
    responseType: blog_pb.BlogList,
    requestSerialize: serialize_demo_user_Empty,
    requestDeserialize: deserialize_demo_user_Empty,
    responseSerialize: serialize_demo_user_BlogList,
    responseDeserialize: deserialize_demo_user_BlogList,
  },
  getBlogsByUserId: {
    path: '/demo_user.BlogSvc/getBlogsByUserId',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.GetBlogRequest,
    responseType: blog_pb.BlogList,
    requestSerialize: serialize_demo_user_GetBlogRequest,
    requestDeserialize: deserialize_demo_user_GetBlogRequest,
    responseSerialize: serialize_demo_user_BlogList,
    responseDeserialize: deserialize_demo_user_BlogList,
  },
  blogExists: {
    path: '/demo_user.BlogSvc/blogExists',
    requestStream: false,
    responseStream: false,
    requestType: blog_pb.GetBlogRequest,
    responseType: blog_pb.GetBlogExistsResponse,
    requestSerialize: serialize_demo_user_GetBlogRequest,
    requestDeserialize: deserialize_demo_user_GetBlogRequest,
    responseSerialize: serialize_demo_user_GetBlogExistsResponse,
    responseDeserialize: deserialize_demo_user_GetBlogExistsResponse,
  },
};

exports.BlogSvcClient = grpc.makeGenericClientConstructor(BlogSvcService);
