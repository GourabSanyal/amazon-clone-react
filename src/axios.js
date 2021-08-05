import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-baadf/us-central1/api' 
    //The API end point (cloud function) URL
});

export default instance;