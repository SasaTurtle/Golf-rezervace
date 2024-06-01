import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";

import BackgroundImage from '../assets/background.png';
//import Logo from "/assets/images/logo.png";
import Logo from '../assets/logo.png';
import axios from "axios";
import authHeader from "../auth/auth-header";

const API_URL = "https://localhost:44304/api";


const Register = () => {
    const [inputName, setInputName] = useState("");
    const [inputLastname, setInputLastname] = useState("");
    const [inputStreet, setInputStreet] = useState("");
    const [inputzip, setInputZip] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);


  function register(name, lastname, street, zip, city, email, password) {
    return axios
      .post(API_URL + "/User",JSON.stringify({
        "id": 0,
        "roleId": 1,
        "first_name": name,
        "last_name": lastname,
        "email": email,
        "password": password,
        "adress": street,
        "zip": zip,
        "city": city,
        "credit": 100000,
        "isverified": true
    }),
      {headers: {
        'Content-Type': 'application/json',
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }}
    )
      .then((response) => {
        if (response.data) {
           window.location.href = "/login";

        }

        return response.data;
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    //await delay(500);
    register(inputName,inputLastname,inputStreet,inputzip,inputCity,inputEmail,inputPassword);
    
    setLoading(false);
  };

   

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="name">
          <Form.Control
            type="text"
            value={inputName}
            placeholder="Jméno"
            onChange={(e) => setInputName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="lastname">
          <Form.Control
            type="text"
            value={inputLastname}
            placeholder="Přijmení"
            onChange={(e) => setInputLastname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="street">
          <Form.Control
            type="text"
            value={inputStreet}
            placeholder="Ulice a číslo popisné"
            onChange={(e) => setInputStreet(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="zip">
          <Form.Control
            type="text"
            value={inputzip}
            placeholder="PSČ"
            onChange={(e) => setInputZip(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="city">
          <Form.Control
            type="text"
            value={inputCity}
            placeholder="Město"
            onChange={(e) => setInputCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="email">
          <Form.Control
            type="email"
            value={inputEmail}
            placeholder="Email"
            onChange={(e) => setInputEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Heslo"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Registrovat
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled onClick={handleSubmit}>
            Registrace...
          </Button>
        )}
       
      </Form>
     
    </div>
  );
};

export default Register;
