import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import EventTools from './EventTools';

export default function CalendarBlock(props){
    const [events, addEvent] = useState([])
    
    const toolBar = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    }

    const costumeStyle = {
        width: '1100px',
        margin: 'auto'
    }

    const toolsStyle = {
        width: '200px',
        margin: '0 auto',
        padding: '10px'
    }

    useEffect(()=>{
        console.log(props.events[0])
        if(props.events[0] !== undefined){
            for (let i = 0; i < props.events[0].length; i++){
                let start = props.events[0][i].start.replace('T', ' ').substring(0, 19)
                let end = props.events[0][i].end.replace('T', ' ').substring(0, 19)
                let event = {start: start, end: end, title: props.events[0][i].title}
                addEvent(oldArray => [...oldArray, event])
            }
        }
    }, [props.events])

    function handleAddEvent(event){
        addEvent(oldArray => [...oldArray, event])
    }
    
    return(
        <div>
        <div id='container' style={toolsStyle}>
            <EventTools handleAddEvent={handleAddEvent} user={props.user}/>
        </div>
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
                events={events}
            />
        </div>
        </div>
    );
}