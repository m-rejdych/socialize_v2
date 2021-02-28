import { Card as CardBase, makeStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 20,
    background:
      'linear-gradient(to right bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2))',
    border: '2px solid rgba(255, 255, 255, 0.85)',
    backgroundClip: 'padding-box',
  },
}));

interface Props {
  className?: string;
}

const Card: React.FC<Props> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <CardBase {...props} className={classNames(classes.card, props.className)}>
      {children}
    </CardBase>
  );
};

export default Card;
