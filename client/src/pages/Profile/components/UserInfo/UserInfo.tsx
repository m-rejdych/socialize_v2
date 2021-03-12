import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import RootState from '../../../../interfaces/store';

const useStyles = makeStyles((theme) => ({
  itemTextContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: theme.spacing(2),
  },
  cursorPointer: {
    cursor: 'pointer',
  },
}));

const UserInfo: React.FC = () => {
  const age = useSelector((state: RootState) => state.profile.age);
  const country = useSelector((state: RootState) => state.profile.country);
  const city = useSelector((state: RootState) => state.profile.city);
  const relationship = useSelector(
    (state: RootState) => state.profile.relationship,
  );
  const classes = useStyles();

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
        {fields.map(({ value, label }) => (
          <ListItem key={label} divider>
            <ListItemText
              disableTypography
              className={classes.itemTextContainer}
            >
              <Typography>{`${label}:`}</Typography>
              <Typography>
                {typeof value === 'number' ? value : value?.name || 'Unknown'}
              </Typography>
            </ListItemText>
            <ListItemIcon>
              <Edit className={classes.cursorPointer} />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserInfo;
