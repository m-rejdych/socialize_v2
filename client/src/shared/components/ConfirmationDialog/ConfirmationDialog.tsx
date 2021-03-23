import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  action: () => void;
}

const ConfirmationDialog: React.FC<Props> = ({
  open,
  onClose,
  title,
  action,
}) => {
  const handleAction = (): void => {
    action();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleAction}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
