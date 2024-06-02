import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_LINK1;

class AuthService {
  

  login(username, password) {
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

        }

        return response.data;
      });
  }

  readEvents(from, to) {
         fetch(API_URL + "/Reservation/params", {
          method: "POST",
          body: JSON.stringify({
            "from": "2019-03-08T13:14:35.557",
            "to": "2024-10-16T13:14:35.557"
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
          // setEvents(data)
           //console.log(events);
           return data;
          })
        .catch(function(error) {
            console.log( error)
          });
  }


  createEvents(from, to, title) {
         fetch(API_URL + "/Reservation", {
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
           return data;
          })
        .catch(function(error) {
            console.log( error)
          });
  }

  readEventsAll(from, to) {
    fetch(API_URL + "/ReservationAll", {
          method: "POST",
          body: JSON.stringify({
            "from": "2019-03-08T13:14:35.557",
            "to": "2024-10-16T13:14:35.557"
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Access-Control-Allow-Origin' : '*'
          }
        }) .then((response) => response.json())
         .then((json) => {return json;});
        
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/auth/signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  resetPassword(oldPassword, newPassword) {
    return axios.post(
      API_URL + "/pswd/reset",
      {
        oldPassword,
        newPassword,
      },
      { headers: authHeader() }
    );
  }
}

export default new AuthService();
