import authHeader from "./auth-header";
import axios from "axios";
import { IfRejected } from "react-async";

var API_URL = "http://localhost:8080/api";

class Basket {
  addProductLocaly(id, name, quantity, price) {
    var myObject = this.readBasketLocaly();
    var isIncluded = false;

    myObject.forEach((element) => {
      if (element["id"] == id) {
        isIncluded = true;
        element["quantity"] += quantity;
      }
    });

    if (!isIncluded) {
      var prod = { id: id, name: name, quantity: quantity, price: +price };
      myObject.push(prod);
    }

    this.setCookie("basket", JSON.stringify(myObject));
  }

  changeProductCount(id, quantity) {
    var myObject = this.readBasketLocaly();
    myObject.forEach((element) => {
      if (element["id"] == id) {
        element["quantity"] = quantity;
      }
    });

    if (quantity == 0) {
      var newObject = [];
      myObject.forEach((element) => {
        if (element["id"] != id) {
          newObject.push(element);
        }
      });
      myObject = newObject;
    }

    this.setCookie("basket", JSON.stringify(myObject));
  }

  readBasketLocaly() {
    var myObject = [];
    var curentBasket = this.getCookie("basket");
    if (curentBasket != "") {
      myObject = JSON.parse(curentBasket);
    }
    return myObject;
  }

  deleteBasketLocaly() {
    document.cookie = "basket=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  countBasketLocaly() {
    var count = 0;
    var myObject = this.readBasketLocaly();

    myObject.forEach((element) => {
      count += Number(element["quantity"]);
    });
    return count;
  }

  storeBasket() {}

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  getCookie(cname) {
    let name = cname + "=";
    //let decodedCookie = decodeURIComponent(document.cookie);
    let decodedCookie = document.cookie;
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  confirmOrder() {
    //  if (this.countBasketLocaly > 0) {
    var myObject = this.readBasketLocaly();
    if (myObject.length == 0) return -1;
    return new Promise((resolve, reject) => {
      axios
        .post(API_URL + "/basket/", myObject, { headers: authHeader() })
        .then((response) => {
          this.deleteBasketLocaly();
          console.log(response.data);
          resolve(Number(response.data));
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    //   }
  }
}

export default new Basket();
