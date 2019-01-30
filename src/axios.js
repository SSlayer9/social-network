import axios from "axios";

var instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token"
});

export default instance;
// when I then import this is does not have to have the same name (instance). I this case in registration.js I import axios from './axios'
