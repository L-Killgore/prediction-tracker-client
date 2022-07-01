import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';

import { PredictionContext } from '../context/PredictionContext';

const DashboardLinks = ({ dashFilter }) => {
  const { expiredPredictions, loggedUsername } = useContext(PredictionContext);
  let expAlert = false;
  let location = useLocation();
  let navigate = useNavigate();

  const userExpPreds = expiredPredictions.filter(expPreds => expPreds.user_id === loggedUsername.user_id);

  if (userExpPreds.length !== 0) {
    expAlert = true;
  };

  const handleFiltering = (filterValue) => {
    if (filterValue === "dashPending") {
      navigate("/dashboard/my-pending")
    } else if (filterValue === "dashExpired") {
      navigate("/dashboard/my-expired")
    } else if (filterValue === "dashConcluded") {
      navigate("/dashboard/my-concluded")
    };
  };

  return (
    <>
      <h3 className="dash-title-banner">My {dashFilter} Predictions</h3>
      <nav className="row text-center filters-navbar">
        <ul>
          <li>
            <button className={`col-md-8 mb-md-2 ${location.pathname === "/dashboard/my-pending" ? "pressed" : "unpressed"}`} value={"dashPending"} onClick={(e) => handleFiltering(e.target.value)}>
              Pending
            </button>
          </li>
          <li>
            <button className={`col-md-8 mb-md-2 ${location.pathname === "/dashboard/my-expired" ? "pressed" : "unpressed"}`} value={"dashExpired"} onClick={(e) => handleFiltering(e.target.value)}>
              Expired{expAlert && <FiAlertCircle className="expired" />}
            </button>
          </li>
          <li>
            <button className={`col-md-8 mb-md-2 ${location.pathname === "/dashboard/my-concluded" ? "pressed" : "unpressed"}`} value={"dashConcluded"} onClick={(e) => handleFiltering(e.target.value)}>
              Concluded
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default DashboardLinks