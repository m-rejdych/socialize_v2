export type ChatName = 'friend' | 'group';

export default interface ChatType {
  id: number;
  name: ChatName;
}
