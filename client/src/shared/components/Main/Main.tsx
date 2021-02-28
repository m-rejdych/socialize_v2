import { useRef, useEffect } from 'react';
import { Paper, makeStyles, Box } from '@material-ui/core';
import classNames from 'classnames';
import gsap from 'gsap';

import { ReactComponent as StarSecondaryOutlined } from '../../../assets/star-secondary-outlined.svg';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    background:
      'linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05))',
    borderRadius: 30,
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
  },
  absolute: {
    position: 'absolute',
  },
  topLeft: {
    top: '10%',
    left: '30%',
  },
  topRight: {
    top: -100,
    right: -100,
    width: 500,
    height: 500,
  },
  bottomRight: {
    bottom: '5%',
    right: '10%',
    width: 100,
  },
  bottomLeft: {
    width: 400,
    height: 400,
    bottom: -100,
    left: -100,
  },
}));

const Main: React.FC = ({ children }) => {
  const classes = useStyles();
  const firstStarRef = useRef(null);
  const secondStarRef = useRef(null);
  const thirdStarRef = useRef(null);
  const fourthStarRef = useRef(null);

  useEffect(() => {
    if (
      firstStarRef.current &&
      secondStarRef.current &&
      thirdStarRef.current &&
      fourthStarRef.current
    ) {
      gsap.fromTo(
        [firstStarRef.current, fourthStarRef.current],
        { opacity: 0.7 },
        {
          rotation: 360,
          duration: 360,
          repeat: -1,
          yoyo: true,
        },
      );

      gsap.to([secondStarRef.current, thirdStarRef.current], {
        rotation: -360,
        duration: 300,
        repeat: -1,
        yoyo: true,
        opacity: 0.7,
      });
    }
  }, []);

  return (
    <Box position="relative" borderRadius={30} height="100%" overflow="hidden">
      <StarSecondaryOutlined
        ref={firstStarRef}
        className={classNames(classes.absolute, classes.topLeft)}
      />
      <StarSecondaryOutlined
        ref={secondStarRef}
        className={classNames(classes.absolute, classes.topRight)}
      />
      <StarSecondaryOutlined
        ref={thirdStarRef}
        className={classNames(classes.absolute, classes.bottomRight)}
      />
      <StarSecondaryOutlined
        ref={fourthStarRef}
        className={classNames(classes.absolute, classes.bottomLeft)}
      />
      <Paper elevation={3} className={classes.container}>
        {children}
      </Paper>
    </Box>
  );
};

export default Main;
