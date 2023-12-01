import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({firstname:'', lastname:'', streetaddress:'', postcode:'', city:'', email:'',phone:''});

  const handleClickOpen = () => {
    setOpen(true);
  };
    
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addCustomer(customer);
    handleClose();
  }

  const handleChange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  }
  
  return(
    <div>
      <Button variant="contained" onClick={handleClickOpen}>Add Customer</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Firstname" name="firstname" autoFocus variant="standard" value={customer.firstname} onChange={handleChange} />
            <TextField label="Lastname" name="lastname" variant="standard" value={customer.lastname} onChange={handleChange} />
            <TextField label="Streetaddress" name="streetaddress" variant="standard" value={customer.streetaddress} onChange={handleChange} />
            <TextField label="Postcode" name="postcode" variant="standard" value={customer.postcode} onChange={handleChange} />
            <TextField label="City" name="city" variant="standard" value={customer.city} onChange={handleChange} />
            <TextField label="Email" name="email" variant="standard" value={customer.email} onChange={handleChange} />
            <TextField label="Phone" name="phone" variant="standard" value={customer.phone} onChange={handleChange} />
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

export default AddCustomer;