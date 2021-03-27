import { useSelector } from 'react-redux';
import {
  makeStyles,
  Avatar,
  CardHeader,
  CardContent,
  Card,
} from '@material-ui/core';

import RootState from '../../../interfaces/store';
import Navigation from './components/Navigation';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'fixed',
  },
  bold: {
    fontWeight: 700,
  },
  semiBold: {
    fontWeight: 600,
  },
}));

interface Props {
  width: number | string;
}

const Dashboard: React.FC<Props> = ({ width }) => {
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const lastName = useSelector((state: RootState) => state.user.lastName);
  const email = useSelector((state: RootState) => state.user.email);
  const classes = useStyles();

  return (
    <Card className={classes.card} style={{ width }}>
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
