import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

import { PredictionContext } from '../context/PredictionContext';

const Home = () => {
  const { isAuthenticated } = useContext(PredictionContext);
  let navigate = useNavigate();

  const toRegister = () => {
    navigate("/register")
  }

  return (
    <div className="row cball tan-bg g-0">
      <div className="col-md-4 p-2 p-md-5 home-banner-pane">
        <h1>Have a prediction to make?</h1>
        <p>Share a prediction you've made, or browse predictions made by others.</p>
        <button onClick={toRegister}>{isAuthenticated ? "My Dashboard" : "Create an account"}</button>
      </div>
      <div className="col col-md-10 mx-auto mb-5 p-4 p-md-5 text-md-start white-pane home-info">
        <h3>The place to go to track your predictions!</h3>
        <p>
          Do you like to speculate about what the future holds? Do you enjoy the feeling of being right about something that your friends were skeptical of? Well now there is a place for you to post all of your predictions and see what others from around the world think of them!
        </p>

        <h3>How Prediction Tracker works</h3>
        <h5>Required information for any Prediction</h5>
        <p>
          Using this app is as simple as creating a user account and determining a few basic facts about your prediction. Every prediction a user creates will contain a Prediction Title, End Date, and Major Claim, visible in the Prediction Pane below.
        </p>
        <p>
          The <dfn className="key-term">Prediction Title</dfn> is simply a brief, one-line summary of the prediction that will be visible at the top of each Prediction Pane.
        </p>
        <p>
          The <dfn className="key-term">End Date</dfn> is the date on or after which the prediction will come true or not. This date must be at least one day after the day on which the prediction is made. This date is not necessarily binding, which will be explained later in the Pending and Concluded Predictions section. 
        </p>
        <p>
          The <dfn className="key-term">Major Claim</dfn> section is where the full content of a user's prediction goes. It should be more detailed than the Prediction Title and explain what the prediction is in full.
        </p>

        <figure>
          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-0 mx-auto prediction-detail-div prediction-pane shadow-green">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row">
              <div className="row text-center detail-page-info-div">
                <div className="col-sm prediction-info-div">
                  <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                  <p><b>Predictor:</b> JonDoethePrognosticator</p>
                  <p><b>User Prediction Status:</b> Pending</p>
                  <p><b>End Date:</b> May 23, 2021</p>
                </div>
                <div className="col-sm vote-info-div">
                  <p><b>Vote Tallies</b></p>
                  <p>Plausible: <span className="green">24</span>  |  Implausible: <span className="red">6</span></p>
                  <p className="greyed-out">Agree: 0  |  Disagree: 0</p>
                  <p><b>Total Votes:</b> 30</p>
                </div>
              </div>

              <div className="detail-page-content-div">
                <div className="major-claim-div">
                  <h4 className="prediction-header">Major Claim:</h4>
                  <p>Here is a more detailed description of the Prediction Title.</p>
                </div>
                <div className="reasons-div">
                  <h4 className="prediction-header">Reasons:</h4>
                  <p>- Here is a reason why the user believes the prediction will come true.</p>
                  <p>- Here is a different reason why the user believes the prediction will come true.</p>
                  <p>- Here is a final reason why the user believes the prediction will come true.</p>
                </div>
              </div>

              <div className="vote-buttons">
                <FaRegThumbsUp className="vote-yes" />
                  Plausible
                <FaRegThumbsDown className="vote-no" />
              </div>
            </div>
          </div>
          <figcaption>Fig. 1 - The Prediction Pane of a Pending Prediction</figcaption>
        </figure>

        <h5>Optional information for any Prediction</h5>
        <p>
          In addition to the required information a Prediction must have, a user also has the choice to include as many <dfn className="key-term">Reasons</dfn> he or she wants to justify why he or she thinks the prediction will come true. Simple, terse reasons will go a long way in getting others users to think about a prediction and decide whether the prediction is believable or not. At the bottom of the Prediction Pane are thumbs up and thumbs down buttons that a user can click to cast a vote about the prediction.
        </p>

        <h5>Pending and Concluded Predictions</h5>
        <p>
          Every prediction makes a claim about something that will come true by some date in the future. This means that, until that date has been reached, a Prediction is in the <dfn className="key-term">Pending</dfn> state; the prediction has been made but at this point, it is neither true nor false. There are three times at which a Prediction can become true or false: before the End Date is reached, on the End Date, or after the End Date. Once a Prediction becomes true or false, it will be in a <dfn className="key-term">Concluded</dfn> state.
        </p>
        <p>
          If the user that posted the Prediction believes it has come true or not before the End Date, he or she has the choice to update it to a status of either <dfn className="key-term">Right</dfn> or <dfn className="key-term">Wrong</dfn>, converting it to a Concluded Prediction. If the End Date is reached before the user thinks the Prediction has come true or not, then the Prediction will go to an <dfn className="key-term">Expired</dfn> state, and will disappear from the Pending Predictions section. All of a user's Expired Predictions can be viewed in the user's Dashboard by clicking the Expired button. To update the status of the Prediction, the user will click the <dfn className="key-term">Update Status</dfn> button and choose whether it came true or not to change it to a Concluded Prediction, which will make it visible again, now in the Concluded Prediction section. When a user updates the status, he or she will also be given an opportunity to explain why they think the Prediction came true or not, which will show up in the Prediction Pane afterwards, as seen below.
        </p>

        <figure>
          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-0 mx-auto prediction-detail-div prediction-pane shadow-yellow">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row">
              <div className="row text-center detail-page-info-div">
                <div className="col-sm prediction-info-div">
                  <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                  <p><b>Predictor:</b> JonDoethePrognosticator</p>
                  <p><b>User Prediction Status:</b> Right</p>
                  <p><b>End Date:</b> May 23, 2021</p>
                </div>
                <div className="col-sm vote-info-div">
                  <p><b>Vote Tallies</b></p>
                  <p>Plausible: <span className="green">24</span>  |  Implausible: <span className="red">6</span></p>
                  <p>Agree: <span className="green">12</span>  |  Disagree: <span className="red">12</span></p>
                  <p><b>Total Votes:</b> 54</p>
                </div>
              </div>

              <div className="detail-page-content-div">
                <div className="major-claim-div">
                  <h4 className="prediction-header">Major Claim:</h4>
                  <p className="text-start">Here is a more detailed description of the Prediction Title.</p>
                </div>
                <div className="reasons-div">
                  <h4 className="prediction-header">Reasons:</h4>
                  <p>- Here is a reason why the user believes the prediction will come true.</p>
                  <p>- Here is a different reason why the user believes the prediction will come true.</p>
                  <p>- Here is a final reason why the user believes the prediction will come true.</p>
                </div>

                <div className="conc-reason-div">
                  <h4 className="prediction-header">Why JonDoethePrognosticator believes this prediction is correct:</h4>
                  <p className="conc-reason-timestamp"><b>Posted:</b> April 3, 2021 1:49 PM</p>
                  <p>- Here is the reason why this prediction is true.</p>
                </div>
              </div>

              <div className="row vote-div mx-auto pt-0">
                <div className="vote-buttons">
                  <FaRegThumbsUp className="vote-yes" />
                    Agree
                  <FaRegThumbsDown className="vote-no" />
                </div>
              </div>
            </div>
          </div>
          <figcaption>Fig. 2 - The Prediction Pane of a Concluded Prediction</figcaption>
        </figure>

        <h5>Voting on a Prediction</h5>
        <p>
          The fun part of Prediction Tracker is to see what the user base thinks of a Prediction that someone makes. If a Prediction is in the Pending state, users who did not post the Prediction can vote on whether they think the Prediction is <dfn className="key-term">Plausible</dfn> or not. Since the poster has not made a claim about the veracity of the Prediction yet, other users can only vote on the Prediction's plausibility. However, once the Prediction is in the Concluded state, users vote on whether they <dfn className="key-term">Agree</dfn> or not with the User Prediction Status chosen by the posting user. E.g. if a user believes their Prediction turned out to be Wrong, then other users can vote if they agree that the Prediction is wrong.
        </p>
        <p>
          A tally of the votes for a Prediction will be visible on the Prediction Pane. Pending Predictions only have tallies for <dfn className="key-term">Plausible</dfn> and <dfn className="key-term">Implausible</dfn>, whereas Concluded Predictions also have tallies for the number of users that <dfn className="key-term">Agree</dfn> or <dfn className="key-term">Disagree</dfn> with the Status of the Prediction. As seen in Figure 1 above, voting buttons will be visible at the bottom of each pane.
        </p>

        <h5>Border Colors of each Prediction Pane</h5>
        <p>
          Each Prediction Pane also reflects the current vote tally of a Prediction by its border color. A green border means more users think the Prediction is plausible or agreeable than not; a yellow border means the number of votes are equal, so the Prediction is neutral; and a red border means more users think the Prediction is implausible or disagreeable than not. The three border types are visible in Figure 3 below.
        </p>

        <figure>
          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-0 mx-auto prediction-pane shadow-green">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row prediction-pane-content">
              <div className="col-sm prediction-info-div">
                <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                <p><b>Predictor:</b> JonDoethePrognosticator</p>
                <p><b>User Prediction Status:</b> Pending</p>
                <p><b>End Date:</b> May 23, 2021</p>
              </div>
              <div className="col-sm vote-info-div">
                <p><b>Vote Tallies</b></p>
                  <p>Plausible: <span className="green">24</span>  |  Implausible: <span className="red">6</span></p>
                  <p className="greyed-out">Agree: 0 | Disagree: 0</p>
                  <p><b>Total Votes:</b> 30</p>
              </div>
            </div>
          </div>

          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-0 mx-auto prediction-pane shadow-yellow">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row prediction-pane-content">
              <div className="col-sm prediction-info-div">
                <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                <p><b>Predictor:</b> JonDoethePrognosticator</p>
                <p><b>User Prediction Status:</b> Pending</p>
                <p><b>End Date:</b> May 23, 2021</p>
              </div>
              <div className="col-sm vote-info-div">
                <p><b>Vote Tallies</b></p>
                  <p>Plausible: <span className="green">0</span>  |  Implausible: <span className="red">0</span></p>
                  <p className="greyed-out">Agree: 0 | Disagree: 0</p>
                  <p><b>Total Votes:</b> 0</p>
              </div>
            </div>
          </div>

          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-0 mx-auto prediction-pane shadow-red">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row prediction-pane-content">
              <div className="col-sm prediction-info-div">
                <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                <p><b>Predictor:</b> JonDoethePrognosticator</p>
                <p><b>User Prediction Status:</b> Right</p>
                <p><b>End Date:</b> May 23, 2021</p>
              </div>
              <div className="col-sm vote-info-div">
                <p><b>Vote Tallies</b></p>
                  <p>Plausible: <span className="green">128</span>  |  Implausible: <span className="red">36</span></p>
                  <p>Agree: <span className="green">0</span>  |  Disagree: <span className="red">3</span></p>
                  <p><b>Total Votes:</b> 167</p>
              </div>
            </div>
          </div>
          <figcaption>Fig. 3 - Three Prediction Panes demonstrating the different border colors.</figcaption>
        </figure>

        <p>
          Notice that the third Prediction Pane in Figure 3 has a red border and has tallies for <dfn className="key-term">Agree</dfn> and <dfn className="key-term">Disagree</dfn>. This is because it is a Concluded Prediction. Even though more users voted that the Prediction was Plausible than Implausible while it was in the Pending state, the border is still red because it now reflects the vote tallies for Agree and Disagree, and at this point in time, there are 3 Disagree votes to 0 Agree votes.
        </p>

        <h5>It's time to make your first prediction!</h5>
        <p>
          <a href="/register">Register</a> a user account if you haven't already, or <a href="/login">log in</a> to your account and click <dfn className="key-term">Make Prediction</dfn> at the top of the page on the navbar to get started!
        </p>
      </div>
    </div>
  )
}

export default Home