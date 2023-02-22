import * as React from 'react';
import './radioGroup.css'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { margin, padding, sizing, width } from '@mui/system';

interface RadioLabels {
    labels: string[]
    onChangeTypeTime: Function
}

export function RadioGroupGeneric({labels, onChangeTypeTime} : RadioLabels) {

  const sxDrawer = {
    gap: 0,
    margin: 0,
    padding: 0,
    fontSize: 5,
    // transform: 'rotate(-45deg)'
    // width: 1
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, value: string) {
    // e.preventDefault()
    onChangeTypeTime(value)
  }
    
  return (
    <FormControl>
      <RadioGroup
        row
        // sx={sxDrawer}
        // aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue={labels[0]}
        onChange={handleChange}
      > 
        {labels.map(label => (
            <FormControlLabel
            value={label}
            // sx={{fontSize: 5}}
            control={<Radio size='small'/>}
            label={label}
            labelPlacement="top"
          />    
            )
        )}
      </RadioGroup>
    </FormControl>
  );
}
