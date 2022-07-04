/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { PredictionContext } from '../context/PredictionContext';
import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';

const Login = () => {
  const { isAuthenticated, setAuth } = useContext(PredictionContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setpasswordError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await PredictionTrackerAPI.post("/accounts/login/", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setAuth(true);
    } catch (err) {
      console.log(err);
      if (err.response.data.status === "username failure") {
        setUsernameError("Failed to log in: Username or Password is incorrect");
      } else if (err.response.data.status === "password failure") {
        setUsernameError("");
        setpasswordError(err.response.data.message);
      };
    };
  };

  const navRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (isAuthenticated) {
      // navigate("/dashboard/my-pending");
      navigate(-1);
    };
  }, [isAuthenticated]);

  return (
    <div className="row login-pane">
      <div className="col col-md-6 mx-auto m-4 p-2 text-center white-pane">
        <h3 className="prediction-pane-header">Login to Your Prediction Tracker Account</h3>
        <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        {usernameError && <div className="alert alert-danger" role="alert">{usernameError}</div>}
        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {passwordError && <div className="alert alert-danger" role="alert">{passwordError}</div>}
        <button onClick={handleSubmit}>Log In</button>
        <button onClick={navRegister}>Register</button>
      </div>
    </div>
  )
};

export default Login