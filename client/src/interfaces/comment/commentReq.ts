import { ReactionName } from '../reactionType/reactionType';

export interface CreateCommentReq {
  postId: number;
  content: string;
}

export interface AddCommentReactionReq {
  commentId: number;
  reactionName: ReactionName;
}
