import createJwtRequest from '../util/jwtRequestFactory';
import {
  CreatePostReq,
  UpdatePostReq,
  AddPostReactionReq,
} from '../interfaces/post/postReq';
import {
  CreatePostRes,
  GetFeedRes,
  DeletePostRes,
  DeletePostReactionRes,
} from '../interfaces/post/postRes';
import { API_URI } from '../config';

export const createPost = (data: CreatePostReq): Promise<CreatePostRes> =>
  createJwtRequest<CreatePostRes>({
    url: `${API_URI}/post/create-post`,
    method: 'POST',
    body: data,
  });

export const getFeed = (): Promise<GetFeedRes> =>
  createJwtRequest<GetFeedRes>({
    method: 'GET',
    url: `${API_URI}/post/get-feed`,
  });

export const getPost = (postId: number): Promise<CreatePostRes> =>
  createJwtRequest({
    method: 'GET',
    url: `${API_URI}/post/get-post?postId=${postId}`,
  });

export const updatePost = (data: UpdatePostReq): Promise<CreatePostRes> =>
  createJwtRequest<CreatePostRes>({
    method: 'PUT',
    url: `${API_URI}/post/update-post`,
    body: data,
  });

export const deletePost = (id: number): Promise<DeletePostRes> =>
  createJwtRequest<DeletePostRes>({
    method: 'DELETE',
    url: `${API_URI}/post/delete-post?postId=${id}`,
  });

export const addPostReaction = (
  data: AddPostReactionReq,
): Promise<CreatePostRes> =>
  createJwtRequest({
    method: 'PUT',
    url: `${API_URI}/post/add-reaction`,
    body: data,
  });

export const deletePostReaction = (
  postId: number,
): Promise<DeletePostReactionRes> =>
  createJwtRequest({
    method: 'DELETE',
    url: `${API_URI}/post/delete-reaction?postId=${postId}`,
  });
