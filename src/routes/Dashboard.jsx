/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { PredictionContext } from '../context/PredictionContext';
import PredictionTemplate from '../components/PredictionTemplate';

const Dashboard = ({ dashFilter }) => {
  const { isAuthenticated, getLoggedUsername, loggedUsername } = useContext(PredictionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    getLoggedUsername();
  }, [isAuthenticated])

  return (
    <>
      <div className="row dashboard">
        <h3 className="p-3 m-0 text-center text-sm-start title-banner">{loggedUsername.username}'s Dashboard</h3>
      </div>
      <PredictionTemplate predFilter={"Dashboard"} dashFilter={dashFilter} />
    </>
  )
};

export default Dashboard