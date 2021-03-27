import { useState } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { PostAdd } from '@material-ui/icons';

import NewPostDialog from '../../shared/components/NewPostDialog';
import Feed from './components/Feed';

const useStyles = makeStyles((theme) => ({
  newPostContainer: {
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(3),
  },
}));

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Box minHeight="100vh">
      <Box
        display="flex"
        alignItems="center"
        className={classes.newPostContainer}
      >
        <Button
          color="primary"
          size="large"
          startIcon={<PostAdd color="primary" />}
          onClick={handleOpen}
        >
          New post
        </Button>
        <NewPostDialog open={open} onClose={handleClose} />
      </Box>
      <Feed />
    </Box>
  );
};

export default Home;
