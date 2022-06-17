import React, { useContext, useState } from 'react';
import { FiCheckSquare, FiMinusSquare } from 'react-icons/fi';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

const EditTempReason = ({ keyVal, editedReason, edited, setEdited, showEditReason, setShowEditReason }) => {
  const { reasons, setReasons } = useContext(PredictionContext);
  const [newReason, setNewReason] = useState(editedReason.reason);

  const handleSubmit = async () => {
    try {
      const response = await PredictionTrackerAPI.put(`/reasons/${editedReason.reason_id}`, {
        reason: newReason
      });
      setReasons([...reasons, response.data.data.reason]);
      setEdited(!edited);
      setShowEditReason(!showEditReason);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = () => {
    setShowEditReason(!showEditReason);
  };

  return (
    <>
      <div key={keyVal} className="col-md-1 pe-0 add-reason-buttons">
        <span className="d-sm-inline d-md-block"><FiCheckSquare className="check" onClick={handleSubmit} /></span>
        <span className="d-sm-inline d-md-block"><FiMinusSquare className="minus" onClick={handleToggle} /></span>
      </div>
      <textarea className="col form-control" id="reason" type="text" value={newReason} onChange={e => setNewReason(e.target.value)} rows="6"></textarea>
    </>
  )
}

export default EditTempReason