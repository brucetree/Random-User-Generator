import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({getGender}) {
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="all"
                name="radio-buttons-group">

                <FormControlLabel value="female" control={<Radio/>} label="Female" onChange={event => {
                    getGender(event.target.value)
                }}/>
                <FormControlLabel value="male" control={<Radio/>} label="Male" onChange={event => {
                    getGender(event.target.value)
                }}/>
                <FormControlLabel value="all" control={<Radio/>} label="All" onChange={event => {
                    getGender(event.target.value)
                }}/>
            </RadioGroup>
        </FormControl>
    );
}


