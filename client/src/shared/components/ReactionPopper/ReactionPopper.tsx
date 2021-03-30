import { useState, useRef } from 'react';
import classNames from 'classnames';
import {
  Popper,
  Paper,
  Typography,
  TypographyVariant,
  makeStyles,
} from '@material-ui/core';

import ReactionButtons from '../ReactionButtons';
import CommentReaction from '../../../interfaces/comment/commentReaction';

const useStyles = makeStyles((theme) => ({
  textButton: {
    cursor: 'pointer',
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  paper: {
    borderRadius: 30,
  },
}));

type TypographyColor =
  | 'inherit'
  | 'initial'
  | 'textSecondary'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'error';

interface Props {
  className?: string;
  variant?: TypographyVariant;
  color?: TypographyColor;
  reactions?: CommentReaction[];
  commentId?: number;
}

const ReactionPopper: React.FC<Props> = ({
  className,
  variant,
  color,
  reactions,
  commentId,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLParagraphElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const classes = useStyles();

  const handleOpen = (
    e:
      | React.MouseEvent<HTMLParagraphElement>
      | React.TouchEvent<HTMLParagraphElement>,
  ): void => {
    const { currentTarget } = e;
    if (!timeoutRef.current) {
      const timeout = setTimeout(() => {
        setOpen(true);
        setAnchorEl(currentTarget);
        timeoutRef.current = null;
      }, 500);

      timeoutRef.current = timeout;
    }
  };

  const handleClose = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    } else {
      const timeout = setTimeout(() => {
        setOpen(false);
        setAnchorEl(null);
        timeoutRef.current = null;
      }, 500);

      timeoutRef.current = timeout;
    }
  };

  const handlePersist = (): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <>
      <Typography
        variant={variant || 'body2'}
        color={color || 'textSecondary'}
        component="p"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onTouchStart={handleOpen}
        onTouchEnd={handleClose}
        className={classNames(className, classes.textButton)}
      >
        React
      </Typography>
      <Popper open={open} anchorEl={anchorEl} placement="top">
        <Paper
          onMouseEnter={handlePersist}
          onMouseLeave={handleClose}
          onTouchStart={handlePersist}
          onTouchEnd={handleClose}
          className={classes.paper}
        >
          <ReactionButtons reactions={reactions} commentId={commentId} />
        </Paper>
      </Popper>
    </>
  );
};

export default ReactionPopper;
