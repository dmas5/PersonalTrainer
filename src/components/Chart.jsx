import React from 'react';
import { useState,useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const Chart = () => {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchAll();
    }, [])

    const fetchAll = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(e => console.log(e))
    }


    const activityGroups = Object.groupBy(trainings, ({ activity }) => activity)

    const dataPairs = _.map(activityGroups, function (value, key) {

        return {
            "activity": key,
            "totaltime": _.sumBy(value, function (o) {
                return o.duration
            })
        }

    });

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart',
            },
        },
    };
       
    const data = {
        labels: dataPairs.map((d) => d.activity),
        datasets: [
            {
                label: "duration (sum) by activity",
                data: dataPairs.map((d) => d.totaltime),
                backgroundColor: 'rgba(0, 255, 0, 0.2)'
            },
        ],
    };


    return (
        <div>
            <Stack mt={2} mb={2} alignItems="center">
                <Typography variant="h5">
                    Training Chart
                </Typography>
            </Stack>
            <div style={{ width: 900, margin: 'auto' }}>
                <Bar options={options} data={data} />;
            </div>
        </div>
    )
}
export default Chart;