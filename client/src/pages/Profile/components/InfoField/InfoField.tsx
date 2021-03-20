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

import Country from '../../../../interfaces/country';
import City from '../../../../interfaces/city';
import Relationship from '../../../../interfaces/relationship';
import { updateUserInfo } from '../../../../store/actions/profileActions';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 700,
  },
  paddingVerticalSmall: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  noInputArrows: {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditValue(
      isAge ? e.target.value.replace(/[^0-9]/g, '') : e.target.value,
    );
  };

  const handleUpdate = (): void => {
    dispatch(updateUserInfo({ [type]: isAge ? Number(editValue) : editValue }));
    setIsEditing(false);
  };

  const text = typeof value === 'number' ? value : value?.name || 'Unknown';

  return (
    <ListItem key={label} divider>
      <ListItemText disableTypography>
        <Typography className={classes.bold} variant="h6">
          {label}
        </Typography>
        {isEditing ? (
          <TextField
            autoFocus
            value={editValue}
            type={isAge ? 'number' : 'text'}
            onChange={handleChange}
            inputProps={{ className: classes.noInputArrows }}
          />
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
