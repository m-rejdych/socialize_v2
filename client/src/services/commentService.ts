import createJwtRequest from '../util/jwtRequestFactory';
import { CreateCommentReq } from '../interfaces/comment/commentReq';
import { CreateCommentRes } from '../interfaces/comment/commentRes';
import { API_URI } from '../config';

export const createComment = (
  data: CreateCommentReq,
): Promise<CreateCommentRes> =>
  createJwtRequest({
    method: 'POST',
    url: `${API_URI}/comment/create-comment`,
    body: data,
  });
