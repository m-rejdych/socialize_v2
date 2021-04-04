class DeleteReactionDto {
  reactionId: number;
  messageId: number;
  chatId: number;
  userId: number;
  deleted: boolean;
}

export default DeleteReactionDto;
