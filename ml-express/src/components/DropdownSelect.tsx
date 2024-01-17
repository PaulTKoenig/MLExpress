import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface DropdownSelectProps {
    options: string[],
    label: string,
    selection: string,
    handleChange: (updatedSelection: string) => void,
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({ options, label, selection, handleChange }) => {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selection}
          label="Selection"
          onChange={event => handleChange(event.target.value as string)}
        >
          {options.map(option => <MenuItem value={option}>{option}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropdownSelect;