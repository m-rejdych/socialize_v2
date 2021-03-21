import { Select, MenuItem } from '@material-ui/core';

import RELATIONSHIP_TYPES from '../../constants/relationshipTypes';

type SelectElement = { name?: string | undefined; value: string };

interface Props {
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | SelectElement>,
  ) => void;
}

const RelationshipSelect: React.FC<Props> = ({ value, handleChange }) => {
  const fields = [
    {
      value: '',
      label: 'Unknown',
    },
    ...RELATIONSHIP_TYPES,
  ];

  return (
    <Select
      autoFocus
      value={value}
      onChange={(e) => handleChange(e as React.ChangeEvent<SelectElement>)}
    >
      {fields.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RelationshipSelect;
