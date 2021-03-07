import { useField } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, makeStyles } from '@material-ui/core';

import RootState from '../../../../interfaces/store';
import { setUserError } from '../../../../store/actions/userActions';

const useStyles = makeStyles((theme) => ({
  input: {
    minHeight: 100,
  },
  helperText: {
    fontWeight: 600,
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
  const userError = useSelector((state: RootState) => state.user.error);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    field.onChange(e);
    if (userError) dispatch(setUserError(null));
  };

  return (
    <TextField
      {...field}
      onChange={handleChange}
      fullWidth
      variant="outlined"
      label={label}
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && meta.error}
      className={classes.input}
      FormHelperTextProps={{
        className: classes.helperText,
      }}
    />
  );
};

export default FormInput;
