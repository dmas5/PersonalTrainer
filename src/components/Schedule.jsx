import { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';

const Calendar = () => {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchAll();
    }, [])

    const fetchAll = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {setTrainings(data)}
                )
            .catch(e => console.log(e))
    }

    const events = trainings.map((t) => {
        const title = t.activity + "/" + t.customer.firstname + " " + t.customer.lastname
        return { "title": title, "start": t.date, "end": t.date }
    })

    
    return (
        <div>
            <Stack mt={2} mb={2} alignItems="center">
                <Typography variant="h5">
                    Calendar
                </Typography>
            </Stack>
            <div style={{ height: '500px', width: '90%', margin: 'auto' }}>
                <FullCalendar
                    plugins={[dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    height={550}
                    width="95%"
                    headerToolbar={{
                        start: "today prev,next",
                        center: "title",
                        end: "dayGridMonth timeGridWeek, timeGridDay"
                    }}
                    events={events}
                />
            </div>
        </div>
    )
}

export default Calendar;