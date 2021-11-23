// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var like_pb = require('./like_pb.js');

function serialize_CreateRequest(arg) {
  if (!(arg instanceof like_pb.CreateRequest)) {
    throw new Error('Expected argument of type CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateRequest(buffer_arg) {
  return like_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetLikeRequest(arg) {
  if (!(arg instanceof like_pb.GetLikeRequest)) {
    throw new Error('Expected argument of type GetLikeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetLikeRequest(buffer_arg) {
  return like_pb.GetLikeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Like(arg) {
  if (!(arg instanceof like_pb.Like)) {
    throw new Error('Expected argument of type Like');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Like(buffer_arg) {
  return like_pb.Like.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_LikeList(arg) {
  if (!(arg instanceof like_pb.LikeList)) {
    throw new Error('Expected argument of type LikeList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LikeList(buffer_arg) {
  return like_pb.LikeList.deserializeBinary(new Uint8Array(buffer_arg));
}


var LikeSvcService = exports.LikeSvcService = {
  createLike: {
    path: '/LikeSvc/createLike',
    requestStream: false,
    responseStream: false,
    requestType: like_pb.CreateRequest,
    responseType: like_pb.Like,
    requestSerialize: serialize_CreateRequest,
    requestDeserialize: deserialize_CreateRequest,
    responseSerialize: serialize_Like,
    responseDeserialize: deserialize_Like,
  },
  getLikesByBlogId: {
    path: '/LikeSvc/getLikesByBlogId',
    requestStream: false,
    responseStream: false,
    requestType: like_pb.GetLikeRequest,
    responseType: like_pb.LikeList,
    requestSerialize: serialize_GetLikeRequest,
    requestDeserialize: deserialize_GetLikeRequest,
    responseSerialize: serialize_LikeList,
    responseDeserialize: deserialize_LikeList,
  },
  getLikesByUserId: {
    path: '/LikeSvc/getLikesByUserId',
    requestStream: false,
    responseStream: false,
    requestType: like_pb.GetLikeRequest,
    responseType: like_pb.LikeList,
    requestSerialize: serialize_GetLikeRequest,
    requestDeserialize: deserialize_GetLikeRequest,
    responseSerialize: serialize_LikeList,
    responseDeserialize: deserialize_LikeList,
  },
};

exports.LikeSvcClient = grpc.makeGenericClientConstructor(LikeSvcService);
