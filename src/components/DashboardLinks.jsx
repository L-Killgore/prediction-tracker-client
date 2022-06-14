import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';

import { PredictionContext } from '../context/PredictionContext';

const DashboardLinks = ({ dashFilter }) => {
  const { expiredPredictions, loggedUsername } = useContext(PredictionContext);
  const [dashButtonsToggle, setDashButtonsToggle] = useState("Pending");
  let expAlert = false;
  let navigate = useNavigate();

  const userExpPreds = expiredPredictions.filter(expPreds => expPreds.user_id === loggedUsername.user_id);

  if (userExpPreds.length !== 0) {
    expAlert = true;
  };

  const handleFiltering = (filterValue) => {
    if (filterValue === "dashPending") {
      setDashButtonsToggle("Pending")
      navigate("/dashboard/my-pending")
    } else if (filterValue === "dashExpired") {
      setDashButtonsToggle("Expired")
      navigate("/dashboard/my-expired")
    } else if (filterValue === "dashConcluded") {
      setDashButtonsToggle("Concluded")
      navigate("/dashboard/my-concluded")
    };
  };

  return (
    <>
      <h3 className="dash-title-banner">My {dashFilter} Predictions</h3>
      <nav className="row text-center filters-navbar">
        <ul>
          <li>
            <button className={`col-md-8 mb-md-2 ${dashButtonsToggle === "Pending" ? "pressed" : "unpressed"}`} value={"dashPending"} onClick={(e) => handleFiltering(e.target.value)}>
              Pending
            </button>
          </li>
          <li>
            <button className={`col-md-8 mb-md-2 ${dashButtonsToggle === "Expired" ? "pressed" : "unpressed"}`} value={"dashExpired"} onClick={(e) => handleFiltering(e.target.value)}>
              Expired{expAlert && <FiAlertCircle className="expired" />}
            </button>
          </li>
          <li>
            <button className={`col-md-8 mb-md-2 ${dashButtonsToggle === "Concluded" ? "pressed" : "unpressed"}`} value={"dashConcluded"} onClick={(e) => handleFiltering(e.target.value)}>
              Concluded
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default DashboardLinks