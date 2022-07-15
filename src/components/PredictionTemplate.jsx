/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';
import DashboardLinks from './DashboardLinks';
import PaginatedItems from './PaginatedItems';

const PredictionTemplate = ({ predFilter, dashFilter }) => {
  const { categories, predictions, setPredictions, expiredPredictions, setExpiredPredictions, loggedUsername } = useContext(PredictionContext);
  const [recentFilter, setRecentFilter] = useState(false);
  const [recentArrow, setRecentArrow] = useState(true);
  const [plausCorFilter, setPlausCorFilter] = useState(null);
  const [plausCorArrow, setPlausCorArrow] = useState(null);
  const [mostVotesFilter, setMostVotesFilter] = useState(null);
  const [mostVotesArrow, setMostVotesArrow] = useState(null);
  const [concPredsToggle, setConcPredsToggle] = useState("all");
  const [showFiltersToggle, setShowFiltersToggle] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  
  const now = new Date();
  let location = useLocation();
  let selectedArray = predictions;
  let pageTitle = "";
  let zeroPredictionsStatement = "";

  ////////////////////////////////////////FILTERS////////////////////////////////////////
  // use filter() to get a subset of predictions[] called selectedArray[] which is then sent through <PaginatedItems />
  
  // for pending predictions
  if (predFilter === "Pending" || dashFilter === "Pending") {
    pageTitle = "Pending Predictions";

    // filters for Pending Predictions
    // if on the user's Dashboard
    if (dashFilter === "Pending") {
      selectedArray = predictions
        .filter(prediction => prediction.user_prediction_status === "Pending")
        .filter(prediction => new Date(prediction.timeframe) > now)
        .filter(prediction => prediction.Account.username === loggedUsername.username);

      if (categoryFilter) {
        if (categoryFilter === 'All') {
          selectedArray = selectedArray.filter(prediction => new Date(prediction.timeframe) > now);
        } else if (categoryFilter !== "") {
          selectedArray = selectedArray.filter(prediction => prediction.category === categoryFilter);
        };
      };

    // if on Pending Predictions page
    } else {
      selectedArray = predictions
        .filter(prediction => prediction.user_prediction_status === "Pending")
        .filter(prediction => new Date(prediction.timeframe) > now);

      if (categoryFilter) {
        if (categoryFilter === 'All') {
          selectedArray = selectedArray.filter(prediction => new Date(prediction.timeframe) > now);
        } else if (categoryFilter !== "") {
          selectedArray = selectedArray.filter(prediction => prediction.category === categoryFilter);
        };
      };
    };

  // for concluded predictions
  } else if (predFilter === "Concluded" || dashFilter === "Concluded") {
    pageTitle = "Concluded Predictions";

    // Filters for Concluded Predictions between All of them, Right ones, and Wrong ones
    // if on the user's Dashboard
    if (dashFilter === "Concluded") {
      if (concPredsToggle === "all") {
        selectedArray = predictions
          .filter(prediction => prediction.user_prediction_status === "Right" || prediction.user_prediction_status === "Wrong")
          .filter(prediction => prediction.Account.username === loggedUsername.username);
      } else if (concPredsToggle === "right") {
        selectedArray = predictions
          .filter(prediction => prediction.user_prediction_status === "Right")
          .filter(prediction => prediction.Account.username === loggedUsername.username);
      } else if (concPredsToggle === "wrong") {
        selectedArray = predictions
          .filter(prediction => prediction.user_prediction_status === "Wrong")
          .filter(prediction => prediction.Account.username === loggedUsername.username);
      };

      if (categoryFilter) {
        if (categoryFilter === 'All') {
          selectedArray = selectedArray.filter(prediction => prediction.user_prediction_status === "Right" || prediction.user_prediction_status === "Wrong");
        } else if (categoryFilter !== "") {
          selectedArray = selectedArray.filter(prediction => prediction.category === categoryFilter);
        };
      };
    // if on Concluded Predictions page
    } else {
      if (concPredsToggle === "all") {
        selectedArray = predictions
          .filter(prediction => prediction.user_prediction_status === "Right" || prediction.user_prediction_status === "Wrong")
      } else if (concPredsToggle === "right") {
        selectedArray = predictions
          .filter(prediction => prediction.user_prediction_status === "Right")
      } else if (concPredsToggle === "wrong") {
        selectedArray = predictions
          .filter(prediction => prediction.user_prediction_status === "Wrong")
      };

      if (categoryFilter) {
        if (categoryFilter === 'All') {
          selectedArray = selectedArray.filter(prediction => prediction.user_prediction_status === "Right" || prediction.user_prediction_status === "Wrong");
        } else if (categoryFilter !== "") {
          selectedArray = selectedArray.filter(prediction => prediction.category === categoryFilter);
        };
      };
    };
  
  // for expired predictions
  } else if (dashFilter === "Expired") {
    selectedArray = expiredPredictions
      .filter(expPred => expPred.Account.username === loggedUsername.username);
  };


  ////////////////////////////////////////SORTING////////////////////////////////////////
  // use sort() to rearrange selectedArray[] to show predictions by most recent, most plausible/correct, or by the most votes
  // Recent button
  if (recentFilter && !recentArrow) {
    selectedArray.sort((a, b) => new Date(a.post_time) - new Date(b.post_time));
  } else if (recentFilter && recentArrow) {
    selectedArray.sort((a, b) => new Date(b.post_time) - new Date(a.post_time));
  } else if (!recentFilter && !recentArrow) {
    selectedArray.sort((a, b) => new Date(a.post_time) - new Date(b.post_time));
  };

  // Plausible/Correct button
  // sort by DESC
  if (plausCorFilter && mostVotesFilter === null && recentFilter === null) {
    // to sort pending predictions by vote
    if (predFilter === "Pending" || dashFilter === "Pending") {
      selectedArray.sort((a, b) => 
        (b.PredictionVoteTally.plausible - b.PredictionVoteTally.implausible) 
        - 
        (a.PredictionVoteTally.plausible - a.PredictionVoteTally.implausible));
    // to sort concluded predictions by vote
    } else if (predFilter === "Concluded" || dashFilter === "Concluded") {
      selectedArray.sort((a, b) => 
        (b.PredictionVoteTally.correct - b.PredictionVoteTally.incorrect)
        - 
        (a.PredictionVoteTally.correct - a.PredictionVoteTally.incorrect));
    };
  // sort by ASC
  } else if (!plausCorFilter && mostVotesFilter === null && recentFilter === null) {
    // to sort pending predictions by vote
    if (predFilter === "Pending" || dashFilter === "Pending") {
      selectedArray
        .sort((a, b) => (a.PredictionVoteTally.implausible - b.PredictionVoteTally.implausible))
        .sort((a, b) => 
          (a.PredictionVoteTally.plausible - a.PredictionVoteTally.implausible) 
          - 
          (b.PredictionVoteTally.plausible - b.PredictionVoteTally.implausible));
    // to sort concluded predictions by vote
    } else if (predFilter === "Concluded" || dashFilter === "Concluded") {
      selectedArray
        .sort((a, b) => a.PredictionVoteTally.incorrect - b.PredictionVoteTally.incorrect)
        .sort((a, b) => 
          (a.PredictionVoteTally.correct - a.PredictionVoteTally.incorrect) 
          - 
          (b.PredictionVoteTally.correct - b.PredictionVoteTally.incorrect));
    };
  };

  // Votes button
  // sort by DESC
  if (mostVotesFilter && plausCorFilter === null && recentFilter === null) {
    // to sort pending predictions by vote
    if (predFilter === "Pending" || dashFilter === "Pending") {
      selectedArray
        .sort((a, b) => 
          (b.PredictionVoteTally.plausible + b.PredictionVoteTally.implausible) 
          - 
          (a.PredictionVoteTally.plausible + a.PredictionVoteTally.implausible));
    // to sort concluded predictions by vote
    } else if (predFilter === "Concluded" || dashFilter === "Concluded") {
      selectedArray
        .sort((a, b) => 
          (b.PredictionVoteTally.plausible + b.PredictionVoteTally.implausible + b.PredictionVoteTally.correct + b.PredictionVoteTally.incorrect)
          - 
          (a.PredictionVoteTally.plausible + a.PredictionVoteTally.implausible + a.PredictionVoteTally.correct + a.PredictionVoteTally.incorrect));
    }
  // sort by ASC
  } else if (!mostVotesFilter && plausCorFilter === null && recentFilter === null) {
    // to sort pending predictions by vote
    if (predFilter === "Pending" || dashFilter === "Pending") {
      selectedArray
        .sort((a, b) => 
          (a.PredictionVoteTally.plausible + a.PredictionVoteTally.implausible)
          - 
          (b.PredictionVoteTally.plausible + b.PredictionVoteTally.implausible));
    // to sort concluded predictions by vote
    } else if (predFilter === "Concluded" || dashFilter === "Concluded") {
      selectedArray
        .sort((a, b) => 
          (a.PredictionVoteTally.plausible + a.PredictionVoteTally.implausible + a.PredictionVoteTally.correct + a.PredictionVoteTally.incorrect)
          - 
          (b.PredictionVoteTally.plausible + b.PredictionVoteTally.implausible + b.PredictionVoteTally.correct + b.PredictionVoteTally.incorrect));
    }
  };

  // generate messages for when selectedArray[] is empty
  let subjectVerb = "";
  let predType = "";
  let categoryType = "";
  let thatClause = "";

  if (selectedArray.length === 0) {
    if (dashFilter) {
      subjectVerb = "You have"
    } else {
      subjectVerb = "There are"
    };

    if (predFilter === "Pending" || dashFilter === "Pending") {
      predType = "Pending";
      
      if (categoryFilter) {
        categoryType = `in the ${categoryFilter} category`;
      } else if (categoryFilter === "All") {
        categoryType = "";
      };
    } else if (predFilter === "Concluded" || dashFilter === "Concluded") {
      predType = "Concluded";

      if (categoryFilter) {
        categoryType = `in the ${categoryFilter} category`;
      } else if (categoryFilter === "All") {
        categoryType = "";
      };

      if (concPredsToggle === "right") {
        thatClause = "that have been designated as Right";
      } else if (concPredsToggle === "wrong") {
        thatClause = "that have been designated as Wrong"
      };
    } else if (dashFilter === "Expired") {
      predType = "Expired"
    };

    zeroPredictionsStatement = `${subjectVerb} no ${predType} Predictions ${categoryType} ${thatClause}`
  };

  const showFilters = () => {
    setShowFiltersToggle(!showFiltersToggle);
  };

  const filterPredictions = (filterValue) => {
    if (filterValue === "recent") {
      setRecentFilter(!recentFilter);
      setRecentArrow(!recentArrow);
      setPlausCorFilter(null);
      setPlausCorArrow(null);
      setMostVotesFilter(null);
      setMostVotesArrow(null);
    } else if (filterValue === "plausible" || filterValue === "correct") {
      setRecentFilter(null);
      setRecentArrow(null);
      setPlausCorFilter(!plausCorFilter);
      setPlausCorArrow(!plausCorArrow);
      setMostVotesFilter(null);
      setMostVotesArrow(null);
    } else if (filterValue === "most-votes") {
      setRecentFilter(null);
      setRecentArrow(null);
      setPlausCorFilter(null);
      setPlausCorArrow(null);
      setMostVotesFilter(!mostVotesFilter);
      setMostVotesArrow(!mostVotesArrow);
    } else if (filterValue === "all") {
      setConcPredsToggle("all");
      setRecentFilter(false);
      setRecentArrow(true);
      setPlausCorFilter(null);
      setPlausCorArrow(null);
      setMostVotesFilter(null);
      setMostVotesArrow(null);
    } else if (filterValue === "right") {
      setConcPredsToggle("right");
      setRecentFilter(false);
      setRecentArrow(true);
      setPlausCorFilter(null);
      setPlausCorArrow(null);
      setMostVotesFilter(null);
      setMostVotesArrow(null);
    } else if (filterValue === "wrong") {
      setConcPredsToggle("wrong");
      setRecentFilter(false);
      setRecentArrow(true);
      setPlausCorFilter(null);
      setPlausCorArrow(null);
      setMostVotesFilter(null);
      setMostVotesArrow(null);
    } else if (filterValue.id === "pred-category") {
      setCategoryFilter(filterValue.value);
      setRecentFilter(false);
      setRecentArrow(true);
      setPlausCorFilter(null);
      setPlausCorArrow(null);
      setMostVotesFilter(null);
      setMostVotesArrow(null);
    };
  };

  // cleanup useEffect to reset all filters
  useEffect(() => {
    setShowFiltersToggle(false);
    setCategoryFilter("");
    setConcPredsToggle("all");
    setRecentFilter(false);
    setRecentArrow(true);
    setPlausCorFilter(null);
    setPlausCorArrow(null);
    setMostVotesFilter(null);
    setMostVotesArrow(null);
  },[location])

  useEffect(() => {
    const fetchPreds = async () => {
      try {
        const response = await PredictionTrackerAPI.get("/predictions/all/");
        setPredictions(response.data.data.predictions)
      } catch (err) {
        console.log(err);
      };
    };

    const fetchExpiredPreds = async () => {
      try {
        const response = await PredictionTrackerAPI.get("/predictions/timeframe/");
        setExpiredPredictions(response.data.data.predictions);
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchPreds();
    fetchExpiredPreds();
  }, [recentFilter]);

  return (
    <div className={"row preds-template-div"}>
      <div className="col-md-4 text-center preds-template-sidebar">
        {predFilter === "Dashboard" ? <DashboardLinks dashFilter={dashFilter}/> : <h3 className="p-3 title-banner">{pageTitle}</h3>}

        {dashFilter !== "Expired" ?
          <button className={`mb-3 ${showFiltersToggle === true ? "pressed" : "unpressed"}`}type="button" onClick={showFilters}>
            Show Filters
          </button>
          :
          <p className="explanation">Expired Predictions are Predictions you have made that have reached the end of their timeframe. This means their truth value must be assessed. You must change the Status of this Prediction to Right or Wrong, depending on whether you believe your Prediction has come true or not. Click on the Prediction and then update the status to Right or Wrong.</p>
        }
          
        {showFiltersToggle && dashFilter !== "Expired" &&
          <>
            <div className="dropdown">
              <label htmlFor="pred-category">Category</label>
              <select className="form-select form-control" id="pred-category" defaultValue={categoryFilter ? categoryFilter : "Choose a Category"} onChange={e => filterPredictions(e.target)} aria-label="Select Prediction Category">
                <option disabled>Choose a Category</option>
                {categories.map((category, i) => {
                  return (
                    <option key={i} value={category}>{category}</option>
                  )
                })}
              </select>
            </div>

            {(predFilter === "Concluded" || (predFilter === "Dashboard" && dashFilter === "Concluded")) && 
              <nav className="row filters-navbar-conc">
                <ul>
                  <li>
                    <button className={`${concPredsToggle === "all" ? "pressed" : "unpressed"}`} value={"all"} onClick={(e) => filterPredictions(e.target.value)}>All</button>
                  </li>
                  <li>
                    <button className={`${concPredsToggle === "right" ? "pressed" : "unpressed"}`} value={"right"} onClick={(e) => filterPredictions(e.target.value)}>Right</button>
                  </li>
                  <li id="wrong-button">
                    <button className={`${concPredsToggle === "wrong" ? "pressed" : "unpressed"}`} value={"wrong"} onClick={(e) => filterPredictions(e.target.value)}>Wrong</button>
                  </li>
                </ul>
              </nav>
            }

            <nav className="row filters-navbar">
              <ul>
                <li>
                  <button className="col-md-8 mb-md-2" value={"recent"} onClick={(e) => filterPredictions(e.target.value)}>
                    Recent {recentArrow ? <BiUpArrow /> : <BiDownArrow />}
                  </button>
                </li>
                {(predFilter === "Pending" || dashFilter === "Pending")
                  ?
                  <li>
                    <button className="col-md-8 mb-md-2" value={"plausible"} onClick={(e) => filterPredictions(e.target.value)}>
                      Plausible {plausCorArrow ? <BiUpArrow /> : <BiDownArrow />}
                    </button>
                  </li>
                  :
                  (predFilter === "Concluded" || dashFilter === "Concluded")
                  ?
                  <li>
                    <button className="col-md-8 mb-md-2" value={"correct"} onClick={(e) => filterPredictions(e.target.value)}>
                      Correct {plausCorArrow ? <BiUpArrow /> : <BiDownArrow />}
                    </button>
                  </li>
                  :
                  <div></div>
                }
                <li>
                  <button className="col-md-8" value={"most-votes"} onClick={(e) => filterPredictions(e.target.value)}>
                    Votes {mostVotesArrow ? <BiUpArrow /> : <BiDownArrow />}
                  </button>
                </li>
              </ul>
            </nav>
          </>
        }
      </div>

      <div className="col-md-8 preds-template-preds">
        <PaginatedItems predictions={selectedArray} predsPerPage={15} zeroPredictionsStatement={zeroPredictionsStatement} />
      </div>
    </div>
  )
}

export default PredictionTemplate