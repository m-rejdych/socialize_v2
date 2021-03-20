import { useSelector } from 'react-redux';
import { Box, Typography, List } from '@material-ui/core';

import RootState from '../../../../interfaces/store';
import InfoField from '../InfoField';

interface Props {
  isMe: boolean;
}

const UserInfo: React.FC<Props> = ({ isMe }) => {
  const age = useSelector((state: RootState) => state.profile.age);
  const country = useSelector((state: RootState) => state.profile.country);
  const city = useSelector((state: RootState) => state.profile.city);
  const relationship = useSelector(
    (state: RootState) => state.profile.relationship,
  );

  const fields = [
    {
      value: age,
      label: 'Age',
      type: 'age',
    },
    {
      value: country,
      label: 'Country',
      type: 'country',
    },
    {
      value: city,
      label: 'City',
      type: 'city',
    },
    {
      value: relationship,
      label: 'Relationship',
      type: 'relationship',
    },
  ] as const;

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h4">User info</Typography>
      <List>
        {fields.map((field) => (
          <InfoField key={field.type} isMe={isMe} {...field} />
        ))}
      </List>
    </Box>
  );
};

export default UserInfo;
