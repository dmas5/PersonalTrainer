import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import dayjs from 'dayjs'


const Trainings = () => {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchAll();
    }, [])

    const fetchAll = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(e => console.log(e))
    }

    const columns = [
        { 
            headerName: 'Id', 
            field: "id", 
            sortable: true, 
            maxWidth: 150, 
            filter: true},
        { 
            headerName: 'Date',
            sortable: true, 
            filter: true,
            valueGetter:function convert(params){
                const d = dayjs(params.data.date).format('DD.MM.YYYY HH:mm')
                return d
            }
        },
        { 
            headerName: 'Duration', 
            field: "duration", 
            sortable: true, 
            maxWidth: 150, 
            filter: true },
        { 
            headerName: 'Activity', 
            field: "activity", 
            sortable: true, 
            maxWidth: 150, 
            filter: true },
        { 
            headerName: 'Name',
            valueGetter: params => { return params.data.customer.firstname + " " + params.data.customer.lastname;},
            sortable: true, 
            maxWidth: 150, 
            filter: true },
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
                Trainings
            </Stack>
            <div class="ag-theme-material" style={{ height: '500px', width: '70%', margin: 'auto' }} >
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