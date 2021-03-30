import createJwtRequest from '../util/jwtRequestFactory';
import {
  CreateCommentReq,
  AddCommentReactionReq,
} from '../interfaces/comment/commentReq';
import {
  CreateCommentRes,
  DeleteCommentRes,
  DeleteCommentReactionRes,
} from '../interfaces/comment/commentRes';
import { API_URI } from '../config';

export const createComment = (
  data: CreateCommentReq,
): Promise<CreateCommentRes> =>
  createJwtRequest({
    method: 'POST',
    url: `${API_URI}/comment/create-comment`,
    body: data,
  });

export const deleteComment = (id: number): Promise<DeleteCommentRes> =>
  createJwtRequest({
    method: 'DELETE',
    url: `${API_URI}/comment/delete-comment?commentId=${id}`,
  });

export const addCommentReaction = (
  data: AddCommentReactionReq,
): Promise<CreateCommentRes> =>
  createJwtRequest<CreateCommentRes>({
    method: 'PUT',
    url: `${API_URI}/comment/add-reaction`,
    body: data,
  });

export const deleteCommentReaction = (
  commentId: number,
): Promise<DeleteCommentReactionRes> =>
  createJwtRequest<DeleteCommentReactionRes>({
    method: 'DELETE',
    url: `${API_URI}/comment/delete-reaction?commentId=${commentId}`,
  });
