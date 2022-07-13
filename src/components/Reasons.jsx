import React, { useContext, useEffect } from 'react'

import PredictionTrackerAPI from '../apis/PredictionTrackerAPI';
import { PredictionContext } from '../context/PredictionContext';

import FindLinks from './FindLinks';
import Sources from './Sources';

const Reasons = ({ prediction }) => {
  const { reasons, setReasons } = useContext(PredictionContext);

  
  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const response = await PredictionTrackerAPI.get(`/reasons/${prediction.prediction_id}`);
        setReasons(response.data.data.reasons);
      } catch (err) {
        console.log(err);
      };
    };

    fetchReasons();
  },[prediction.prediction_id, setReasons])

  return (
    <div className="reasons-div">
      <h4 className="prediction-header">Reasons:</h4>
      {reasons.length === 0
        ?
          <p>{prediction.Account.username} did not provide any reasons.</p>
        : 
          reasons.map((reason, i) => {
            return (
              <>
                <div className="reason-source-group">
                  <FindLinks key={i} text={reason.reason} component={"reason"} />
                  <div className="col reason-source text-start align-self-center">
                    {reason.Sources.length === 0 ? <></> : <p className="source-header mt-2">Source{reason.Sources.length > 1 && "s"}</p>}
                    {reason.Sources.map((source, i) => <Sources key={i} source={source} />)}
                  </div>
                </div>
              </>
            )
          })}
    </div>
  )
}

export default Reasons