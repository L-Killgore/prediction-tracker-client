import React, { useContext, useEffect, useState } from 'react'
import { FiEdit, FiMinusSquare } from 'react-icons/fi';
import { GrBlockQuote } from 'react-icons/gr';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

import EditTempReason from './EditTempReason';
import FindLinks from './FindLinks';
import SourceCreate from './SourceCreate';
import Sources from './Sources';

const TempReasons = ({ keyVal, filteredReason }) => {
  const { setReasons } = useContext(PredictionContext);
  const [deletedReason, setDeletedReason] = useState(false);
  const [edited, setEdited] = useState(false);
  const [editedReason, setEditedReason] = useState("");
  const [showEditReason, setShowEditReason] = useState(false);
  const [showAddSource, setShowAddSource] = useState(false);
  const [deletedSource, setDeletedSource] = useState(false);
  const [newSource, setNewSource] = useState(false);

  const handleDeleteReason = async (reason_id) => {
    try {
      await PredictionTrackerAPI.delete(`/reasons/${reason_id}`)
    } catch (err) {
      console.log(err);
    };

    setDeletedReason(!deletedReason);
  };

  const handleEditReason = async (reason) => {
    setEditedReason(reason);
    setShowEditReason(!showEditReason);
  };

  const handleCite = async () => {
    setShowAddSource(!showAddSource);
  };

  const handleDeleteSource = async (source_id) => {
    try {
      await PredictionTrackerAPI.delete(`/sources/${source_id}`)
    } catch (err) {
      console.log(err);
    };

    setDeletedSource(!deletedSource);
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
  },[deletedReason, deletedSource, edited, setReasons, newSource, showAddSource]);

  return (
    <>
      <div className="row gradient-pane" id={filteredReason.reason_id}>
        {showEditReason
          ? 
            <EditTempReason keyVal={keyVal} editedReason={editedReason} edited={edited} setEdited={setEdited} showEditReason={showEditReason} setShowEditReason={setShowEditReason} /> 
          :
            <>
              <div className="col-md-1 pe-0 edit-reason-buttons">
                <span className="d-sm-inline d-md-block"><FiMinusSquare className="minus" onClick={() => handleDeleteReason(filteredReason.reason_id)} /></span>
                <span className="d-sm-inline d-md-block"><FiEdit className="pencil" onClick={() => handleEditReason(filteredReason)} /></span>
                <span className="d-sm-inline d-md-block"><GrBlockQuote className="cite" onClick={handleCite} /></span>
              </div>
              <FindLinks key={keyVal} text={filteredReason.reason} component={"add-reason"} />
            </>
        }
      </div>

      {filteredReason.Sources && filteredReason.Sources.map((source, i) => {
          return (
            <div className="row source-div ms-auto">
              <div className="col-md-1 pe-0 edit-reason-buttons">
                <span className="d-sm-inline d-md-block"><FiMinusSquare className="minus" onClick={() => handleDeleteSource(source.source_id)} /></span>
              </div>
              <Sources key={i} source={source} />
            </div>
          )
        })
      }

      {showAddSource &&
        <SourceCreate reason={filteredReason} showAddSource={showAddSource} setShowAddSource={setShowAddSource} newSource={newSource} setNewSource={setNewSource} />
      }
    </>
  )
}

export default TempReasons