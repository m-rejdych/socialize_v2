import { Paper, makeStyles, Box } from '@material-ui/core';
import classNames from 'classnames';

import { ReactComponent as MainWave1 } from '../../../assets/Main-wave-1.svg';
import { ReactComponent as MainWave2 } from '../../../assets/Main-wave-2.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    background:
      'linear-gradient(to right bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))',
    borderRadius: 30,
    overflow: 'hidden',
    backdropFilter: 'blur(30px)',
  },
  wave: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '20%',
    zIndex: -1,
  },
  left0: {
    left: 0,
  },
  right0: {
    right: 0,
  },
}));

const Main: React.FC = () => {
  const classes = useStyles();

  return (
    <Box position="relative" borderRadius={30} height="100%" overflow="hidden">
      <MainWave1 className={classNames(classes.wave, classes.left0)} />
      <MainWave2 className={classNames(classes.wave, classes.right0)} />
      <Paper elevation={3} className={classes.container}></Paper>
    </Box>
  );
};

export default Main;
