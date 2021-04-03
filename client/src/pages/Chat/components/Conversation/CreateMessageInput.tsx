import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, makeStyles } from '@material-ui/core';

import { createMessage } from '../../../../store/actions/messageActions';
import RootState from '../../../../interfaces/store';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
  },
}));

const CreateMessageInput: React.FC = () => {
  const [value, setValue] = useState('');
  const chatId = useSelector(
    (state: RootState) => state.chat.selectedChat?.chat.id,
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim().length > 0 && chatId) {
        dispatch(createMessage({ chatId, content: value }));
        setValue('');
      }
    }
  };

  return (
    <TextField
      multiline
      rows={2}
      rowsMax={2}
      variant="outlined"
      placeholder="Write a message..."
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      className={classes.textField}
    />
  );
};

export default CreateMessageInput;
