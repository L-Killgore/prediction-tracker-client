/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

import PlusClick from '../components/PlusClick';
import TempReasons from '../components/TempReasons';


const PredictionCreate = () => {
  const { categories, reasons, voteTallies, setVoteTallies, loggedUsername } = useContext(PredictionContext);
  const [predictionTitle, setPredictionTitle] = useState("");
  const [majorClaim, setMajorClaim] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [incompletePrediction, setIncompletePrediction] = useState([]);
  const [missingTitleError, setMissingTitleError] = useState("");
  const [missingClaimError, setMissingClaimError] = useState("");
  const [missingTimeframeError, setMissingTimeframeError] = useState("");
  const [longTitleError, setLongTitleError] = useState("");
  const [longClaimError, setLongClaimError] = useState("");
  const [predCategory, setPredCategory] = useState("");
  const [predCategoryError, setPredCategoryError] = useState("");

  let navigate = useNavigate();
  const timeElapsed = Date.now();
  const date = new Date(timeElapsed);

  const filteredReasons = reasons.filter(reason => reason.prediction_id === incompletePrediction.prediction_id).sort((a, b) => a.reason_id - b.reason_id);
  
  const handleSubmit = async () => {
    let unformattedTimeframe = "";
    let formattedTimeframeWithTimezone = "";
    let formattedDate = "";
    let noErrors = true;

    // error handling: missing fields
    if (predictionTitle === "") {
      noErrors = false;
      setMissingTitleError("Error: Please include a Prediction Title.");
    } else {
      setMissingTitleError("");
    };
    if (majorClaim === "") {
      noErrors = false;
      setMissingClaimError("Error: Please include a Major Claim.");
    } else {
      setMissingClaimError("");
    };

    // error handling: timeframe missing or before current date
    if (timeframe !== "") {
      // alter format of timeframe to account for timezone change on database
      unformattedTimeframe = new Date(timeframe);
      formattedTimeframeWithTimezone = new Date(unformattedTimeframe.valueOf() + unformattedTimeframe.getTimezoneOffset() * 60 * 1000);
      formattedDate = new Date();
    };
    if (timeframe === "") {
      noErrors = false;
      setMissingTimeframeError("Error: Please include the date when the prediction comes true.");
    } else if (formattedTimeframeWithTimezone <= formattedDate) {
      noErrors = false;
      setMissingTimeframeError("Error: This date must be sometime after today.")
    } else {
      setMissingTimeframeError("");
    };

    // error handling: input too long
    if (predictionTitle.length > 100) {
      noErrors = false;
      setLongTitleError("Error: Prediction Title cannot exceed 100 characters.");
    } else {
      setLongTitleError("");
    };
    if (majorClaim.length > 264) {
      noErrors = false;
      setLongClaimError("Error: Major Claim cannot exceed 265 characters.");
    } else {
      setLongClaimError("");
    };

    // error handling: no category chosen
    if (predCategory === "") {
      noErrors = false;
      setPredCategoryError("Error: Please choose a category for your prediction.")
      console.log("predCategory blank")
    } else {
      setPredCategoryError("");
    };

    // if there are no errors in frontend
    if (noErrors) {
      try {
        await PredictionTrackerAPI.put(`/predictions/${incompletePrediction.prediction_id}`, {
          user_id: loggedUsername.user_id,
          user_prediction_status: 'Pending',
          claim_title: predictionTitle,
          claim_major: majorClaim,
          timeframe: formattedTimeframeWithTimezone,
          category: predCategory,
          post_time: date,
          status: 'complete'
        });
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.post("/votes/tallies", {
          prediction_id: incompletePrediction.prediction_id
        });
        setVoteTallies([...voteTallies, response.data.data.tallies]);
      } catch (err) {
        console.log(err);
      };

      navigate(`/predictions/${incompletePrediction.prediction_id}`);
    };
  };

  const handleCancelPrediction = async () => {
    if (incompletePrediction.prediction_id) {
      try {
        await PredictionTrackerAPI.delete(`/predictions/${incompletePrediction.prediction_id}`);
      } catch (err) {
        console.log(err);
      };
    };

    navigate("/dashboard");
  };

  useEffect(() => {
    const makeIncPred = async () => {
      try {
        const response = await PredictionTrackerAPI.post("/predictions/", {
          user_id: loggedUsername.user_id,
          user_prediction_status: 'inc',
          claim_title: '',
          claim_major: '',
          timeframe: date,
          category: '',
          post_time: date,
          status: 'incomplete'
        });

        setIncompletePrediction(response.data.data.prediction);
      } catch (err) {
        console.log(err);
      };
    };

    makeIncPred();

    return async () => {
      try {
        await PredictionTrackerAPI.delete(`/predictions/incomplete/${loggedUsername.user_id}`);
      } catch (err) {
        console.log(err);
      };
    };
  },[]);

  return (
    <div className="row create-pane">
      <div className="col col-md-10 mx-auto m-4 p-2 text-center text-md-start white-pane">
        <h3 className="prediction-pane-header">Make a Prediction</h3>
        <div className="m-2">
          <label htmlFor="prediction-title">Prediction Title</label>
          <input className="form-control" id="prediction-title" type="text" value={predictionTitle} onChange={e => setPredictionTitle(e.target.value)} />
          {missingTitleError && <div className="alert alert-danger" role="alert">{missingTitleError}</div>}
          {longTitleError && <div className="alert alert-danger" role="alert">{longTitleError}</div>}
          <label htmlFor="major-claim">Major Claim</label>
          <input className="form-control" id="major-claim" type="text" value={majorClaim} onChange={e => setMajorClaim(e.target.value)} />
          {missingClaimError && <div className="alert alert-danger" role="alert">{missingClaimError}</div>}
          {longClaimError && <div className="alert alert-danger" role="alert">{longClaimError}</div>}
          <label htmlFor="timeframe">Date When Prediction Comes True</label>
          <input className="form-control" id="timeframe" type="date" value={timeframe} onChange={e => setTimeframe(e.target.value)} />
          {missingTimeframeError && <div className="alert alert-danger" role="alert">{missingTimeframeError}</div>}
          <div className="dropdown">
            {/* <p className="explanation mt-3">Choose the Citation Template below that best fits your source. If you cannot find enough information for your source, use the Basic Citation template.</p> */}
            <label htmlFor="pred-category">Category</label>
            <select className="form-select form-control" id="pred-category" defaultValue="Choose a Category" onChange={e => setPredCategory(e.target.value)} aria-label="Select Prediction Category">
              <option disabled>Choose a Category</option>
              {categories.map((category, i) => {
                return (
                  <option key={i} value={category}>{category}</option>
                )
              })}
            </select>
          </div>
          {predCategoryError && <div className="alert alert-danger" role="alert">{predCategoryError}</div>}

          <div className="supporting-reasons-div">
            <PlusClick incompletePrediction={incompletePrediction} />
            {filteredReasons && filteredReasons.map((filteredReason, i) => {
              return (
                <TempReasons keyVal={i} filteredReason={filteredReason} />
              )
            })}
          </div>
        </div>
        <button onClick={handleSubmit}>Submit Prediction</button>
        <button className="ms-2" onClick={handleCancelPrediction}>Cancel</button>
      </div>
    </div>
  )
}

export default PredictionCreate