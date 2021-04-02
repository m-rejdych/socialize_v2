import { useParams } from 'react-router-dom';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

interface Props {
  left: number;
}

const Conversation: React.FC<Props> = ({ left }) => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();

  return (
    <Box
      width={`calc(100% - ${left}px)`}
      minHeight="200vh"
      className={classes.container}
      style={{ left }}
    >
      {id}
    </Box>
  );
};

export default Conversation;
