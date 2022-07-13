/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

import { PredictionContext } from '../context/PredictionContext';

const Layout = () => {
  const { isAuthenticated, checkAuthorization, setAuth, getLoggedUsername } = useContext(PredictionContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/");
  };

  useEffect(() => {
    checkAuthorization();
    getLoggedUsername();
  }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light main-nav">
        <div className="container-fluid text-center banner">
          <h1 className="row mx-auto"><span className="navbar-brand">Prediction Tracker</span></h1>

          <button className="navbar-toggler mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapseContent" aria-controls="navbarCollapseContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapseContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Predictions
                </Link>
                <ul className="nav-dropdown-menu dropdown-menu text-center">
                  <Link className="dropdown-item" to="/predictions/pending">Pending Predictions</Link>
                  <Link className="dropdown-item" to="/predictions/concluded">Concluded Predictions</Link>
                </ul>
              </li>
              {isAuthenticated &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/predictions/create">Make Prediction</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">My Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} >Log Out</button>
                  </li>
                </>
              }
              {!isAuthenticated &&
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
      
      <Outlet />

      {location.pathname.length > 1 && 
        <div className="footer"></div>
      }
    </>
  )
};

export default Layout;