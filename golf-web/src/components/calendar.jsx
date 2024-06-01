import React, { useState,useEffect } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import authService from '../auth/auth.service'
import Form from 'react-bootstrap/Form';


export default function Calendar() {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [newEventName, setNewEventName] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedInfoState, setSelectedInfoState] = useState({});

  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])

  
  function handleDateSelect(selectInfo) {
    const start = Date.now();
    if(start<selectInfo.start){
      setShow(true);
      setSelectedInfoState(selectInfo);
    }
  }

  function createEvents(from, to, title) {
    fetch("https://localhost:44304/api/Reservation", {
     method: "POST",
     body: JSON.stringify({
       "id": 0,
       "user_id": 1,
       "place_id": 2,
       "from": from,
       "to": to,
       "title": title
   }),
     headers: {
       "Content-type": "application/json; charset=UTF-8",
       'Access-Control-Allow-Origin' : '*',
       'Authorization': "Bearer " + localStorage.getItem("user").replace(/"/g, "")
     }
   }) 
   .then((response) => {
     if (!response.ok) {
         throw response; 
     }
     return response.json();
   })
   .then((data) => {
      console.log(data);
        let calendarApi = selectedInfoState.view.calendar
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectedInfoState.startStr,
          end: selectedInfoState.endStr,
          allDay: selectedInfoState.allDay,
          publicId:data.id
        })
      

      return data;
     })
   .catch(function(error) {
       console.log( error)
     });
  } 

  function updateEvents(id, from, to, title) {
    fetch("https://localhost:44304/api/Reservation/" + id, {
     method: "PUT",
     body: JSON.stringify({
       "id": id,
       "user_id": 1,
       "place_id": 2,
       "from": from,
       "to": to,
       "title": title
   }),
     headers: {
       "Content-type": "application/json; charset=UTF-8",
       'Access-Control-Allow-Origin' : '*',
       'Authorization': "Bearer " + localStorage.getItem("user").replace(/"/g, "")
     }
   }) 
   .then((response) => {
     if (!response.ok) {
         throw response; 
     }
     return response.json();
   })
   .then((data) => {
      console.log(data);
      setShowUpdate(false);

      return data;
     })
   .catch(function(error) {
       console.log( error)
     });
  } 

  function deleteEvents(id,clickInfo) {
    fetch('https://localhost:44304/api/Reservation/' + id, {
       method: 'DELETE',
       headers: {
        "Content-type": "application/text; charset=UTF-8",
        'Access-Control-Allow-Origin' : '*',
        'Authorization': "Bearer " + localStorage.getItem("user").replace(/"/g, "")
      }
    })
    .then(res => res.text()) // or text.json()
    .then(res => {console.log(res)
      clickInfo.event.remove();
      setShowUpdate(false);
    })
  } 

  function handleModalSave(){
    setShow(false);

    let title = newEventName;
    let calendarApi = selectedInfoState.view.calendar
    console.log(selectedInfoState.startStr +"|"+ selectedInfoState.endStr);
    calendarApi.unselect() // clear date selection
    if (title) {
      var response = createEvents(selectedInfoState.startStr,selectedInfoState.endStr,title);
    }
    
  } 

  function handleModalUpdate(){
    setShow(false);

    let title = newEventName;
    let calendarApi = selectedInfoState.view.calendar
    console.log(selectedInfoState.startStr +"|"+ selectedInfoState.endStr);
    calendarApi.unselect() // clear date selection
    if (title) {
      updateEvents(selectedInfoState.startStr,selectedInfoState.endStr,title,selectedInfoState.event._def.extendedProps.publicId);
    }
    
  } 

  function handleModalDelete(){
    setShow(false);
    let calendarApi = selectedInfoState.view.calendar
    console.log(selectedInfoState.startStr +"|"+ selectedInfoState.endStr);
    calendarApi.unselect() // clear date selection
       if (window.confirm(`Jsi si jistý?'${selectedInfoState.title}'`)) {
          deleteEvents(selectedInfoState.event._def.extendedProps.publicId,selectedInfoState)
       }
  } 

  function handleModalCloseNoActio(){
    setShow(false);
    setShowUpdate(false);
    
  } 

  function handleEventClick(clickInfo) {
   //clickInfo.event.extendedProps.publicId
   if(clickInfo.event.backgroundColor!=="#cdcdcd"){
   
    setShowUpdate(true);
    let calendarApi = setSelectedInfoState(clickInfo);
    setNewEventName(clickInfo.event._def.title);

  }


  }

  function handleEvents(events) {
    setCurrentEvents(events)
  }

  function getCurrentDate(plus) {
    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear()+plus;
    return ''+year + '-' + month + '-' +date;
    }

  /* useEffect(() => {
     setEvents(authService.readEvents("2019-03-08T13:14:35.557","2026-03-08T13:14:35.557"));
    // setDisplay(data);
     console.log(events);
   }, []);
*/
  useEffect(() => {

    var urlEvents = "";
    var head = "";
    if(localStorage.getItem("user")!= null)
    { 
      urlEvents = "https://localhost:44304/api/Reservation/params";
      head = {
        "Content-type": "application/json; charset=UTF-8",
        'Access-Control-Allow-Origin' : '*',
        'Authorization': "Bearer " + localStorage.getItem("user").replace(/"/g, "")
      }
    }else{
      urlEvents = "https://localhost:44304/api/Reservation/all";
      head = {
        "Content-type": "application/json; charset=UTF-8",
        'Access-Control-Allow-Origin' : '*'
      }
    }

        fetch(urlEvents, {
            method: "POST",
            body: JSON.stringify({
              "from": "2019-03-08T13:14:35.557",
              "to": "2024-10-16T13:14:35.557"
            }),
            headers:head
          }) 
          .then((response) => {
            if (!response.ok) {
                throw response; 
            }
            return response.json();
          })
          .then((data) => {
            setEvents(data)
            console.log(events);
            })
          .catch(function(error) {
              console.log( error)
            });
    
  }, []);

  

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title'
          }}
          initialView='timeGridWeek'
          firstDay='1'
          allDaySlot={false}
         
          validRange={{
            start: getCurrentDate(0),
            end: getCurrentDate(1)
            }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          initialEvents={INITIAL_EVENTS} // alternatively, use the events setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          events={events}
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
      <Modal
        show={show}
        onHide={handleModalCloseNoActio}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Vytvořit Rezervaci</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Název Rezervace</Form.Label>
              <Form.Control
                type="text"
                onChange={ (event) => { setNewEventName(event.target.value) } }
                placeholder="Např: Golf s hochy"
                autoFocus
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalSave}>
            Rezervovat
          </Button>
          <Button variant="primary" onClick={handleModalCloseNoActio}>Zrušit</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showUpdate}
        onHide={handleModalCloseNoActio}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Změna Rezervace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Název Rezervace</Form.Label>
              <Form.Control
                type="text"
                onChange={ (event) => { setNewEventName(event.target.value) } }
                placeholder="Např: Golf s hochy"
                autoFocus
                value={newEventName}
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalUpdate}>
            Uložit
          </Button>
          <Button variant="secondary" onClick={handleModalCloseNoActio}>Zrušit</Button>
          <Button variant="danger" onClick={handleModalDelete}>Odstranit Rezervaci</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className='demo-app-sidebar'>
      
      <div className='demo-app-sidebar-section'>
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function SidebarEvent({ event }) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}