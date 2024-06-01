import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import Auth from '../auth/auth.service';

export default function About() {

  const handleSubmit = async (event) => {
    event.preventDefault();
 
    console.log(Auth.readEvents("2019-03-08T13:14:35.557","2024-03-16T13:14:35.557"));
    console.log(localStorage.getItem("user"));
  };
  return (
    <>
    About
    <Button
            className="text-muted px-0"
            
            onClick={handleSubmit}
          >
            test
          </Button>
    </>
  );
}
