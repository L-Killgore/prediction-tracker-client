/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { PredictionContext } from '../context/PredictionContext';
import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';

const Register = () => {
  const { isAuthenticated, setAuth } = useContext(PredictionContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [longUsernameError, setLongUsernameError] = useState(null);
  const [longEmailError, setLongEmailError] = useState(null);
  const [longPasswordError, setLongPasswordError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // error handling: missing fields
    if (username === "") {
      setUsernameError("Error: Please include a Username.");
    } else {
      setUsernameError("");
    };
    if (email === "") {
      setEmailError("Error: Please include an Email Address.");
    } else {
      setEmailError("");
    };
    if (password === "") {
      setPasswordError("Error: Please include a Password.");
    } else {
      setPasswordError("");
    };

    // error handling: input too long
    if (username.length > 255) {
      setLongUsernameError("Error: Username cannot exceed 255 characters.")
    } else {
      setLongUsernameError("");
    };
    if (email.length > 255) {
      setLongEmailError("Error: Email cannot exceed 255 characters.")
    } else {
      setLongEmailError("");
    };
    if (password.length > 255) {
      setLongPasswordError("Error: Password cannot exceed 255 characters.")
    } else {
      setLongPasswordError("");
    };

    // if there are no frontend errors
    try {
      const response = await PredictionTrackerAPI.post("/accounts/register/", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setAuth(true);
    } catch (err) {
      console.log(err);
      if (err.response.data.status === "username and email exist") {
        setUsernameError(err.response.data.message.username_exists);
        setEmailError(err.response.data.message.email_exists);
      };
      if (err.response.data.status === "username exists") {
        setUsernameError(err.response.data.message);
      };
      if (err.response.data.status === "email exists") {
        setEmailError(err.response.data.message);
      };
    };
  };

  const navLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="row register-pane">
      <div className="col col-md-6 mx-auto m-4 p-2 text-center white-pane">
        <h3 className="prediction-pane-header">Register an Account at Prediction Tracker</h3>
        <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        {usernameError && <div className="alert alert-danger" role="alert">{usernameError}</div>}
        {longUsernameError && <div className="alert alert-danger" role="alert">{longUsernameError}</div>}
        <input className="form-control" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        {emailError && <div className="alert alert-danger" role="alert">{emailError}</div>}
        {longEmailError && <div className="alert alert-danger" role="alert">{longEmailError}</div>}
        <input className="form-control" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {passwordError && <div className="alert alert-danger" role="alert">{passwordError}</div>}
        {longPasswordError && <div className="alert alert-danger" role="alert">{longPasswordError}</div>}
        <button onClick={handleSubmit}>Register Account</button>
        <button onClick={navLogin}>Login</button>
      </div>
    </div>
  )
}

export default Register