import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  IconButton,
  makeStyles,
  TextField,
  Box,
} from '@material-ui/core';
import { Edit, Check, Close } from '@material-ui/icons';

import RelationshipSelect from '../RelationshipSelect';
import Country from '../../../../interfaces/country';
import City from '../../../../interfaces/city';
import Relationship from '../../../../interfaces/relationship';
import validateNumbers from '../../../../util/validateNumbers';
import { updateUserInfo } from '../../../../store/actions/profileActions';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 700,
  },
  paddingVerticalSmall: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));

type FieldValue = Country | City | Relationship;

type FieldType = 'age' | 'city' | 'country' | 'relationship';

interface Props {
  value?: number | FieldValue | null;
  label: string;
  isMe: boolean;
  type: FieldType;
}

const InfoField: React.FC<Props> = ({ value, label, type, isMe }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    typeof value === 'number' ? value.toString() : value?.name || '',
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const isAge = type === 'age';

  const startEditing = (): void => {
    setIsEditing(true);
  };

  const cancelEditing = (): void => {
    setEditValue(
      typeof value === 'number' ? value.toString() : value?.name || '',
    );
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | { name?: string | undefined; value: string }
    >,
  ): void => {
    setEditValue(isAge ? validateNumbers(e.target.value) : e.target.value);
  };

  const handleUpdate = (): void => {
    dispatch(updateUserInfo({ [type]: isAge ? Number(editValue) : editValue }));
    setIsEditing(false);
  };

  const renderEditElement = (): JSX.Element => {
    if (type === 'relationship') {
      return (
        <RelationshipSelect value={editValue} handleChange={handleChange} />
      );
    }

    return (
      <TextField
        autoFocus
        value={editValue}
        type="text"
        onChange={handleChange}
      />
    );
  };

  const text = typeof value === 'number' ? value : value?.name || 'Unknown';
  const editElement = renderEditElement();

  return (
    <ListItem key={label} divider>
      <ListItemText disableTypography>
        <Typography className={classes.bold} variant="h6">
          {label}
        </Typography>
        {isEditing ? (
          editElement
        ) : (
          <Typography
            color={text === 'Unknown' ? 'textSecondary' : 'textPrimary'}
            className={classes.paddingVerticalSmall}
          >
            {text}
          </Typography>
        )}
      </ListItemText>
      {isMe && (
        <ListItemSecondaryAction>
          {isEditing ? (
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleUpdate}>
                <Check color="primary" />
              </IconButton>
              <IconButton onClick={cancelEditing}>
                <Close color="secondary" />
              </IconButton>
            </Box>
          ) : (
            <IconButton onClick={startEditing}>
              <Edit />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default InfoField;
