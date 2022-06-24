import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

import AddComment from '../components/AddComment';
import Comments from '../components/Comments';
import FindLinks from '../components/FindLinks';
import UpdateStatus from '../components/UpdateStatus';
import VoteButtons from '../components/VoteButtons';
import VoteTallies from '../components/VoteTallies';

const PredictionDetailPage = () => {
  const { selectedPrediction, setSelectedPrediction, selectedPredictionComments, setSelectedPredictionComments, localTally, reasons, setReasons, isAuthenticated, loggedUsername } = useContext(PredictionContext);
  const [color, setColor] = useState("");

  const { id } = useParams();

  ////////////////////////////////////////COMMENTS////////////////////////////////////////
  // variables for handling comment parsing
  let parentComments = selectedPredictionComments.filter(comment => comment.child_value === 0);
  let childComments = selectedPredictionComments.filter(comment => comment.child_value !== 0);
  let commentsArray = [];

  // inefficient recursion: childArray is always the entire childComments array, but it doesn't need to include childComments that have already been processed. Performance improvement here, but not a big deal at this point
  const sortComments = (parentComment, childArray) => {
    childArray.forEach(childComment => {
      if (parentComment.comment_id === childComment.parent_id) {
        commentsArray.push(childComment);
        sortComments(childComment, childArray)
      }
    })
  };

  parentComments.forEach(parentComment => {
    // push parentComment to commentsArray
    commentsArray.push(parentComment);
    sortComments(parentComment, childComments)
  });


  ////////////////////////////////////////COLOR CHANGING////////////////////////////////////////
  // variables for date to change color dependent on if timeframe has passed
  let currentTime = "";
  let expired = "";
  let past = "";
  let yearCheck = "";

  if (selectedPrediction) {
    currentTime = format(new Date(), 'P');
    expired = format(new Date(parseISO(selectedPrediction.timeframe)), 'P');
    past = currentTime >= expired;
    yearCheck = format(new Date(parseISO(selectedPrediction.timeframe)), 'y') > format(new Date(), 'y');
  }

  useEffect(() => {
    const fetchSelectedPrediction = async () => {
      try {
        const response = await PredictionTrackerAPI.get(`/predictions/${id}`);
        setSelectedPrediction(response.data.data.prediction);
      } catch (err) {
        console.log(err);
      };
    };

    const fetchReasons = async () => {
      try {
        const response = await PredictionTrackerAPI.get("/reasons/");
        setReasons(response.data.data.reasons);
      } catch (err) {
        console.log(err);
      };
    };

    const fetchSelectedPredictionComments = async () => {
      try {
        const response = await PredictionTrackerAPI.get(`/comments/${id}/`);
        setSelectedPredictionComments(response.data.data.comments);
      } catch (err) {
        console.log(err);
      };
    };

    fetchSelectedPrediction();
    fetchReasons();
    fetchSelectedPredictionComments();

    return async () => {
      setSelectedPrediction(null);
    };
  }, [id, setSelectedPrediction, setReasons, setSelectedPredictionComments]);

  // change border color depending on vote tallies
  useEffect(() => {
    if (selectedPrediction) {
      if (selectedPrediction.user_prediction_status === "Pending") {
        if (localTally.plausible > localTally.implausible) {
          setColor("green");
        } else if (localTally.implausible > localTally.plausible) {
          setColor("red");
        } else if (localTally.plausible === localTally.implausible) {
          setColor("yellow");
        };
      } else if (selectedPrediction.user_prediction_status === "Right" || selectedPrediction.user_prediction_status === "Wrong") {
        if (localTally.correct > localTally.incorrect) {
          setColor("green");
        } else if (localTally.incorrect > localTally.correct) {
          setColor("red");
        } else if (localTally.correct === localTally.incorrect) {
          setColor("yellow");
        };
      };
    };

  },[selectedPrediction, id, localTally.plausible, localTally.implausible, localTally.correct, localTally.incorrect]);

  return (
    <div className="row prediction-detail-pane">
      {selectedPrediction && 
        <>
          <div className={`col-md-10 mt-4 mb-4 pb-0 mx-auto prediction-detail-div prediction-pane shadow-${color}`}>
            <h3 className={`prediction-pane-header`}>{selectedPrediction.claim_title[0].toUpperCase() + selectedPrediction.claim_title.substring(1)}</h3>
            <div className="row">
              <div className="row text-center detail-page-info-div">
                <div className="col-sm prediction-info-div">
                  <p><b>Posted:</b> {format(new Date(parseISO(selectedPrediction.post_time)), 'PPP p')}</p>
                  <p><b>Predictor:</b> {selectedPrediction.Account.username}</p>
                  <p><b>User Prediction Status:</b> {selectedPrediction.user_prediction_status}</p>
                  <p><b>End Date:</b> <span className={(selectedPrediction.user_prediction_status === "Pending" && past && !yearCheck) ? "red" : ""} >{format(new Date(parseISO(selectedPrediction.timeframe)), 'PPP')}</span></p>
                </div>
                <div className="col-sm vote-info-div">
                  <VoteTallies predFilter={selectedPrediction.user_prediction_status} dashFilter={selectedPrediction.user_prediction_status} prediction={selectedPrediction} />
                </div>
              </div>

              <div className="update-prediction-button">
                {selectedPrediction.user_prediction_status === "Pending" && selectedPrediction.Account.username === loggedUsername.username && 
                  <UpdateStatus prediction={selectedPrediction} />
                }
              </div>

              <div className={`${(selectedPrediction.Account.username === loggedUsername.username || !isAuthenticated) && "bottom-corners"} detail-page-content-div`}>
                <div className="major-claim-div">
                  <h4 className="prediction-header">Major Claim:</h4>
                  <p>{selectedPrediction.claim_major}</p>
                </div>
                <div className="reasons-div">
                  <h4 className="prediction-header">Reasons:</h4>
                  {reasons.filter(reason => reason.prediction_id === selectedPrediction.prediction_id).length === 0
                    ?
                      <p>{selectedPrediction.Account.username} did not provide any reasons.</p>
                    : 
                      reasons.filter(reason => reason.prediction_id === selectedPrediction.prediction_id).map((reason, i) => {
                        return (
                          <FindLinks reason={reason.reason} />
                        )
                      })}
                </div>

                {selectedPrediction.user_prediction_status !== "Pending" &&
                  <div className="conc-reason-div">
                    <h4 className="prediction-header">Why {selectedPrediction.Account.username} believes this prediction is {selectedPrediction.user_prediction_status === "Right" ? "correct" : "incorrect"}:</h4>
                    <p className="conc-reason-timestamp"><b>Posted:</b> {format(new Date(parseISO(selectedPrediction.conc_reason_timestamp)), 'PPP p')}</p>
                    {selectedPrediction.conc_reason
                      ?
                        <FindLinks reason={selectedPrediction.conc_reason} />
                      :
                        <p>{selectedPrediction.Account.username} did not provide any reasons.</p>
                    }
                  </div>
                }
              </div>

              {isAuthenticated && selectedPrediction.Account.username !== loggedUsername.username && 
                <div className="row vote-div mx-auto">
                  <VoteButtons predictionType={selectedPrediction.user_prediction_status} />
                </div>
              }
            </div>
          </div>

          <div className="row comment-box mx-auto g-0">
            {!isAuthenticated ?
                <>
                  <hr/>
                  <p className="text-center">You must be <a href="/login">logged in</a> to comment on this prediction.</p>
                </>
              :
              isAuthenticated && selectedPrediction.Account.username !== loggedUsername.username ?
                (
                  <>
                    <hr/>
                    <AddComment forReply={false} toggle={true} />
                  </>
                )
              :
              <p></p>
            }

            <hr/>

            <div className="comment-section mx-auto">
              {selectedPredictionComments.length === 0
                ?
                  <p className="text-center">There are no comments for this prediction.</p>
                :
                selectedPredictionComments && commentsArray.map((comment, i) => {
                  return (
                    <Comments keyVal={i} comment={comment} />
                  )
                })
              }
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default PredictionDetailPage