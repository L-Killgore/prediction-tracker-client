import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';

const UpdateStatus = ({ prediction }) => {
  const [status, setStatus] = useState("");
  const [concReason, setConcReason] = useState("");
  const navigate = useNavigate();
  const timeElapsed = Date.now();
  const date = new Date(timeElapsed);

  const handleUpdateButtons = (buttonValue) => {
    setStatus(buttonValue);
  };

  const handleUpdateStatus = async (prediction) => {
    try {
      await PredictionTrackerAPI.put(`/predictions/${prediction.prediction_id}`, {
        user_id: prediction.user_id,
        user_prediction_status: status,
        claim_title: prediction.claim_title,
        claim_major: prediction.claim_major,
        timeframe: prediction.timeframe,
        post_time: prediction.post_time,
        status: prediction.status,
        conc_reason: concReason,
        conc_reason_timestamp: date
      });
    } catch (err) {
      console.log(err);
    };
    navigate("/dashboard/my-concluded");
  };

  const handleClose = () => {
    setStatus("");
    setConcReason("");
  };

  return (
    <>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="row modal-header g-0">
              <h1 className="col-11 modal-title text-center" id="staticBackdropLabel">Warning!</h1>
              <button className="col btn-close btn-close-white" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>This action will change a Pending Prediction into a Concluded Prediction and cannot be undone.</p>
              <p>You must choose whether you believe your Pending Prediction is Right or Wrong, and then provide a reason why you believe your Prediction is Concluded.</p>

              <nav className="update-modal-buttons text-center">
                <ul className="p-0">
                  <li>
                    <button className={`${status === "Right" ? "pressed" : "unpressed"}`} value={"Right"} onClick={(e) => handleUpdateButtons(e.target.value)}>Right</button>
                  </li>
                  <li>
                    <button className={`${status === "Wrong" ? "pressed" : "unpressed"}`} value={"Wrong"} onClick={(e) => handleUpdateButtons(e.target.value)}>Wrong</button>
                  </li>
                </ul>
              </nav>
              
              <div className={`${status === "" ? "d-none" : "d-block"}`}>
                <label htmlFor="conc-reason">Reason Prediction is {status}</label>
                <textarea className="col form-control" id="conc-reason" type="text" value={concReason} onChange={e => setConcReason(e.target.value)} rows="3"></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
              {concReason === ""
                ?
                <button disabled className="btn update-button" type="button" data-bs-dismiss="modal" aria-disabled="true">
                  Update
                </button>
                :
                <button className="update-button" type="button" data-bs-dismiss="modal" onClick={() => handleUpdateStatus(prediction)}>
                  Update
                </button>
              }
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <button className="col-10 col-md-6 mx-auto" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" aria-expanded="false">
          Update Status
        </button>
      </div>
    </>
  )
}

export default UpdateStatus