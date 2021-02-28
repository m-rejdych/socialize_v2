import { useField } from 'formik';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    minHeight: 100,
  },
}));

interface Props {
  type: string;
  name: string;
  label: string;
  validate: (value: string) => string | undefined;
}

const FormInput: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <TextField
      fullWidth
      variant="outlined"
      color="secondary"
      label={label}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
      className={classes.input}
      {...field}
    />
  );
};

export default FormInput;
