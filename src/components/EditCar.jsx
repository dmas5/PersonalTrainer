import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const EditCar = (props) => {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({brand:'', model:'', color:'', year:'', fuel:'', price:''});

    const handleClickOpen = () => {
      setCar({
        brand: props.data.brand,
        model: props.data.model,
        color: props.data.color,
        year: props.data.year,
        fuel: props.data.fuel,
        price: props.data.price 
      })      
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleChange = (event) => {
      setCar({...car, 
        [event.target.name]: event.target.value});
    }
  
    const handleSave = () => {
      props.updateCar(car, props.data._links.self.href);
      handleClose();
    }

    return (
        <div>
        <Button onClick={handleClickOpen}>Edit</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit car</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField label="Brand" name="brand" autoFocus variant="standard" value={car.brand} onChange={handleChange}/>
              <TextField label="Model" name="model" variant="standard" value={car.model} onChange={handleChange}/>
              <TextField label="Color" name="color" variant="standard" value={car.color} onChange={handleChange}/>
              <TextField label="Year" name="year" variant="standard" value={car.year} onChange={handleChange}/>
              <TextField label="Fuel" name="fuel" variant="standard" value={car.fuel} onChange={handleChange}/>
              <TextField label="Price" name="price" variant="standard" value={car.price} onChange={handleChange}/>
            </Stack>         
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>   
        </div>
    )
}
export default EditCar;