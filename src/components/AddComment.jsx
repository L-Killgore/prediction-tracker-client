import React, { useContext, useState } from 'react'

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

const AddComment = ({ forReply, parentComment, toggle, setToggle }) => {
  const { selectedPrediction, selectedPredictionComments, setSelectedPredictionComments, loggedUsername } = useContext(PredictionContext);
  const [comment, setComment] = useState("");


  const handleSubmit = async () => {
    let comment_count = selectedPredictionComments.length + 1;
    let child_value = 0;
    let parent_id = 0;

    if (parentComment) {
      parent_id = parentComment.comment_id
      child_value = parentComment.child_value + 1;
    }

    if (comment !== "") {
      try {
        const response = await PredictionTrackerAPI.post("/comments/create/", {
          prediction_id: selectedPrediction.prediction_id,
          user_id: loggedUsername.user_id,
          username: loggedUsername.username,
          parent_id: parent_id,
          comment_count: comment_count,
          child_value: child_value,
          comment: comment,
        });
        setSelectedPredictionComments([response.data.data.comment, ...selectedPredictionComments])
      } catch (err) {
        console.log(err);
      };
    };

    setComment("");
    if (setToggle) {
      setToggle(!toggle);
    };
  };

  return (
    <>
      {toggle &&
        <div className="col-md-11 pb-2 mx-auto comment-post-pane">
          {!forReply && 
            <h3>Discussion about <i>"{selectedPrediction.claim_title}"</i></h3>
          }
          <textarea className="m-2 form-control" type="text" value={comment} onChange={e => setComment(e.target.value)} rows="4" placeholder={!forReply ? "Post a comment" : "Post a reply"}></textarea>
          <button className="" onClick={handleSubmit}>Post</button>
        </div>
      }
    </>
  )
}

export default AddComment