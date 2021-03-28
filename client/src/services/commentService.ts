import createJwtRequest from '../util/jwtRequestFactory';
import { CreateCommentReq } from '../interfaces/comment/commentReq';
import {
  CreateCommentRes,
  DeleteCommentRes,
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
