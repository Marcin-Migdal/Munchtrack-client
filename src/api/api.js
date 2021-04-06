import axios from 'axios';
import jwt_decode from 'jwt-decode';

const backendUrl = 'http://localhost:5000';
class ApiService {
  httpGETNoValidation(url) {
    return axios.get(backendUrl + url, this.authorize())
      .then(this.mapResponse);
  }

  httpGET(url) {
    if (this.validateToken()) {
      return axios.get(backendUrl + url, this.authorize())
        .then(this.mapResponse);
    } else {
      return this.ifExpired()
    }
  }

  httpGETAvatarNoValidation(url) {
    return axios.get(backendUrl + url, this.authorizeWithBlob())
      .then(this.mapResponse);
  }

  httpGETAvatar(url) {
    return axios.get(backendUrl + url, this.authorizeWithBlob())
      .then(this.mapResponse);
  }

  httpPOST(url, data = {}) {
    if (this.validateToken()) {
      return axios.post(backendUrl + url, data, this.authorize())
        .then(this.mapResponse);
    } else {
      return this.ifExpired()
    }
  }

  httpAuthPOST(url, data = {}) {
    return axios.post(backendUrl + url, data, this.authorize())
      .then(this.mapResponse);
  }

  httpDELETE(url) {
    if (this.validateToken()) {
      return axios.delete(backendUrl + url, this.authorize())
        .then(this.mapResponse);
    } else {
      return this.ifExpired()
    }
  }

  httpPUT(url, data = {}) {
    if (this.validateToken()) {
      return axios.put(backendUrl + url, data, this.authorize())
        .then(this.mapResponse);
    } else {
      return this.ifExpired()
    }
  }


  httpPATCH(url, data = {}) {
    if (this.validateToken()) {
      return axios.patch(backendUrl + url, data, this.authorize())
        .then(this.mapResponse);
    } else {
      return this.ifExpired()
    }
  }

  mapResponse = (response) => response.data

  authorize = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      };
    }
    return null;
  }

  authorizeWithBlob = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return {
        responseType: 'blob',
        headers: {
          Authorization: 'Bearer ' + token,
        }
      };
    }
    return null;
  }

  validateToken = () => {
    if (!localStorage.getItem('token')) {
      return false;
    }
    const decodedToken = jwt_decode(localStorage.getItem('token'))
    const currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      localStorage.removeItem('token')
      localStorage.setItem('tokenExpired', true);
      return false;
    } else {
      return true;
    }
  }

  ifExpired = () => {
    window.location.reload(false);
    return new Promise((resolve) => {
      resolve(console.log("Token expired, redirect to welcome page"));
    })
  }
}

const api = new ApiService();
export default api;
