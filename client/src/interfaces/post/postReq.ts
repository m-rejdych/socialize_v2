import { ReactionName } from '../reactionType/reactionType';

export interface CreatePostReq {
  title: string;
  content: string;
}

export interface UpdatePostReq {
  id: number;
  title?: string;
  content?: string;
}

export interface AddPostReactionReq {
  postId: number;
  reactionName: ReactionName;
}
