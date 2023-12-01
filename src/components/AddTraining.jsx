import React, { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import DateTimePicker from 'react-datetime-picker';

function AddTraining(props) {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date());

  const firstname = props.data.firstname;
  const lastname = props.data.lastname;
  const customerId = props.data.links[0].href;

  const [training, setTraining] = useState({ date: "", activity: '', duration: '', customer: customerId });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    handleClose();
  }

  const handleChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    setTraining({ ...training, date: value.toISOString() });
  }, [value]);

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <InputLabel id="demo-simple-select-label">Date</InputLabel>
            <DateTimePicker onChange={e => setValue(e)} value={value} />
            <TextField label="Activity" name="activity" variant="standard" value={training.activity} onChange={handleChange} />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Duration</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Duration"
                name="duration"
                value={training.duration}
                onChange={handleChange}
              >
                <MenuItem value={'20'}>20</MenuItem>
                <MenuItem value={'40'}>40</MenuItem>
                <MenuItem value={'60'}>60</MenuItem>
              </Select>
            </FormControl>
            <TextField id="outlined-read-only-input" label="Customer" variant="standard" value={firstname + " " + lastname} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;