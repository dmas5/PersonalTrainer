import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining2';
import AddCustomer from './AddCustomer';



const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchAll();
    }, [])

    const fetchAll = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(e => console.log(e))
    }

    const removeCustomer = (url) => {
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
    const edit = (d) => {
        console.log(d);
    }
    const updateCustomer = (customer, link) => {
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer)
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
    const addTraining = (t) => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings',
          { method: 'POST', headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(t)
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
      const addCustomer = (customer) => {
        fetch('https://traineeapp.azurewebsites.net/api/customers',
          { method: 'POST', headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(customer)
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
            maxWidth: 170, 
            filter: true
        },
        { 
            headerName: 'Postcode', 
            field: "postcode", 
            sortable: true, 
            maxWidth: 120, 
            filter: true
        },
        { 
            headerName: 'City',
            field: "city", 
            sortable: true, 
            maxWidth: 120, 
            filter: true
        },
        { 
            headerName: 'Email',
            field: "email", 
            sortable: true, 
            //maxWidth: 170, 
            filter: true
        },
        { 
            headerName: 'Phone',
            field: "phone", 
            sortable: true, 
            maxWidth: 150, 
            filter: true
        },
        {
            headerName: '',
            field: "links",
            cellRenderer: params => <Button onClick={() => removeCustomer(params.value[0].href)}>remove</Button>,
            maxWidth: 100
        },
        {
            headerName: '',
            cellRenderer: params => <EditCustomer data={params.data} updateCustomer={updateCustomer} />,
            maxWidth: 80
        },
        {
            headerName: '',
            field: "links",
            cellRenderer: params => <AddTraining data={params.data} addTraining={addTraining} />,
            maxWidth: 150
        }
    ];

    return (
        <div>
            <Stack mt={2} mb={2} alignItems="center">
                Customers
                <AddCustomer addCustomer={addCustomer} />
            </Stack>
            <div class="ag-theme-material" style={{ height: '550px', width: '95%', margin: 'auto' }} >
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
                    message="Customer removed"
                />
            </div>
        </div>
    )
}

export default Customers;