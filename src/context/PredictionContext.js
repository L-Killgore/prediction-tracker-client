import React, { useState, createContext } from 'react';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';

export const PredictionContext = createContext();

export const PredictionContextProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUsername, setLoggedUsername] = useState([]);
  const [categories, setCategories] = useState(['All', 'Economic', 'Educational', 'Political', 'Medical', 'Other', 'Scientific', 'Societal', 'Technological']);
  const [predictions, setPredictions] = useState([]);
  const [expiredPredictions, setExpiredPredictions] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [sources, setSources] = useState([]);
  const [voteTallies, setVoteTallies] = useState([]);
  const [localTally, setLocalTally] = useState([]);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [selectedPredictionVotes, setSelectedPredictionVotes] = useState([]);
  const [selectedPredictionComments, setSelectedPredictionComments] = useState([]);
  const [selectedPredictionAggLikes, setSelectedPredictionAggLikes] = useState(0);
  const [selectedPredictionAggDislikes, setSelectedPredictionAggDislikes] = useState(0);

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
        categories, setCategories,
        predictions, setPredictions,
        expiredPredictions, setExpiredPredictions,
        reasons, setReasons,
        sources, setSources,
        voteTallies, setVoteTallies,
        localTally, setLocalTally,
        selectedPrediction, setSelectedPrediction,
        selectedPredictionVotes, setSelectedPredictionVotes,
        selectedPredictionComments, setSelectedPredictionComments,
        selectedPredictionAggLikes, setSelectedPredictionAggLikes,
        selectedPredictionAggDislikes, setSelectedPredictionAggDislikes,
        setAuth,
        getLoggedUsername,
        checkAuthorization
      }}>
      {props.children}
    </PredictionContext.Provider>
  )
}