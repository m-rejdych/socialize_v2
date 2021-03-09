import { makeStyles } from '@material-ui/core';

import Card from '../../../../shared/components/Card';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return <Card className={classes.card} />;
};

export default Dashboard;
