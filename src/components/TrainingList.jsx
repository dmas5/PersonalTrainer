import { useState, useEffect, useCallback, useRef } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs';


const Trainings = () => {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    const gridRef = useRef();

    const onBtnExport = useCallback(() => {
        let params = { columnKeys: ['id', 'date','duration','activity','customer.firstname','customer.lastname']}
        gridRef.current.api.exportDataAsCsv(params);
      }, []);

    useEffect(() => {
        fetchAll();
    }, [])

    const fetchAll = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(e => console.log(e))
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
            field: 'date',
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
            sortable: true,
            maxWidth: 150,
            filter: true
        },
        {
            headerName: 'LastName',
            field: 'customer.lastname',
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
                <Typography variant="h5">
                    Trainings
                </Typography>
            </Stack>
            <Stack mt={2} mb={2} direction="row" spacing={2} alignItems="center" justifyContent="space-evenly">
                <Button variant="contained" onClick={onBtnExport}>Download CSV file</Button>
            </Stack>
            <div class="ag-theme-material" style={{ height: '500px', width: '80%', margin: 'auto' }} >
                <AgGridReact
                    ref={gridRef}
                    suppressExcelExport={true}
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
                    message="Training removed"
                />
            </div>
        </div>
    )
}

export default Trainings;