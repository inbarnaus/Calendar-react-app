import React, {useEffect, useState} from 'react';
import {Button, makeStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {Container} from '@material-ui/core';
import { DateTimePicker } from 'react-rainbow-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 100,
    },
    button: {
        color: 'black',
        margin: theme.spacing(1),
        width: '110px',
        '&:hover':{
            backgroundColor: '#4e6ae6',//'#3c52b2',
            color: 'white'
        }
    },
    costumeStyle: {
        width: '650px',
        display: 'flex',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
      },
  }));

export default function EventTools(props){
    const [clicked, setClicked] = useState(false);
    const [final, setFinals] = useState({
        user: props.user(),
        start: new Date(),
        title: ''
    })
    const [event, setEvent] = useState({
        user: props.user(),
        start: new Date(),
        title: ''
    })
    const classes = useStyles();

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify(final)
        };

        async function fetchMyAPI() {
          await fetch('/addEvent', requestOptions)
            .then(response => response.json())
        }
          fetchMyAPI()
      }, [final]);

    function handleEvent(){
        setClicked(!clicked);
        setEvent(preValue=>{
            return {
                user: props.user(),
                start: preValue.start,
                title: preValue.title
            }
        })
    }

    function handleChange(e){
        setEvent(preValue=>{
            return {
                user: preValue.user,
                start: new Date(e),
                title: preValue.title
            }
        })
    }

    function onSubmit(){
        if(event.title !== ''){
            props.handleAddEvent(event)
            handleEvent();
            setFinals(event)
        }
    }

    function handleTitle(e){
        setEvent(preValue=>{
            return {
                user: preValue.user,
                start: preValue.start,
                title: e.target.value
            }
        });
    }

    return (
        <div >
            {!clicked &&
                <Button onClick={handleEvent} variant="outlined" color="primary" className={classes.button}>Add Event</Button>
            }
            {clicked &&
                <Container component="main" maxWidth="xs">
                <form className={classes.form}>
                <div  id="container" className={classes.costumeStyle}>
                        <Button 
                            type="submit"
                            variant="outlined" 
                            color="primary" 
                            className={classes.button}
                            onClick={onSubmit}>OK</Button>
                        <TextField
                            id="outlined-multiline-static"
                            variant="outlined"
                            label="Add Title"
                            required
                            fullWidth
                            multiline
                            style={{paddingLeft: '10px'}}
                            onChange={handleTitle}
                        />
                        <DateTimePicker
                            id="datetimepicker-1"
                            value={event.start}
                            onChange={handleChange}
                            formatStyle="large"
                            hour24={true}
                            style={{paddingLeft: '10px'}}
                        />
                        <HighlightOffIcon
                            fontSize="large"
                            color='primary'
                            onClick={handleEvent}
                            style={{paddingLeft: '10px'}}
                        />
                </div>
                </form>
                </Container>
            }
            
        </div>
    )
}
                