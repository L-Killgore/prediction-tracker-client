import React, { useState, createContext } from 'react';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';

export const PredictionContext = createContext();

export const PredictionContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUsername, setLoggedUsername] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [expiredPredictions, setExpiredPredictions] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [voteTallies, setVoteTallies] = useState([]);
  const [localTally, setLocalTally] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [selectedPredictionComments, setSelectedPredictionComments] = useState([]);
  const [selectedPredictionVotes, setSelectedPredictionVotes] = useState([]);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  const getLoggedUsername = async () => {
    const response = await PredictionTrackerAPI.get("/accounts/dashboard/", {
      headers: { token: localStorage.token },
    });
    setLoggedUsername(response.data.user);
  };
  const checkAuthorization = async () => {
    try {
      const response = await PredictionTrackerAPI.get("/accounts/verification/", {
        headers: { token: localStorage.token }
      });
      response.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <PredictionContext.Provider value={{
        isAuthenticated, setIsAuthenticated,
        loggedUsername, setLoggedUsername,
        predictions, setPredictions,
        selectedPredictionComments, setSelectedPredictionComments,
        expiredPredictions, setExpiredPredictions,
        reasons, setReasons,
        voteTallies, setVoteTallies,
        localTally, setLocalTally,
        selectedPrediction, setSelectedPrediction,
        selectedPredictionVotes, setSelectedPredictionVotes,
        setAuth,
        getLoggedUsername,
        checkAuthorization
      }}>
      {props.children}
    </PredictionContext.Provider>
  )
}