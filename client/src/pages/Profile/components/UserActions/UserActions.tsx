import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Box, makeStyles, CircularProgress } from '@material-ui/core';
import {
  Remove,
  PersonAdd,
  PersonAddDisabled,
  Close,
  Check,
} from '@material-ui/icons';

import RootState from '../../../../interfaces/store';
import {
  getFriendship,
  createFriendship,
  acceptFriendship,
} from '../../../../store/actions/friendshipActions';

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
  buttonsContainer: {
    '& > button:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
}));

interface ButtonData {
  text: string;
  icon: JSX.Element;
  color: 'primary' | 'secondary';
  action?: () => void;
  declineButton?: boolean;
}

const ButtonWrapper: React.FC<Omit<ButtonData, 'declineButton'>> = ({
  color,
  icon,
  text,
  action = (): void => {},
}) => (
  <Button
    variant="contained"
    size="large"
    color={color}
    startIcon={icon}
    onClick={action}
  >
    {text}
  </Button>
);

const UserActions: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const friendship = useSelector(
    (state: RootState) => state.friendship.selectedFriendship,
  );
  const loading = useSelector((state: RootState) => state.friendship.loading);
  const initialLoad = useSelector(
    (state: RootState) => state.friendship.initialLoad,
  );
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendship(Number(id)));
  }, [id]);

  const getButtonData = (): ButtonData => {
    if (friendship) {
      if (friendship.isAccepted)
        return {
          text: 'Remove friend',
          color: 'secondary',
          icon: <Remove />,
        };

      if (friendship.requestedBy.id === userId)
        return {
          text: 'Cancel request',
          color: 'secondary',
          icon: <PersonAddDisabled />,
        };

      return {
        text: 'Accept friendhsip',
        color: 'primary',
        icon: <Check />,
        action: (): void => {
          dispatch(acceptFriendship({ friendId: Number(id) }));
        },
        declineButton: true,
      };
    }

    return {
      text: 'Add as friend',
      color: 'primary',
      icon: <PersonAdd />,
      action: (): void => {
        dispatch(createFriendship({ friendId: Number(id) }));
      },
    };
  };

  const renderButtons = (): JSX.Element => {
    const { declineButton, ...data } = getButtonData();

    return (
      <>
        <ButtonWrapper {...data} />
        {declineButton && (
          <ButtonWrapper
            color="secondary"
            icon={<Close />}
            text="Decline friendship"
          />
        )}
      </>
    );
  };

  const buttons = renderButtons();

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems={loading || !initialLoad ? 'center' : 'stretch'}
        className={classes.buttonsContainer}
      >
        {loading || !initialLoad ? (
          <CircularProgress size={200} color="primary" />
        ) : (
          buttons
        )}
      </Box>
    </Box>
  );
};

export default UserActions;
