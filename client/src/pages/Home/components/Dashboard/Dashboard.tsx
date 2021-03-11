import { useSelector } from 'react-redux';
import { makeStyles, Avatar, CardHeader, CardContent } from '@material-ui/core';

import Card from '../../../../shared/components/Card';
import RootState from '../../../../interfaces/store';
import Navigation from './Navigation';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
  },
  bold: {
    fontWeight: 700,
  },
  semiBold: {
    fontWeight: 600,
  },
}));

const Dashboard = () => {
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const lastName = useSelector((state: RootState) => state.user.lastName);
  const email = useSelector((state: RootState) => state.user.email);
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={`${firstName} ${lastName}`}
        subheader={email}
        avatar={<Avatar />}
        titleTypographyProps={{ className: classes.bold }}
        subheaderTypographyProps={{ className: classes.semiBold }}
      />
      <CardContent>
        <Navigation />
      </CardContent>
    </Card>
  );
};

export default Dashboard;
