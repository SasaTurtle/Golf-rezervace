import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "/test/all");
  }

  async getUserContacts() {
    const a = await axios.get(API_URL + "/user/contact", { headers: authHeader() });
    return a.data;
  }

  postSaveUserContacts(userData) {
    return axios
      .post(API_URL + "/user/contactActualize", userData, { headers: authHeader() })
      .then((response) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  postRemoveContacts() {
    return axios
      .delete(API_URL + "/user/delete", { headers: authHeader() })
      .then((response) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  getUserBoard() {
    return axios.get(API_URL + "/test/user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "/test/mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "/test/admin", { headers: authHeader() });
  }
}

export default new UserService();
