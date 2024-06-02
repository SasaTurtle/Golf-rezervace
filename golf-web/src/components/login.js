import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";

import BackgroundImage from '../assets/background.png';
//import Logo from "/assets/images/logo.png";
import Logo from '../assets/logo.png';
import axios from "axios";
import authHeader from "../auth/auth-header";

const API_URL = process.env.REACT_APP_LINK1;


const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);


  function login(username, password) {
    return axios
      .post(API_URL + "/Login/login",JSON.stringify({
                  "userName":username,
                   "password":password
                 }),
      {headers: {
        'Content-Type': 'application/json',
        'x-apikey': '59a7ad19f5a9fa0808f11931',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }}
    )
      .then((response) => {
        if (response.data.loginResponse) {
          var token = response.data.loginResponse.token.replace(/"/g, "");
          localStorage.setItem("user", JSON.stringify(token));
          window.location.href = "/";

        }

        return response.data;
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    //await delay(500);
    login(inputUsername,inputPassword);
    console.log(`Username :${inputUsername}, Password :${inputPassword}`);
    //if (inputUsername !== "admin" || inputPassword !== "admin") {
   //   setShow(true);
   // }
    //console.log(Auth.readEvents("2019-03-08T13:14:35.557","2024-03-16T13:14:35.557"));
    setLoading(false);
  };

  const handlePassword = () => {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Email"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Forgot password?
          </Button>
        </div>
      </Form>
     
    </div>
  );
};

export default Login;
