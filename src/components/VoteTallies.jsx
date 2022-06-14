import React, { useContext, useEffect } from 'react'

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

const VoteTallies = ({ predFilter, dashFilter, prediction }) => {
  const { selectedPredictionVotes, localTally, setLocalTally } = useContext(PredictionContext);
  let tallyFilter = "";

  if (predFilter === "Pending" || dashFilter === "Pending") {
    tallyFilter = "p/i";
  } else if (predFilter === "Concluded" || dashFilter === "Concluded" || predFilter === "Right" || dashFilter === "Right" || predFilter === "Wrong" || dashFilter === "Wrong") {
    tallyFilter = "r/w";
  };

  useEffect(() => {
    const fetchVoteTallies = async () => {
      try {
        const response = await PredictionTrackerAPI.get(`/votes/tallies/${prediction.prediction_id}`);
        setLocalTally(response.data.data.tallies);
      } catch (err) {
        console.log(err);
      };
    };

    fetchVoteTallies();
  },[prediction.prediction_id, selectedPredictionVotes, setLocalTally]);

  return (
    <>
      <p><b>Vote Tallies</b></p>
      <p>Plausible: <span className="green">{localTally.plausible}</span>  |  Implausible: <span className="red">{localTally.implausible}</span></p>
      {tallyFilter === "p/i"
        ? 
          <p className="greyed-out">Agree: {localTally.correct}  |  Disagree: {localTally.incorrect}</p>
        :
          <p>Agree: <span className="green">{localTally.correct}</span>  |  Disagree: <span className="red">{localTally.incorrect}</span></p>
      }
      <p><b>Total Votes:</b> {localTally.plausible + localTally.implausible + localTally.correct + localTally.incorrect}</p>
    </>
  )
}

export default VoteTallies