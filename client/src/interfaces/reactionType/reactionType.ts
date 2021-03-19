export type ReactionName = 'like' | 'dislike' | 'love' | 'laugh' | 'idea';

export default interface ReactionType {
  id: number;
  name: ReactionName;
}
