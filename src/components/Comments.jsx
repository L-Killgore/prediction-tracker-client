import React, { useContext, useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns';
import { BsChatText } from 'react-icons/bs';
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { MdExpand } from 'react-icons/md';

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

import AddComment from './AddComment';
import FindLinks from './FindLinks';

const Comments = ({ comment, commentsArray }) => {
  const { selectedPrediction, selectedPredictionAggLikes, setSelectedPredictionAggLikes, selectedPredictionAggDislikes, setSelectedPredictionAggDislikes, isAuthenticated, loggedUsername } = useContext(PredictionContext);
  const [localCommentVotes, setLocalCommentVotes] = useState([]);
  const [toggleAddComment, setToggleAddComment] = useState(false);
  const [toggleReplies, setToggleReplies] = useState("d-none");
  const [likesTally, setLikesTally] = useState(comment.likes);
  const [dislikesTally, setDislikesTally] = useState(comment.dislikes);

  let agg_child_count = 0;
  
  if (commentsArray && comment.child_value === 0) {
    agg_child_count = commentsArray.filter(ele => comment.comment_id === ele.super_parent_id).length;
  }

  const handleExpandButton = () => {
    if (toggleReplies === "d-none") {
      setToggleReplies("d-block");
    } else if (toggleReplies === "d-block") {
      setToggleReplies("d-none");
    };
  };

  const handleReplyButton =  async () => {
    setToggleAddComment(!toggleAddComment);
    if (!toggleAddComment && toggleReplies === "d-none") {
      setToggleReplies("d-block");
    };
  };

  const handleCommentGood = async () => {
    if (localCommentVotes.length === 0) {
      try {
        await PredictionTrackerAPI.put(`/comment-votes/like-add/${comment.comment_id}`);
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.post("/comment-votes/", {
          comment_id: comment.comment_id,
          user_id: loggedUsername.user_id,
          likes: true,
          dislikes: false
        });
        setLocalCommentVotes([...localCommentVotes, response.data.data.commentVote]);
        setLikesTally(likesTally + 1);
        setSelectedPredictionAggLikes(selectedPredictionAggLikes + 1);
      } catch (err) {
        console.log(err);
      };
    } else if (localCommentVotes[0].likes === true) {
      try {
        await PredictionTrackerAPI.put(`/comment-votes/like-remove/${comment.comment_id}`);
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.put(`/comment-votes/${localCommentVotes[0].comment_vote_id}`, {
          comment_id: comment.comment_id,
          user_id: loggedUsername.user_id,
          likes: false,
          dislikes: false
        });
        setLocalCommentVotes([...localCommentVotes, response.data.data.commentVote]);
        setLikesTally(likesTally - 1);
        setSelectedPredictionAggLikes(selectedPredictionAggLikes - 1);
      } catch (err) {
        console.log(err);
      };
    } else if (localCommentVotes[0].dislikes === true) {
      try {
        await PredictionTrackerAPI.put(`/comment-votes/dislike-remove/${comment.comment_id}`);
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.put(`/comment-votes/${localCommentVotes[0].comment_vote_id}`, {
          comment_id: comment.comment_id,
          user_id: loggedUsername.user_id,
          likes: false,
          dislikes: false
        });
        setLocalCommentVotes([...localCommentVotes, response.data.data.commentVote]);
        setDislikesTally(dislikesTally - 1);
        setSelectedPredictionAggDislikes(selectedPredictionAggDislikes - 1);
      } catch (err) {
        console.log(err);
      };
    } else if (localCommentVotes.length !== 0 && (localCommentVotes[0].likes === false && localCommentVotes[0].dislikes === false)) {
      try {
        await PredictionTrackerAPI.put(`/comment-votes/like-add/${comment.comment_id}`);
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.put(`/comment-votes/${localCommentVotes[0].comment_vote_id}`, {
          comment_id: comment.comment_id,
          user_id: loggedUsername.user_id,
          likes: true,
          dislikes: false
        });
        setLocalCommentVotes([...localCommentVotes, response.data.data.commentVote]);
        setLikesTally(likesTally + 1);
        setSelectedPredictionAggLikes(selectedPredictionAggLikes + 1);
      } catch (err) {
        console.log(err);
      };
    }
  };

  const handleCommentBad = async () => {
    if (localCommentVotes.length === 0) {
      try {
        await PredictionTrackerAPI.put(`/comment-votes/dislike-add/${comment.comment_id}`);
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.post("/comment-votes/", {
          comment_id: comment.comment_id,
          user_id: loggedUsername.user_id,
          likes: false,
          dislikes: true
        });
        setLocalCommentVotes([...localCommentVotes, response.data.data.commentVote]);
        setDislikesTally(dislikesTally + 1);
        setSelectedPredictionAggDislikes(selectedPredictionAggDislikes + 1);
      } catch (err) {
        console.log(err);
      };
    } else if (localCommentVotes[0].dislikes === true) {
      try {
        await PredictionTrackerAPI.put(`/comment-votes/dislike-remove/${comment.comment_id}`);
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.put(`/comment-votes/${localCommentVotes[0].comment_vote_id}`, {
          comment_id: comment.comment_id,
          user_id: loggedUsername.user_id,
          likes: false,
          dislikes: false
        });
        setLocalCommentVotes([...localCommentVotes, response.data.data.commentVote]);
        setDislikesTally(dislikesTally - 1);
        setSelectedPredictionAggDislikes(selectedPredictionAggDislikes - 1);
      } catch (err) {
        console.log(err);
      };
    } else if (localCommentVotes[0].likes === true) {
      try {
        await PredictionTrackerAPI.put(`/comment-votes/like-remove/${comment.comment_id}`);
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.put(`/comment-votes/${localCommentVotes[0].comment_vote_id}`, {
          comment_id: comment.comment_id,
          user_id: loggedUsername.user_id,
          likes: false,
          dislikes: false
        });
        setLocalCommentVotes([...localCommentVotes, response.data.data.commentVote]);
        setLikesTally(likesTally - 1);
        setSelectedPredictionAggLikes(selectedPredictionAggLikes - 1);
      } catch (err) {
        console.log(err);
      };
    } else if (localCommentVotes.length !== 0 && (localCommentVotes[0].dislikes === false && localCommentVotes[0].likes === false)) {
      try {
        await PredictionTrackerAPI.put(`/comment-votes/dislike-add/${comment.comment_id}`);
      } catch (err) {
        console.log(err);
      };

      try {
        const response = await PredictionTrackerAPI.put(`/comment-votes/${localCommentVotes[0].comment_vote_id}`, {
          comment_id: comment.comment_id,
          user_id: loggedUsername.user_id,
          likes: false,
          dislikes: true
        });
        setLocalCommentVotes([...localCommentVotes, response.data.data.commentVote]);
        setDislikesTally(dislikesTally + 1);
        setSelectedPredictionAggDislikes(selectedPredictionAggDislikes + 1);
      } catch (err) {
        console.log(err);
      };
    };
  };

  useEffect(() => {
    const fetchCommentVotes = async () => {
      try {
        const response = await PredictionTrackerAPI.get(`/comment-votes/${comment.comment_id}`);
        setLocalCommentVotes(response.data.data.commentVotes);
      } catch (err) {
        console.log(err);
      };
    };

    fetchCommentVotes();
  },[comment.comment_id, setLocalCommentVotes, likesTally, dislikesTally]);

  return (
    <div key={comment.comment_id}
      className={`
        comment
        ${comment.child_value === 0 ? "col-12 col-md-10 col-xxl-8 mx-auto" : ""}
        ${comment.child_value > 5 ? "child-value-max" : `child-value-${comment.child_value}`}
        `}
      >
      <div className="comment-header mb-2 text-center text-sm-start">
        <strong className={`${comment.username === selectedPrediction.Account.username ? "pred-poster" : ""} me-1`}>{comment.username}</strong>
        <small className="text-muted">{format(new Date(parseISO(comment.createdAt)), 'PP p')}</small>
        <p className="d-block d-md-inline ps-2 float-sm-end">
          {comment.child_value === 0 &&
            <span>{agg_child_count} Repl{comment.child_count === 1 ? "y" : "ies"} | </span>
          }
          <span>Good Point: <span className="green">{likesTally} | </span></span>
          <span>Bad Point: <span className="red">{dislikesTally}</span></span>
        </p>
      </div>
      <p className="p-2">
        <FindLinks text={comment.comment} component={"comment"} />
      </p>
      <div className="comment-buttons text-center">
        {isAuthenticated &&
          <span className="reply-button"><BsChatText onClick={handleReplyButton} /></span>
        }
        {comment.child_value === 0 && agg_child_count > 0 &&
          <span className="expand-button"><MdExpand onClick={handleExpandButton} /></span>
        }
        {
          isAuthenticated && loggedUsername.user_id !== comment.user_id && localCommentVotes.length === 0 ? 
          (
            <>
              <span className="comment-good green"><FaRegThumbsUp onClick={handleCommentGood} /></span>
              <span className="comment-bad red"><FaRegThumbsDown onClick={handleCommentBad} /></span>
            </>
          )
          :
          isAuthenticated && loggedUsername.user_id !== comment.user_id && localCommentVotes[0].likes === true ?
          (
            <>
              <span className="comment-good green"><FaThumbsUp onClick={handleCommentGood} /></span>
              <span className="comment-bad greyed-out"><FaRegThumbsDown onClick={handleCommentBad} /></span>
            </>
          )
          :
          isAuthenticated && loggedUsername.user_id !== comment.user_id && localCommentVotes[0].dislikes === true ?
          (
            <>
              <span className="comment-good greyed-out"><FaRegThumbsUp onClick={handleCommentGood} /></span>
              <span className="comment-bad red"><FaThumbsDown onClick={handleCommentBad} /></span>
            </>
          )
          :
          isAuthenticated && loggedUsername.user_id !== comment.user_id && (localCommentVotes[0].likes === false && localCommentVotes[0].dislikes === false) ?
          (
            <>
              <span className="comment-good green"><FaRegThumbsUp onClick={handleCommentGood} /></span>
              <span className="comment-bad red"><FaRegThumbsDown onClick={handleCommentBad} /></span>
            </>
          )
          :
          <></>
        }
      </div>

      {toggleAddComment && 
        <AddComment forReply={true} parentComment={comment} toggle={toggleAddComment} setToggle={setToggleAddComment} setToggleReplies={setToggleReplies} />
      }
      
      <div className={`${toggleReplies} comment-replies`}>
        {commentsArray && 
          commentsArray
            .filter(ele => ele.super_parent_id === comment.comment_id)
            .map((ele => {
              return <Comments comment={ele} />
            })
          )
        }
      </div>
    </div>
  )
}

export default Comments