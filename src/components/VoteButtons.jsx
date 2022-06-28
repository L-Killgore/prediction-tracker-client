import React, { useContext, useEffect, useState } from 'react'
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

const VoteButtons = ({ predictionType }) => {
  const { selectedPrediction, selectedPredictionVotes, setSelectedPredictionVotes, loggedUsername } = useContext(PredictionContext);
  const [disabled, setDisabled] = useState(false);

  const voteCheck = selectedPredictionVotes.filter(vote => vote.user_id === loggedUsername.user_id);
  let userVote = false;
  let disabled2 = false;

  if (voteCheck.length !== 0) {
    if (predictionType === "Pending") {
      if (voteCheck[0].plausible !== null) {
        userVote = voteCheck[0].plausible;
        disabled2 = true;
      };
    } else {
      if (voteCheck[0].correct !== null) {
        userVote = voteCheck[0].correct;
        disabled2 = true;
      };
    };
  };

  const voteYes = async () => {
    if (selectedPrediction.user_prediction_status === "Pending") {
      try {
        await PredictionTrackerAPI.put(`/votes/tallies/plausible/${selectedPrediction.prediction_id}`);
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.post("/votes/", {
          prediction_id: selectedPrediction.prediction_id,
          user_id: loggedUsername.user_id,
          plausible: true,
          correct: null
        });
        setSelectedPredictionVotes([...selectedPredictionVotes, response.data.data.vote])
      } catch (err) {
        console.log(err);
      };
    } else {
      if (voteCheck.length === 0) {
        try {
          await PredictionTrackerAPI.put(`/votes/tallies/correct/${selectedPrediction.prediction_id}`);
        } catch (err) {
          console.log(err);
        };

        try {
          const response = await PredictionTrackerAPI.post("/votes/", {
            prediction_id: selectedPrediction.prediction_id,
            user_id: loggedUsername.user_id,
            plausible: null,
            correct: true
          });
          setSelectedPredictionVotes([...selectedPredictionVotes, response.data.data.vote])
        } catch (err) {
          console.log(err);
        };
      } else {
        try {
          await PredictionTrackerAPI.put(`/votes/update/${selectedPrediction.prediction_id}/${loggedUsername.user_id}`, {
            correct: true
          });
        } catch (err) {
          console.log(err);
        };

        try {
          await PredictionTrackerAPI.put(`/votes/tallies/correct/${selectedPrediction.prediction_id}`);
        } catch (err) {
          console.log(err);
        };
      };
      setDisabled(!disabled);
    };
  };

  const voteNo = async () => {
    if (selectedPrediction.user_prediction_status === "Pending") {
      try {
        await PredictionTrackerAPI.put(`/votes/tallies/implausible/${selectedPrediction.prediction_id}`);
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.post("/votes/", {
          prediction_id: selectedPrediction.prediction_id,
          user_id: loggedUsername.user_id,
          plausible: false,
          correct: null
        })
        setSelectedPredictionVotes([...selectedPredictionVotes, response.data.data.vote])
      } catch (err) {
        console.log(err);
      };
    } else {
      if (voteCheck.length === 0) {
        try {
          await PredictionTrackerAPI.put(`/votes/tallies/incorrect/${selectedPrediction.prediction_id}`);
        } catch (err) {
          console.log(err);
        };

        try {
          const response = await PredictionTrackerAPI.post("/votes/", {
            prediction_id: selectedPrediction.prediction_id,
            user_id: loggedUsername.user_id,
            plausible: null,
            correct: false
          });
          setSelectedPredictionVotes([...selectedPredictionVotes, response.data.data.vote])
        } catch (err) {
          console.log(err);
        };
      } else {
        try {
          await PredictionTrackerAPI.put(`/votes/update/${selectedPrediction.prediction_id}/${loggedUsername.user_id}`, {
            correct: false
          });
        } catch (err) {
          console.log(err);
        };

        try {
          await PredictionTrackerAPI.put(`/votes/tallies/incorrect/${selectedPrediction.prediction_id}`);
        } catch (err) {
          console.log(err);
        }
      };
      setDisabled(true);
    };
  };

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await PredictionTrackerAPI.get(`/votes/${selectedPrediction.prediction_id}`);
        setSelectedPredictionVotes(response.data.data.votes);
      } catch (err) {
        console.log(err);
      };
    };

    fetchVotes();
  }, [selectedPrediction.prediction_id, setSelectedPredictionVotes, disabled]);


  if (voteCheck.length >= 0) {
    return (
      <>
        {/* filters to see how logged in user voted to reflect correct button/vote display */}
        {
          predictionType === "Pending" && (disabled || disabled2) ?
          (
            <p className="vote-disabled p-3">~~You voted that this prediction is <span id="vote-value">{userVote ? "plausible" : "implausible"}</span>~~</p>
          )
          :
          predictionType !== "Pending" && (!disabled || !disabled2) && (voteCheck.length === 0 || (voteCheck[0].plausible === null && voteCheck[0].correct === null)) ? 
          (
            <>
              <p className="vote-disabled pt-2">~~You did not vote on the plausibility of this prediction when it was Pending~~</p>
              <div className="vote-buttons">
                <FaRegThumbsUp className="vote-yes green" onClick={voteYes} />
                  Agree
                <FaRegThumbsDown className="vote-no red" onClick={voteNo} />
              </div>
            </>
          )
          :
          predictionType !== "Pending" && (!disabled || !disabled2) && voteCheck[0].plausible !== null && voteCheck[0].correct === null ? 
          (
            <>
              <p className="vote-disabled pt-2">~~You voted that this prediction was <span id="vote-value">{voteCheck[0].plausible ? "plausible" : "implausible"}</span> when it was Pending~~</p>
              <div className="vote-buttons">
                <FaRegThumbsUp className="vote-yes green" onClick={voteYes} />
                  Agree
                <FaRegThumbsDown className="vote-no red" onClick={voteNo} />
              </div>
            </>
          )
          :
          predictionType !== "Pending" && (disabled || disabled2) && voteCheck[0].plausible === null && voteCheck[0].correct !== null ? 
          (
            <>
              <p className="vote-disabled p-2">~~You did not vote on the plausibility of this prediction when it was Pending~~</p>
              <p className="vote-disabled pb-3">~~You voted that you <span id="vote-value">{userVote ? "agree" : "do not agree"}</span> that this prediction is {selectedPrediction.user_prediction_status}~~</p>
            </>
          )
          :
          predictionType !== "Pending" && (disabled || disabled2) && voteCheck[0].plausible !== null && voteCheck[0].correct !==null ? 
          (
            <>
              <p className="vote-disabled p-2">~~You voted that this prediction was <span id="vote-value">{voteCheck[0].plausible ? "plausible" : "implausible"}</span> when it was Pending~~</p>
              <p className="vote-disabled pb-3">~~You voted that you <span id="vote-value">{userVote ? "agree" : "do not agree"}</span> that this prediction is {selectedPrediction.user_prediction_status}~~</p>
            </>
          )
          :
          (
            <div className="vote-buttons">
              <FaRegThumbsUp className="vote-yes green" onClick={voteYes} />
                Plausible
              <FaRegThumbsDown className="vote-no red" onClick={voteNo} />
            </div>
          )
        }
      </>
    )
  } else {
    return (
      <div className="vote-buttons">
      </div>
    )
  }
}

export default VoteButtons