import React, { useState } from 'react'
import { FiPlusSquare } from 'react-icons/fi';

import AddReason from './AddReason';

const PlusClick = ({ incompletePrediction }) => {
  const [showReasonField, setShowReasonField] = useState(false);

  const plusClick = async () => {
    setShowReasonField(!showReasonField);
  };

  return (
    <>
      <label htmlFor="reason">Supporting Reasons<FiPlusSquare className="plus" onClick={plusClick} /></label>
      {showReasonField && 
        <AddReason
          showReasonField={showReasonField}
          setShowReasonField={setShowReasonField}
          incompletePrediction={incompletePrediction}
        />
      }
    </>
  )
}

export default PlusClick