import React, { useContext, useEffect, useState } from 'react'
import { FiEdit, FiMinusSquare } from 'react-icons/fi';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

import EditTempReason from './EditTempReason';
import FindLinks from './FindLinks';

const TempReasons = ({ keyVal, filteredReason }) => {
  const { setReasons } = useContext(PredictionContext);
  const [deleted, setDeleted] = useState(false);
  const [edited, setEdited] = useState(false);
  const [showEditReason, setShowEditReason] = useState(false);
  const [editedReason, setEditedReason] = useState("");

  const handleDeleteReason = async (reason_id) => {
    try {
      await PredictionTrackerAPI.delete(`/reasons/${reason_id}`)
    } catch (err) {
      console.log(err);
    };

    setDeleted(!deleted);
  };

  const handleEditReason = async (reason) => {
    setEditedReason(reason);
    setShowEditReason(!showEditReason);
  };

  useEffect(() => {
    const getReasons = async () => {
      try {
        const response = await PredictionTrackerAPI.get("/reasons/");
        setReasons(response.data.data.reasons);
      } catch (err) {
        console.log(err);
      };
    };

    getReasons();
  },[deleted, edited, setReasons]);


  return (
    <div className="row temp-reason" id={filteredReason.reason_id}>
        {showEditReason
        ? 
          <EditTempReason keyVal={keyVal} editedReason={editedReason} edited={edited} setEdited={setEdited} showEditReason={showEditReason} setShowEditReason={setShowEditReason} /> 
        :
          <>
            <div key={keyVal} className="col-md-1 pe-0 edit-reason-buttons">
              <span className="d-sm-inline d-md-block"><FiMinusSquare className="minus" onClick={() => handleDeleteReason(filteredReason.reason_id)} /></span>
              <span className="d-sm-inline d-md-block"><FiEdit className="pencil" onClick={() => handleEditReason(filteredReason)} /></span>
            </div>
            <FindLinks key={keyVal} text={filteredReason.reason} component={"add-reason"} />
          </>
        }
    </div>
  )
}

export default TempReasons