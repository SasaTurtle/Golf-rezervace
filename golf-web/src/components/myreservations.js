import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import BackgroundImage from '../assets/background.png';
//import Logo from "/assets/images/logo.png";
import Logo from '../assets/logo.png';
import axios from "axios";
import authHeader from "../auth/auth-header";
import TabView from './tabview';
import TabViewHistory from "./tabviewHistory";

const API_URL = process.env.REACT_APP_LINK1;


const MyReservation = () => {
  const [events, setEvents] = useState([{"id":1,"user_id":1,"place_id":2,"from":"","to":"","title":""}]);
  const [eventsHistory, setEventsHistory] = useState([{"id":1,"user_id":1,"place_id":2,"from":"","to":"","title":""}]);
  //const [loading, setLoading] = useState(false);


  function myReservation() {
    fetch(API_URL + '/Reservation/rezervace',{
       method: 'GET',
       headers: {
        "Content-type": "application/text; charset=UTF-8",
        'Access-Control-Allow-Origin' : '*',
        'Authorization': "Bearer " + localStorage.getItem("user").replace(/"/g, "")
      }
    })
    .then(res => res.json())
    .then(res => {
        var ev = res;
         var evFuture = [];
         var evHistory = [];
         for(let i=0; i < ev.length;i++){
          var a = ev[i];
            if(new Date(a.from) > Date.now()){
              evFuture.push(a);
            }else{
              evHistory.push(a);
            }
         }
        setEvents(evFuture);
        setEventsHistory(evHistory);
       
    })
  }

  useEffect(() => {
    myReservation();
   },[]);

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop">
      <h1>Aktuální Rezervace</h1>
      <TabView contentData={events}/>
      <h1>Historie Rezervací</h1>
      <TabViewHistory contentData={eventsHistory}/>
      
    </div>
    </div>
  );
};

export default MyReservation;


