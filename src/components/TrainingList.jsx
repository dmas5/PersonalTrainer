import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AddTraining from './AddTraining';
import dayjs from 'dayjs';


const Trainings = () => {
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchAll();
        fetchCustomers();

    }, [])

    const fetchCustomers = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(e => console.log(e))

    }

    const fetchAll = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(e => console.log(e))
    }


    const addTraining = (t) => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings',
            {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
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
    const removeTraining = (id) => {
        if (window.confirm("Are you sure to remove?")) {
            fetch('https://traineeapp.azurewebsites.net/api/trainings/' + id, { method: 'DELETE' })
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

    const columns = [
        {
            headerName: 'Id',
            field: "id",
            sortable: true,
            maxWidth: 150,
            filter: true
        },
        {
            headerName: 'Date',
            sortable: true,
            filter: true,
            valueGetter: function convert(params) {
                const d = dayjs(params.data.date).format('DD.MM.YYYY HH:mm')
                return d
            }
        },
        {
            headerName: 'Duration',
            field: "duration",
            sortable: true,
            maxWidth: 150,
            filter: true
        },
        {
            headerName: 'Activity',
            field: "activity",
            sortable: true,
            maxWidth: 150,
            filter: true
        },
        {
            headerName: 'FirstName',
            field: 'customer.firstname',
            //valueGetter: params => { return params.data.customer.firstname + " " + params.data.customer.lastname;},
            sortable: true,
            maxWidth: 150,
            filter: true
        },
        {
            headerName: 'LastName',
            field: 'customer.lastname',
            //valueGetter: params => { return params.data.customer.firstname + " " + params.data.customer.lastname;},
            sortable: true,
            maxWidth: 150,
            filter: true
        },
        {
            headerName: '',
            field: "id",
            cellRenderer: params => <Button onClick={() => removeTraining(params.value)}>remove</Button>,
            maxWidth: 150
        }
    ];

    return (
        <div>
            <Stack mt={2} mb={2} alignItems="center">
                Trainings
                <AddTraining customers={customers} addTraining={addTraining} />
            </Stack>
            <div class="ag-theme-material" style={{ height: '500px', width: '80%', margin: 'auto' }} >
                <AgGridReact
                    pagination={true}
                    paginationPageSize={10}
                    columnDefs={columns}
                    animateRows={true}
                    rowData={trainings}>
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

export default Trainings;