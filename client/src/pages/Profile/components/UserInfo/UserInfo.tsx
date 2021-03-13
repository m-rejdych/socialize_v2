import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import RootState from '../../../../interfaces/store';

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 700,
  },
}));

const UserInfo: React.FC = () => {
  const profileId = useSelector((state: RootState) => state.profile.user.id);
  const userId = useSelector((state: RootState) => state.user.id);
  const age = useSelector((state: RootState) => state.profile.age);
  const country = useSelector((state: RootState) => state.profile.country);
  const city = useSelector((state: RootState) => state.profile.city);
  const relationship = useSelector(
    (state: RootState) => state.profile.relationship,
  );
  const classes = useStyles();

  const isMe = userId === profileId;

  const fields = [
    {
      value: age,
      label: 'Age',
    },
    {
      value: country,
      label: 'Country',
    },
    {
      value: city,
      label: 'City',
    },
    {
      value: relationship,
      label: 'Relationship',
    },
  ];

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h4">User info</Typography>
      <List>
        {fields.map(({ value, label }) => {
          const text =
            typeof value === 'number' ? value : value?.name || 'Unknown';

          return (
            <ListItem key={label} divider>
              <ListItemText disableTypography>
                <Typography className={classes.bold} variant="h6">
                  {label}
                </Typography>
                <Typography
                  color={text === 'Unknown' ? 'textSecondary' : 'textPrimary'}
                >
                  {text}
                </Typography>
              </ListItemText>
              {isMe && (
                <ListItemSecondaryAction>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default UserInfo;
