// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var comment_pb = require('./comment_pb.js');

function serialize_Comment(arg) {
  if (!(arg instanceof comment_pb.Comment)) {
    throw new Error('Expected argument of type Comment');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Comment(buffer_arg) {
  return comment_pb.Comment.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CommentList(arg) {
  if (!(arg instanceof comment_pb.CommentList)) {
    throw new Error('Expected argument of type CommentList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CommentList(buffer_arg) {
  return comment_pb.CommentList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateRequest(arg) {
  if (!(arg instanceof comment_pb.CreateRequest)) {
    throw new Error('Expected argument of type CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateRequest(buffer_arg) {
  return comment_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetCommentRequest(arg) {
  if (!(arg instanceof comment_pb.GetCommentRequest)) {
    throw new Error('Expected argument of type GetCommentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetCommentRequest(buffer_arg) {
  return comment_pb.GetCommentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var CommentSvcService = exports.CommentSvcService = {
  createComment: {
    path: '/CommentSvc/createComment',
    requestStream: false,
    responseStream: false,
    requestType: comment_pb.CreateRequest,
    responseType: comment_pb.Comment,
    requestSerialize: serialize_CreateRequest,
    requestDeserialize: deserialize_CreateRequest,
    responseSerialize: serialize_Comment,
    responseDeserialize: deserialize_Comment,
  },
  getCommentsByBlogId: {
    path: '/CommentSvc/getCommentsByBlogId',
    requestStream: false,
    responseStream: false,
    requestType: comment_pb.GetCommentRequest,
    responseType: comment_pb.CommentList,
    requestSerialize: serialize_GetCommentRequest,
    requestDeserialize: deserialize_GetCommentRequest,
    responseSerialize: serialize_CommentList,
    responseDeserialize: deserialize_CommentList,
  },
  getCommentsByUserId: {
    path: '/CommentSvc/getCommentsByUserId',
    requestStream: false,
    responseStream: false,
    requestType: comment_pb.GetCommentRequest,
    responseType: comment_pb.CommentList,
    requestSerialize: serialize_GetCommentRequest,
    requestDeserialize: deserialize_GetCommentRequest,
    responseSerialize: serialize_CommentList,
    responseDeserialize: deserialize_CommentList,
  },
};

exports.CommentSvcClient = grpc.makeGenericClientConstructor(CommentSvcService);
