import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ToolBar from './ToolBar';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import Grid from '@material-ui/core/Grid';

function EventCalendar(props){

    const toolBar = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    }

    const costumeStyle = {
        width: '900px',
        margin: 'auto',
        padding: '30px'
    }

    return (
        <div>
            <ToolBar/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                    <div id='container' style={costumeStyle}> 
                        <FullCalendar
                            bootstrapFontAwesome='true'
                            nowIndicator='true'
                            handleWindowResize='true'
                            themeSystem='bootstrap'
                            plugins={[ dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin ]}
                            initialView="dayGridMonth"
                            navLinks='true'
                            headerToolbar={toolBar}
                        />
                        {/* {props.logged &&
                        <Button>inbar</Button>} */}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default EventCalendar;