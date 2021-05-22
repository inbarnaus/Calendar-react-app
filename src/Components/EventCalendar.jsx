import React, {useState, useEffect} from 'react';
import CalendarBlock from './CalendarBlock'
import ToolBar from './ToolBar';

export default function EventCalendar(props){

    return (
        <div>
            <ToolBar isLogged={props.logged} logout={props.logout}/>
            {props.logged && 
                <CalendarBlock user={props.user} events={props.userEvents}/>
            }
        </div>
    );
}
