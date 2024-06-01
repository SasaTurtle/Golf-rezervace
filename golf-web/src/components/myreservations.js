import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import BackgroundImage from '../assets/background.png';
//import Logo from "/assets/images/logo.png";
import Logo from '../assets/logo.png';
import axios from "axios";
import authHeader from "../auth/auth-header";
import TabView from './tabview';

const API_URL = "https://localhost:44304/api";


const MyReservation = () => {
  const [events, setEvents] = useState({});
  //const [loading, setLoading] = useState(false);


  function myReservation() {
    fetch('https://localhost:44304/api/Reservation/rezervace',{
       method: 'GET',
       headers: {
        "Content-type": "application/text; charset=UTF-8",
        'Access-Control-Allow-Origin' : '*',
        'Authorization': "Bearer " + localStorage.getItem("user").replace(/"/g, "")
      }
    })
    .then(res => res.json())
    .then(res => {
        var a = res;
        setEvents(a);
        console.log(events);
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
        <TabView contentData={events} />
      
    </div>
    </div>
  );
};

export default MyReservation;


