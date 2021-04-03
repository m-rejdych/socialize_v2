import { Box } from '@material-ui/core';

import Message from './Message';
import MessageType from '../../../../../interfaces/message';

interface Props {
  messages: MessageType[];
}

const MessagesList: React.FC<Props> = ({ messages }) => {
  return (
    <Box flexGrow={1} display="flex" flexDirection="column">
      {messages
        ? messages.map((message) => <Message key={message.id} {...message} />)
        : null}
    </Box>
  );
};

export default MessagesList;
