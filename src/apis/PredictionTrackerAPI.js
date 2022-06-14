import axios from 'axios';

export default axios.create({
   // for production
   // baseURL: "https://prediction-tracker-app.herokuapp.com/api/v1"

   // for development
   baseURL: "http://localhost:3000/api/v1"
});