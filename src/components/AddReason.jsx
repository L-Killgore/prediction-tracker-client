import React, { useContext, useState } from 'react'
import { FiCheckSquare, FiMinusSquare } from 'react-icons/fi';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

const AddReason = ({ showReasonField, setShowReasonField, incompletePrediction }) => {
  const { reasons, setReasons } = useContext(PredictionContext);
  const [addedReason, setAddedReason] = useState([]);

  const handleSubmit = async () => {
    if (addedReason.length === 0) {
      setShowReasonField(!showReasonField);
    } else {
      try {
        const response = await PredictionTrackerAPI.post("/reasons/", {
          prediction_id: incompletePrediction.prediction_id,
          reason: addedReason
        });
        setReasons([...reasons, response.data.data.reason]);
        setAddedReason([...addedReason, response.data.data.reason]);
        setShowReasonField(!showReasonField);
      } catch (err) {
        console.log(err);
      };
    };
  };

  const handleToggle = () => {
    setShowReasonField(!showReasonField);
  };

  return (
      <div className="row" id="add-reason">
        <div className="col-md-1 pe-0 add-reason-buttons">
          <span className="d-sm-inline d-md-block"><FiCheckSquare className="check" onClick={handleSubmit} /></span>
          <span className="d-sm-inline d-md-block"><FiMinusSquare className="minus" onClick={handleToggle} /></span>
        </div>
        <textarea className="col form-control" id="reason" type="text" value={addedReason} onChange={e => setAddedReason(e.target.value)} rows="4"></textarea>
      </div>
  )
}

export default AddReason