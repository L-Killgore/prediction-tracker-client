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
      <div className="supporting-reasons-header">
        <label htmlFor="reason">Supporting Reasons</label>
        <FiPlusSquare className="plus" onClick={plusClick} />
      </div>
      <div className="supporting-reasons-body">
        {showReasonField && 
          <AddReason
            showReasonField={showReasonField}
            setShowReasonField={setShowReasonField}
            incompletePrediction={incompletePrediction}
          />
        }
      </div>
    </>
  )
}

export default PlusClick