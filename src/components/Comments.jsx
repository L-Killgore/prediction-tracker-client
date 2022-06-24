import React, { useContext, useState } from 'react'
import { format, parseISO } from 'date-fns';

import { PredictionContext } from '../context/PredictionContext';

import AddComment from './AddComment';


const Comments = ({ keyVal, comment }) => {
  const { selectedPrediction, isAuthenticated } = useContext(PredictionContext);

  const [toggleAddComment, setToggleAddComment] = useState(false);

  const handleSubmitReply =  async () => {
    setToggleAddComment(!toggleAddComment);
  };

  return (
    <div key={keyVal} className={`comment ${comment.child_value > 5 ? "child-value-max" : `child-value-${comment.child_value}`}`}>
      <strong className={`${comment.username === selectedPrediction.Account.username ? "pred-poster" : ""} me-1`}>{comment.username}</strong>
      <small className="text-muted">{format(new Date(parseISO(comment.createdAt)), 'PP p')}</small>
      <p>{comment.comment}</p>
      {isAuthenticated &&
        <button className="" onClick={handleSubmitReply}>Reply</button>
      }
      {toggleAddComment && 
        <AddComment forReply={true} parentComment={comment} toggle={toggleAddComment} setToggle={setToggleAddComment} />
      }
    </div>
  )
}

export default Comments