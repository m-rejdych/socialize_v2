import createJwtRequest from '../util/jwtRequestFactory';
import { CreatePostReq } from '../interfaces/post/postReq';
import { CreatePostRes, GetFeedRes } from '../interfaces/post/postRes';
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
