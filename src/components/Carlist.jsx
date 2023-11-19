import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import EditCar from './EditCar';
import AddCar from './AddCar';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchAll();
    }, [])

    const fetchAll = () => {
        fetch('https://carrestapi.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(e => console.log(e))
    }

    const removeCar = (url) => {
        if (window.confirm("Are you sure to remove?")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchAll();
                        setOpen(true);
                    }
                    else {
                        alert('Try again!');
                    }
                })
                .catch(err => console.error(err))
        }
    }

    const updateCar = (car, link) => {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(car)
            })
            .then(response => {
                if (response.ok) {
                    fetchAll();
                }
                else {
                    alert('Try again!');
                }
            })
            .catch(err => console.error(err))
    }
    const addCar = (car) => {
        fetch('https://carrestapi.herokuapp.com/cars',
          { method: 'POST', headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(car)
        })
        .then(response => {
          if (response.ok) {
            fetchAll();
          }
          else {
            alert('Try again!');
          }
        })
        .catch(err => console.error(err))
      }

    const columns = [
        { headerName: 'Brand', field: "brand", sortable: true, maxWidth: 150, filter: true },
        { headerName: 'Model', field: "model", sortable: true, maxWidth: 150 },
        { headerName: 'Color', field: "color", sortable: true, maxWidth: 150 },
        { headerName: 'Fuel', field: "fuel", sortable: true, maxWidth: 150 },
        { headerName: 'Year', field: "year", sortable: true, maxWidth: 150 },
        { headerName: 'Price', field: "price", sortable: true, maxWidth: 150 },
        {
            headerName: '',
            field: "_links.self.href",
            cellRenderer: params => <Button onClick={() => removeCar(params.value)}>remove</Button>,
            maxWidth: 100
        },
        {
            headerName: '',
            field: "_links.self.href",
            cellRenderer: params => <EditCar data={params.data} updateCar={updateCar} />,
            maxWidth: 100
        }
    ];

    return (
        <div>
            <Stack mt={2} mb={2} alignItems="center">
                <AddCar addCar={addCar} />
            </Stack>
            <div class="ag-theme-material" style={{ height: '500px', width: '90%', margin: 'auto' }} >
                <AgGridReact
                    pagination={true}
                    paginationPageSize={10}
                    columnDefs={columns}
                    animateRows={true}
                    rowData={cars}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Car removed"
                />
            </div>
        </div>
    )
}

export default Cars;