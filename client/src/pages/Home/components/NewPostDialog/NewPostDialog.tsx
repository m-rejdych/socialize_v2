import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  makeStyles,
} from '@material-ui/core';
import { Formik, Form, Field, FieldProps } from 'formik';

const useStyles = makeStyles((theme) => ({
  title: {
    minHeight: 96,
  },
  content: {
    minHeight: 220,
  },
}));

interface Props {
  open: boolean;
  onClose: () => void;
}

const NewPostDialog: React.FC<Props> = ({ open, onClose }) => {
  const classes = useStyles();

  const initialValues = {
    title: '',
    content: '',
  };

  const fields = [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      validate: (value: string): string | undefined => {
        let errorMessage;

        if (value.trim().length === 0) {
          errorMessage = 'Title can not be empty!';
        }

        return errorMessage;
      },
    },
    {
      name: 'content',
      type: 'text',
      label: 'Content',
      validate: (value: string): string | undefined => {
        let errorMessage;

        if (value.trim().length === 0) {
          errorMessage = 'Content can not be empty!';
        }

        return errorMessage;
      },
    },
  ] as const;

  const handleClose = (resetForm: () => void): void => {
    onClose();
    setTimeout(() => {
      resetForm();
    }, 300);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ resetForm }) => (
        <Form>
          <Dialog open={open} onClose={onClose} disableBackdropClick>
            <DialogTitle>New post</DialogTitle>
            <DialogContent>
              <Form>
                {fields.map(({ label, ...rest }) => (
                  <Field key={rest.name} {...rest}>
                    {({ field, meta }: FieldProps) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={label}
                        variant="outlined"
                        error={meta.touched && !!meta.error}
                        helperText={meta.touched && meta.error}
                        multiline={rest.name === 'content'}
                        rows={rest.name === 'title' ? 1 : 8}
                        className={
                          rest.name === 'title'
                            ? classes.title
                            : classes.content
                        }
                      />
                    )}
                  </Field>
                ))}
              </Form>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose(resetForm)}>Close</Button>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostDialog;
