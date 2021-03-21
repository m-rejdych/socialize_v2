import { useState } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { PostAdd } from '@material-ui/icons';

import NewPostDialog from './components/NewPostDialog';

const useStyles = makeStyles((theme) => ({
  newPostContainer: {
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
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
    <Box>
      <Box
        display="flex"
        alignItems="center"
        className={classes.newPostContainer}
      >
        <Button size="large" startIcon={<PostAdd />} onClick={handleOpen}>
          New post
        </Button>
        <NewPostDialog open={open} onClose={handleClose} />
      </Box>
    </Box>
  );
};

export default Home;
