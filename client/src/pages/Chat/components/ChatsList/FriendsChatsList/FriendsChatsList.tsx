import { List, ListSubheader } from '@material-ui/core';

import Chat from '../../../../../interfaces/chat';
import FriendsChatsListItem from './FriendsChatsListItem';

interface Props {
  chats: Chat[];
}

const FriendsChatsList: React.FC<Props> = ({ chats }) => {
  return (
    <List subheader={<ListSubheader disableSticky>Friends</ListSubheader>}>
      {chats.map((chat) => (
        <FriendsChatsListItem key={chat.id} {...chat} />
      ))}
    </List>
  );
};

export default FriendsChatsList;
