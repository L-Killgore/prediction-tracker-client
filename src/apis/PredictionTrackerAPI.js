import axios from 'axios';

export default axios.create({
   // for production
   baseURL: "https://prediction-tracker-app.herokuapp.com/api/v1"

   // for development
   // baseURL: "http://localhost:3000/api/v1"
});




// go through and make sure breakpoints for flipped cellphone screen have proper margins and stuff. hamburger menu needs to change color from white too 