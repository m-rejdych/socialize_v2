export interface CreateMessagePayload {
  chatId: number;
  content: string;
  socket: SocketIOClient.Socket | null;
}
