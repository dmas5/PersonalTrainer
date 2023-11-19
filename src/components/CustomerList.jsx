import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';



const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchAll();
        console.log("fetch renderöi");
    }, [])

    const fetchAll = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(e => console.log(e))
    }

    const columns = [
        { 
            headerName: 'Firstname', 
            field: "firstname", 
            sortable: true, 
            maxWidth: 150, 
            filter: true
        },
        { 
            headerName: 'Lastname',
            field: "lastname", 
            sortable: true,
            maxWidth: 150,
            filter: true
        },
        { 
            headerName: 'Street Adress', 
            field: "streetaddress", 
            sortable: true, 
            //maxWidth: 150, 
            filter: true
        },
        { 
            headerName: 'Postcode', 
            field: "postcode", 
            sortable: true, 
            maxWidth: 150, 
            filter: true
        },
        { 
            headerName: 'City',
            field: "city", 
            sortable: true, 
            maxWidth: 150, 
            filter: true
        },
        { 
            headerName: 'Email',
            field: "email", 
            sortable: true, 
            //maxWidth: 150, 
            filter: true
        },
        { 
            headerName: 'Phone',
            field: "phone", 
            sortable: true, 
            maxWidth: 150, 
            filter: true
        },
        // {
        //     headerName: '',
        //     field: "_links.self.href",
        //     cellRenderer: params => <Button onClick={() => removeCar(params.value)}>remove</Button>,
        //     maxWidth: 100
        // },
        // {
        //     headerName: '',
        //     field: "_links.self.href",
        //     cellRenderer: params => <EditCar data={params.data} updateCar={updateCar} />,
        //     maxWidth: 100
        // }
    ];

    return (
        <div>
            <Stack mt={2} mb={2} alignItems="center">
                Customers
            </Stack>
            <div class="ag-theme-material" style={{ height: '500px', width: '95%', margin: 'auto' }} >
                <AgGridReact
                    pagination={true}
                    paginationPageSize={10}
                    columnDefs={columns}
                    animateRows={true}
                    rowData={customers}>
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

export default Customers;