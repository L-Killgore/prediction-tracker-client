import React from 'react'
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const PredictionPane = ({ predictions, zeroPredictionsStatement }) => {
  const navigate = useNavigate();

  const handlePredictionSelect = (id) => {
    navigate(`/predictions/${id}`);
  };

  // handle border color changes
  const getColor = (prediction, element) => {
    let color = "";
    if (prediction.user_prediction_status === "Pending") {
      if (prediction.PredictionVoteTally.plausible > prediction.PredictionVoteTally.implausible) {
        color = "green";
      } else if (prediction.PredictionVoteTally.implausible > prediction.PredictionVoteTally.plausible) {
        color = "red";
      } else if (prediction.PredictionVoteTally.plausible === prediction.PredictionVoteTally.implausible) {
        color = "yellow";
      };
    } else if (prediction.user_prediction_status === "Right" || prediction.user_prediction_status === "Wrong") {
      if (prediction.PredictionVoteTally.correct > prediction.PredictionVoteTally.incorrect) {
        color = "green";
      } else if (prediction.PredictionVoteTally.incorrect > prediction.PredictionVoteTally.correct) {
        color = "red";
      } else if (prediction.PredictionVoteTally.correct === prediction.PredictionVoteTally.incorrect) {
        color = "yellow";
      };
    };

    if (element === "border") {
      return `shadow-${color}`;
    } else if (element === "header") {
      return `header-${color}`;
    };
  };

  return (
    <>
      {zeroPredictionsStatement.length > 1 && <p className="text-center zero-statement explanation">{zeroPredictionsStatement}</p>}
      {predictions && predictions.map((prediction, i) => {
        let currentTime = format(new Date(), 'P');
        let expired = format(new Date(parseISO(prediction.timeframe)), 'P');
        let past = currentTime >= expired;
        let yearCheck = format(new Date(parseISO(prediction.timeframe)), 'y') > format(new Date(), 'y');

        return (
          <div className={`mt-2 mb-4 mt-md-4 mb-md-4 text-center prediction-pane ${getColor(prediction, "border")}`} key={i} onClick={() => handlePredictionSelect(prediction.prediction_id)}>
            <h3 className="prediction-pane-header">{prediction.claim_title[0].toUpperCase() + prediction.claim_title.substring(1)}</h3>
            <div className="row prediction-pane-content">
              <div className="col-sm prediction-info-div">
                <p><b>Predictor:</b> {prediction.Account.username}</p>
                <p><b>Posted:</b> {format(new Date(parseISO(prediction.post_time)), 'PPP p')}</p>
                <p><b>End Date:</b> <span className={(prediction.user_prediction_status === "Pending" && past && !yearCheck) ? "red" : ""} >{format(new Date(parseISO(prediction.timeframe)), 'PPP')}</span></p>
                <p><b>User Prediction Status: </b> {prediction.user_prediction_status}</p>
                <p><b>Category: </b> {prediction.category}</p>
              </div>
              <div className="col-sm vote-info-div">
                <p><b>Vote Tallies</b></p>
                <p>Plausible: <span className="green">{prediction.PredictionVoteTally.plausible}</span>  |  Implausible: <span className="red">{prediction.PredictionVoteTally.implausible}</span></p>
                {prediction.user_prediction_status === "Pending" 
                  ?
                    <p className="greyed-out">Agree: {prediction.PredictionVoteTally.correct}  |  Disagree: {prediction.PredictionVoteTally.incorrect}</p>
                  :
                    <p>Agree: <span className="green">{prediction.PredictionVoteTally.correct}</span>  |  Disagree: <span className="red">{prediction.PredictionVoteTally.incorrect}</span></p>
                }
                <p><b>Total Votes:</b> {prediction.PredictionVoteTally.plausible + prediction.PredictionVoteTally.implausible + prediction.PredictionVoteTally.correct + prediction.PredictionVoteTally.incorrect}</p>
                <p><b>Comments:</b> {prediction.Comments.length}</p>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default PredictionPane