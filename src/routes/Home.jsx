/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { BsChatText } from 'react-icons/bs';
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import { MdExpand } from 'react-icons/md';

import { PredictionContext } from '../context/PredictionContext';

const Home = () => {
  const { isAuthenticated } = useContext(PredictionContext);
  let navigate = useNavigate();

  const toRegister = () => {
    navigate("/register")
  }

  return (
    <div className="row tan-bg g-0">
      <section className="cball">
        <div className="col-md-4 p-2 p-md-5 home-banner-pane">
          <h1>Have a prediction to make?</h1>
          <p>Share a prediction you've made, or browse predictions made by others.</p>
          <button onClick={toRegister}>{isAuthenticated ? "My Dashboard" : "Create an account"}</button>
        </div>
      </section>

      <div className="col col-md-10 mx-auto mb-5 p-4 p-md-5 text-md-start white-pane home-info" id="home-info-top">
        <h3>The place to go to track your predictions!</h3>
        <p>
          Do you like to speculate about what the future holds? Do you enjoy the feeling of being right about something that your friends were skeptical of? Well now there is a place for you to post all of your predictions and see what others from around the world think of them!
        </p>

        <h3>How Prediction Tracker works</h3>

        <div className="row contents-links ps-sm-4">
          <div className="row">
            <p><a href="#required-info-section">Required Information for making a Prediction</a></p>
            <p><a href="#optional-info-section">Optional Information for making a Prediction</a></p>
            <p><a href="#pending-concluded-section">Pending and Concluded Predictions</a></p>
            <p><a href="#updating-pred-section">Updating a Pending Prediction into a Concluded Prediction</a></p>
            <p><a href="#update-ui-compressed-section">Update User Prediction Status UI</a></p>
          </div>
          <div className="row">
            <p><a href="#expired-section">Expired Predictions</a></p>
            <p><a href="#voting-section">Voting on a Prediction</a></p>
            <p><a href="#borders-section">Prediction Panes and their Border Colors</a></p>
            <p><a href="#comments-section">Comments</a></p>
            <p><a href="#coming-soon-section">Coming Soon!</a></p>
            <p><a href="#first-pred-section">Make your First Prediction!</a></p>
          </div>
        </div>

        <h5 id="required-info-section">Required Information for making a Prediction <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          Using this app is as simple as creating a user account and determining a few basic facts about your prediction. Every prediction a user creates will contain a Prediction Title, End Date, and Major Claim, visible in the sample Pending Prediction Pane below in Figure 1.
        </p>
        <p>
          The <dfn className="key-term">Prediction Title</dfn> is simply a brief, one-line summary of the prediction that will be visible at the top of each Prediction Pane.
        </p>
        <p>
          The <dfn className="key-term">End Date</dfn> is the date on which the prediction will come true or not. This date must be at least one day after the day on which the prediction is made. Since predictions can come true before their supposed End Date, this date is not necessarily binding, which is explained later in the Pending and Concluded Predictions section. 
        </p>
        <p>
          The <dfn className="key-term">Major Claim</dfn> section is where the full content of a user's prediction goes. It should be more detailed than the Prediction Title and explain what the prediction is in full.
        </p>

        <h5 id="optional-info-section">Optional Information for any Prediction <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          In addition to the required information a Prediction must have, a user also has the choice to include as many <dfn className="key-term">Reasons</dfn> they want to justify why they think the prediction will come true. Simple, terse reasons will go a long way in getting other users to think about a prediction and decide whether the prediction is believable or not. At the bottom of the Prediction Pane are thumbs up and thumbs down buttons that a user can click to cast a vote about the prediction if they haven't yet voted on it.
        </p>

        {/* sample Pending Prediction Pane */}
        <figure>
          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-0 mx-auto prediction-detail-div prediction-pane shadow-green no-pointer-events">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row">
              <div className="row text-center detail-page-info-div">
                <div className="col-sm prediction-info-div">
                  <p><b>Predictor:</b> JonThePrognosticator</p>
                  <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                  <p><b>End Date:</b> May 23, 2021</p>
                  <p className="highlight"><b>User Prediction Status:</b> Pending</p>
                  <p><b>Category:</b> Scientific</p>
                </div>
                <div className="col-sm vote-info-div">
                  <p><b>Vote Tallies</b></p>
                  <p>Plausible: <span className="green">24</span>  |  Implausible: <span className="red">6</span></p>
                  <p className="greyed-out highlight">Agree: 0 |  Disagree: 0</p>
                  <p><b>Total Votes:</b> 30</p>
                  <p><b>Comments:</b> 14</p>
                </div>
              </div>

              <div className="detail-page-content-div">
                <div className="major-claim-div">
                  <h4 className="prediction-header">Major Claim:</h4>
                  <p className="text-start">Here is a more detailed description of the Prediction Title.</p>
                </div>

                <hr/>

                <div className="reasons-div">
                  <h4 className="prediction-header">Reasons:</h4>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a reason why the user believes the prediction will come true.
                    </p>
                  </div>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a different reason why the user believes the prediction will come true.
                    </p>
                  </div>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a final reason why the user believes the prediction will come true.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row vote-div mx-auto p-0">
                <div className="vote-buttons">
                  <FaRegThumbsUp className="vote-yes green" />
                    <span className="highlight p-2">Plausible</span>
                  <FaRegThumbsDown className="vote-no red" />
                </div>
              </div>
            </div>
          </div>
          <figcaption>Fig. 1 - A sample Prediction Pane for a Pending Prediction. Notice the User Prediction Status is Pending, the Vote Tallies for Agree and Disagree are greyed-out, and the Vote Buttons say Plausible at the bottom of the Prediction Pane</figcaption>
        </figure>

        <h5 id="pending-concluded-section">Pending and Concluded Predictions <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          Every prediction makes a claim about something that will come true by some date in the future. This means that, until that date has been reached, it is a <dfn className="key-term">Pending Prediction</dfn>; the prediction has been made but at this point, it is neither true nor false. There are three times at which a Prediction can become true or false: before the End Date is reached, on the End Date, or after the End Date. Once a Prediction becomes true or false, it should be converted into a <dfn className="key-term">Concluded Prediction</dfn>.
        </p>

        <h5 id="updating-pred-section">Updating a Pending Prediction into a Concluded Prediction <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          If the user that posted the Prediction believes it has come true or not before the End Date, they have the choice to update it to a status of either <dfn className="key-term">Right</dfn> or <dfn className="key-term">Wrong</dfn>, converting it to a Concluded Prediction. To update the status of the Prediction, the user will click the <dfn className="key-term">Update Status</dfn> button, visible in Figure 2 below, and choose whether it came true or not to change it to a Concluded Prediction. This will move the prediction into the Concluded Prediction section.
        </p>

        {/* sample Pending Prediction Pane showing Update Status button */}
        <figure>
          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-0 mx-auto prediction-detail-div prediction-pane shadow-green no-pointer-events">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row">
              <div className="row text-center detail-page-info-div">
                <div className="col-sm prediction-info-div">
                  <p><b>Predictor:</b> JonThePrognosticator</p>
                  <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                  <p><b>End Date:</b> May 23, 2021</p>
                  <p className="highlight"><b>User Prediction Status:</b> Pending</p>
                  <p><b>Category:</b> Scientific</p>
                </div>
                <div className="col-sm vote-info-div">
                  <p><b>Vote Tallies</b></p>
                  <p>Plausible: <span className="green">24</span>  |  Implausible: <span className="red">6</span></p>
                  <p className="greyed-out">Agree: 0 |  Disagree: 0</p>
                  <p><b>Total Votes:</b> 30</p>
                  <p><b>Comments:</b> 14</p>
                </div>
              </div>

              <div className="update-prediction-button">
                <div className="row highlight">
                  <button className="col-10 col-md-6 mx-auto m-1" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" aria-expanded="false">
                    Update Status
                  </button>
                </div>
              </div>

              <div className="detail-page-content-div bottom-corners">
                <div className="major-claim-div">
                  <h4 className="prediction-header">Major Claim:</h4>
                  <p className="text-start">Here is a more detailed description of the Prediction Title.</p>
                </div>

                <hr/>

                <div className="reasons-div">
                  <h4 className="prediction-header">Reasons:</h4>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a reason why the user believes the prediction will come true.
                    </p>
                  </div>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a different reason why the user believes the prediction will come true.
                    </p>
                  </div>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a final reason why the user believes the prediction will come true.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <figcaption>Fig. 2 - A user's Pending Prediction Pane containing an Update Status button if the user is logged in</figcaption>
        </figure>

        <h5 id="update-ui-compressed-section">Update User Prediction Status UI <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          After the Update Status button is clicked, an interface will pop up like the one below in Figure 3. The user must choose whether they think their Pending Prediction came true or not by pressing either the Right or Wrong button.
        </p>

        <br/>

        {/* Update Status UI compressed */}
        <figure>
          <div className="modal-content no-pointer-events">
            <div className="row modal-header g-0">
              <h1 className="col-11 modal-title text-center">Warning!</h1>
              <button className="col btn-close btn-close-white" type="button"></button>
            </div>
            <div className="modal-body">
              <p>This action will change a Pending Prediction into a Concluded Prediction and cannot be undone.</p>
              <p>You must choose whether you believe your Pending Prediction is Right or Wrong, and then provide a reason why you believe your Prediction is Concluded.</p>

              <nav className="update-modal-buttons text-center">
                <ul className="p-0">
                  <li className="highlight ps-1 pe-1 pt-3 pb-3">
                    <button className="unpressed">Right</button>
                  </li>
                  <li className="highlight ps-1 pe-1 pt-3 pb-3">
                    <button className= "unpressed">Wrong</button>
                  </li>
                </ul>
              </nav>
              
            </div>
            <div className="modal-footer">
              <button type="button">Close</button>
              <div className="highlight">
                <button disabled className="btn update-button" type="button">Update</button>
              </div>
            </div>
          </div>
          <figcaption>Fig. 3 - The base Update User Prediction Status interface</figcaption>
        </figure>

        <p>
          After the Right or Wrong button has been pressed, the user will be required to include a reason for why they believe their Prediction came true or not. Typing in the textarea will enable the Update button in the bottom right of the interface, visible in Figure 4 below.
        </p>

        <br/>

        {/* Update Status UI expanded */}
        <figure>
          <div className="modal-content no-pointer-events">
            <div className="row modal-header g-0">
              <h1 className="col-11 modal-title text-center">Warning!</h1>
              <button className="col btn-close btn-close-white" type="button"></button>
            </div>
            <div className="modal-body">
              <p>This action will change a Pending Prediction into a Concluded Prediction and cannot be undone.</p>
              <p>You must choose whether you believe your Pending Prediction is Right or Wrong, and then provide a reason why you believe your Prediction is Concluded.</p>

              <nav className="update-modal-buttons text-center">
                <ul className="p-0">
                  <li className="highlight ps-1 pe-1 pt-3 pb-3">
                    <button className="pressed">Right</button>
                  </li>
                  <li>
                    <button className= "unpressed">Wrong</button>
                  </li>
                </ul>
              </nav>
              
              <div className="d-block">
                <label htmlFor="conc-reason">Reason Prediction is Right</label>
                <textarea className="col form-control" id="conc-reason" type="text" rows="4" defaultValue="User's reason why the Prediction is Right"></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button">Close</button>
              <div className="highlight">
                <button className="update-button" type="button">Update</button>
              </div>
            </div>
          </div>
          <figcaption>Fig. 4 - The Update User Prediction Status interface with textarea for typing in the user's reasoning.</figcaption>
        </figure>

        <p>
          After the Update button is clicked, the Prediction will become a Concluded Prediction and will include the reasoning given by the user at the bottom of the Concluded Prediction Pane, like in Figure 5 below. <span className="highlight-text">This process cannot be undone, so a user should make sure their reasoning is clear and concise before submitting it!</span>
        </p>

        {/* sample Concluded Prediction Pane */}
        <figure>
          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-0 mx-auto prediction-detail-div prediction-pane shadow-yellow">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row">
              <div className="row text-center detail-page-info-div">
                <div className="col-sm prediction-info-div">
                <p><b>Predictor:</b> JonThePrognosticator</p>
                  <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                  <p><b>End Date:</b> May 23, 2021</p>
                  <p className="highlight"><b>User Prediction Status:</b> Right</p>
                  <p><b>Category:</b> Scientific</p>
                </div>
                <div className="col-sm vote-info-div">
                  <p><b>Vote Tallies</b></p>
                  <p>Plausible: <span className="green">24</span>  |  Implausible: <span className="red">6</span></p>
                  <p className="highlight">Agree: <span className="green">12</span>  |  Disagree: <span className="red">12</span></p>
                  <p><b>Total Votes:</b> 54</p>
                  <p><b>Comments:</b> 14</p>
                </div>
              </div>

              <div className="detail-page-content-div pb-2">
                <div className="major-claim-div">
                  <h4 className="prediction-header">Major Claim:</h4>
                  <p className="text-start">Here is a more detailed description of the Prediction Title.</p>
                </div>

                <hr/>

                <div className="reasons-div">
                  <h4 className="prediction-header">Reasons:</h4>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a reason why the user believes the prediction will come true.
                    </p>
                  </div>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a different reason why the user believes the prediction will come true.
                    </p>
                  </div>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a final reason why the user believes the prediction will come true.
                    </p>
                  </div>
                </div>

                <hr/>

                <div className="highlight m-0 p-0">
                  <div className="conc-reason-div">
                    <h4 className="prediction-header">Why JonThePrognosticator believes this prediction is correct:</h4>
                    <p className="conc-reason-timestamp"><b>Posted:</b> April 3, 2021 1:49 PM</p>
                    <p class="findLink-block col mt-2 ms-2 ms-md-0 text-start">
                      Here is the reason why this prediction is true.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row vote-div mx-auto p-0">
                <div className="vote-buttons">
                  <FaRegThumbsUp className="vote-yes green" />
                    <span className="highlight p-2">Agree</span>
                  <FaRegThumbsDown className="vote-no red" />
                </div>
              </div>
            </div>
          </div>
          <figcaption>
            Fig. 5 - A sample Prediction Pane for a Concluded Prediction. Notice the User Prediction Status is now Right, the Vote Tallies for Agree and Disagree are no longer greyed-out, the reasoning section is added at the bottom, and the Vote Buttons now say Agree instead of Plausible
          </figcaption>
        </figure>

        <h5 id="expired-section">Expired Predictions <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          If the End Date is reached before the user thinks the Prediction has come true or not, then the Prediction will go to an <dfn className="key-term">Expired</dfn> state, and will disappear from the Pending Predictions section. All of a user's Expired Predictions can be viewed in the user's Dashboard by clicking the Expired filter button. When a user updates the status, they will also be given an opportunity to explain why they think the Prediction came true or not just like when manually updating a Pending Prediction.
        </p>

        {/* sample Dashboard showing Expired Predictions */}
        <figure className="dashboard-figure">
          <div className="row dashboard">
            <h3 className="p-3 m-0 text-center text-sm-start title-banner">JonThePrognosticator's Dashboard</h3>
          </div>

          <div className="row preds-template-div no-pointer-events">
            <div className="col-lg-4 text-center preds-template-sidebar">
              <h3 className="dash-title-banner">My Expired Predictions</h3>
              <nav className="row text-center filters-navbar">
                <ul>
                  <li>
                    <button className="col-md-8 mb-md-2 unpressed" value="dashPending">Pending</button>
                  </li>
                  <li className="highlight me-1 ps-1 pe-1 pt-3 pb-3">
                    <button className="col-md-8 mb-md-2 me-0 pressed" value="dashExpired">Expired<FiAlertCircle className="expired" /></button>
                  </li>
                  <li>
                    <button className="col-md-8 mb-md-2 unpressed" value="dashConcluded">Concluded</button>
                  </li>
                </ul>
              </nav>
              
              <p id="expired-expl">
                Expired Predictions are Predictions you have made that have reached the end of their timeframe. This means their truth value must be assessed. You must change the Status of this Prediction to Right or Wrong, depending on whether you believe your Prediction has come true or not. Click on the Prediction and then update the status to Right or Wrong.
              </p>
            </div>

            <div className="col-md-8 preds-template-preds">
              <div className="mt-2 mb-4 mt-md-4 mb-md-4 text-center prediction-pane shadow-red">
                <h3 className="prediction-pane-header">Here is an Expired Prediction</h3>
                <div className="row prediction-pane-content">
                  <div className="col-sm prediction-info-div">
                    <p><b>Predictor:</b> JonThePrognosticator</p>
                    <p><b>Posted:</b> May 10th, 2022 10:19 AM</p>
                    <p className="highlight"><b>End Date:</b> <span className="red">June 10th, 2022</span></p>
                    <p><b>User Prediction Status: </b> Pending</p>
                    <p><b>Category: </b> Political</p>
                  </div>
                  <div className="col-sm vote-info-div">
                    <p><b>Vote Tallies</b></p>
                    <p>Plausible: <span className="green">49</span>  |  Implausible: <span className="red">62</span></p>
                    <p className="greyed-out">Agree: 0  |  Disagree: 0</p>
                    <p><b>Total Votes:</b> 111</p>
                    <p><b>Total Comments:</b> 265</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 mb-4 mt-md-4 mb-md-4 text-center prediction-pane shadow-yellow">
                <h3 className="prediction-pane-header">Here is another Expired Prediction</h3>
                <div className="row prediction-pane-content">
                  <div className="col-sm prediction-info-div">
                    <p><b>Predictor:</b> JonThePrognosticator</p>
                    <p><b>Posted:</b> April 7th, 2022 5:01 PM</p>
                    <p className="highlight"><b>End Date:</b> <span className="red">June 9th, 2022</span></p>
                    <p><b>User Prediction Status: </b> Pending</p>
                    <p><b>Category: </b> Educational</p>
                  </div>
                  <div className="col-sm vote-info-div">
                    <p><b>Vote Tallies</b></p>
                    <p>Plausible: <span className="green">37</span>  |  Implausible: <span className="red">37</span></p>
                    <p className="greyed-out">Agree: 0  |  Disagree: 0</p>
                    <p><b>Total Votes:</b> 74</p>
                    <p><b>Total Comments:</b> 132</p>
                  </div>
                </div>
              </div>

              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link" href="#">Previous</a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item disabled">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>

            </div>
          </div>
          <figcaption>
            Fig. 6 - A sample Dashboard viewing a user's Expired Predictions
          </figcaption>
        </figure>

        <h5 id="voting-section">Voting on a Prediction <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          With Prediction Tracker, users can see what the rest of the user base thinks of a Prediction that someone made. If a Prediction is in the Pending state, users who did not post the Prediction can vote on whether they think the Prediction is <dfn className="key-term">Plausible</dfn> or not. Since the poster has not made a claim about the veracity of the Prediction yet, other users can only vote on the Prediction's plausibility. However, once the Prediction is in the Concluded state, users vote on whether they <dfn className="key-term">Agree</dfn> or not with the User Prediction Status chosen by the posting user. For example, if a user believes their Prediction turned out to be Wrong, then other users can vote on whether they agree that the Prediction is wrong.
        </p>
        <p>
          A tally of the votes for a Prediction will be visible on the Prediction Pane. As seen in Figure 1 and Figure 5 above, Pending Predictions have tallies for <dfn className="key-term">Plausible</dfn> and <dfn className="key-term">Implausible</dfn> votes along with a greyed-out tally for <dfn className="key-term">Agree</dfn> or <dfn className="key-term">Disagree</dfn>. For Concluded Predictions, the tallies for the number of users that <dfn className="key-term">Agree</dfn> or <dfn className="key-term">Disagree</dfn> with the status of the Prediction is visible, and casting a vote on the Concluded Prediction will change this tally. 
        </p>
        <p>
          Voting buttons will be visible at the bottom of each pane. If a user has already voted on a Prediction, they will be able to see what vote they cast. Figure 7 below shows a sample Concluded Prediction Pane with one possibility of a user's voting history shown. This user did not vote on the Prediction's plausibility while it was Pending and also voted that they agree with the poster's assessment that their Prediction turned out to be Right.
        </p>

        {/* sample Concluded Prediction Pane highlighting voting related elements */}
        <figure>
          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-0 mx-auto prediction-detail-div prediction-pane shadow-green">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row">
              <div className="row text-center detail-page-info-div">
                <div className="col-sm prediction-info-div">
                  <p><b>Predictor:</b> JonThePrognosticator</p>
                  <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                  <p><b>End Date:</b> May 23, 2021</p>
                  <p><b>User Prediction Status:</b> Right</p>
                  <p><b>Category:</b> Scientific</p>
                </div>
                <div className="col-sm vote-info-div highlight">
                  <p><b>Vote Tallies</b></p>
                  <p>Plausible: <span className="green">24</span>  |  Implausible: <span className="red">6</span></p>
                  <p>Agree: <span className="green">12</span>  |  Disagree: <span className="red">13</span></p>
                  <p><b>Total Votes:</b> 55</p>
                  <p><b>Comments:</b> 14</p>
                </div>
              </div>

              <div className="detail-page-content-div">
                <div className="major-claim-div">
                  <h4 className="prediction-header">Major Claim:</h4>
                  <p className="text-start">Here is a more detailed description of the Prediction Title.</p>
                </div>

                <hr/>

                <div className="reasons-div">
                  <h4 className="prediction-header">Reasons:</h4>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a reason why the user believes the prediction will come true.
                    </p>
                  </div>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a different reason why the user believes the prediction will come true.
                    </p>
                  </div>
                  <div className="reason-source-group">
                    <p class=" findLink-block col mt-2 mt-md-0 mb-2 mb-md-0 text-start">
                      Here is a final reason why the user believes the prediction will come true.
                    </p>
                  </div>
                </div>

                <hr/>

                <div className="conc-reason-div">
                  <h4 className="prediction-header">Why JonThePrognosticator believes this prediction is correct:</h4>
                  <p className="conc-reason-timestamp"><b>Posted:</b> April 3, 2021 1:49 PM</p>
                  <p class="findLink-block col mt-2 ms-2 ms-md-0 text-start">
                    Here is the reason why this prediction is true.
                  </p>
                </div>
              </div>

              <div className="row vote-div mx-auto p-0 highlight bottom-corners">
                <p className="vote-disabled p-3">~~You did not vote on the plausibility of this prediction when it was Pending~~</p>
                <p className="vote-disabled pb-3">~~You voted that you <span id="vote-value">agree</span> that this prediction is Right~~</p>
              </div>
            </div>
          </div>
          <figcaption>
            Fig. 7 - A sample Prediction Pane for a Concluded Prediction highlighting the Vote Tallies and showing a possible voting scenario for the logged in user at the bottom of the pane
          </figcaption>
        </figure>

        <h5 id="borders-section">Prediction Panes and their Border Colors <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          Each Prediction Pane reflects the current vote tally of a Prediction by its border color. A green border means more users think the Prediction is plausible or agreeable than not; a yellow border means the number of votes are equal, so the Prediction is neutral; and a red border means more users think the Prediction is implausible or disagreeable than not. The three border types are visible in Figure 3 below.
        </p>

        {/* three possible border colors depending on vote counts */}
        <figure>
          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-2 mx-auto prediction-pane shadow-green">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row prediction-pane-content">
              <div className="col-sm prediction-info-div">
                <p><b>Predictor:</b> JonThePrognosticator</p>
                <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                <p><b>End Date:</b> May 23, 2021</p>
                <p><b>User Prediction Status:</b> Pending</p>
                <p><b>Category:</b> Scientific</p>
              </div>
              <div className="col-sm vote-info-div">
                <p><b>Vote Tallies</b></p>
                <p>Plausible: <span className="green">24</span>  |  Implausible: <span className="red">6</span></p>
                <p className="greyed-out">Agree: 0 | Disagree: 0</p>
                <p><b>Total Votes:</b> 30</p>
                <p><b>Comments:</b> 14</p>
              </div>
            </div>
          </div>

          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-2 mx-auto prediction-pane shadow-yellow">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row prediction-pane-content">
              <div className="col-sm prediction-info-div">
                <p><b>Predictor:</b> JonThePrognosticator</p>
                <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                <p><b>End Date:</b> May 23, 2021</p>
                <p><b>User Prediction Status:</b> Pending</p>
                <p><b>Category:</b> Scientific</p>
              </div>
              <div className="col-sm vote-info-div">
                <p><b>Vote Tallies</b></p>
                <p>Plausible: <span className="green">0</span>  |  Implausible: <span className="red">0</span></p>
                <p className="greyed-out">Agree: 0 | Disagree: 0</p>
                <p><b>Total Votes:</b> 0</p>
                <p><b>Comments:</b> 14</p>
              </div>
            </div>
          </div>

          <div className="col-md-10 mt-4 mt-md-5 mb-4 pb-2 mx-auto prediction-pane shadow-red">
            <h3 className="prediction-pane-header">Prediction Title</h3>
            <div className="row prediction-pane-content">
              <div className="col-sm prediction-info-div">
              <p><b>Predictor:</b> JonThePrognosticator</p>
                <p><b>Posted:</b> March 5th, 2021 2:35 PM</p>
                <p><b>End Date:</b> May 23, 2021</p>
                <p><b>User Prediction Status:</b> Right</p>
                <p><b>Category:</b> Scientific</p>
              </div>
              <div className="col-sm vote-info-div">
                <p><b>Vote Tallies</b></p>
                <p>Plausible: <span className="green">128</span>  |  Implausible: <span className="red">36</span></p>
                <p>Agree: <span className="green">0</span>  |  Disagree: <span className="red">3</span></p>
                <p><b>Total Votes:</b> 167</p>
                <p><b>Comments:</b> 14</p>
              </div>
            </div>
          </div>
          <figcaption>Fig. 8 - Three Prediction Panes demonstrating the different border colors.</figcaption>
        </figure>

        <p>
          Notice that the third Prediction Pane in Figure 8 has a red border and has tallies for <dfn className="key-term">Agree</dfn> and <dfn className="key-term">Disagree</dfn> that are not greyed-out. This is because it is a Concluded Prediction. Even though more users voted that the Prediction was Plausible than Implausible while it was in the Pending state, the border is still red because it now reflects the vote tallies for Agree and Disagree, and at this point in time, there are 0 Agree votes to 3 Disgree votes.
        </p>

        <h5 id="comments-section">Comments <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          Any logged in user can leave a comment on a Prediction by typing into the text box beneath the Prediction Pane. The user that posted the Prediction can leave a comment to clarify their thinking, and other users can leave comments to criticize the Prediction and get a discussion going. Additionally, any comment can be replied to by clicking on the <dfn className="key-term">Text Bubble Button</dfn> on the comment itself. Comments made on a Prediction will indicate the number of <dfn className="key-term">Replies</dfn> other users have left on it. If a comment has been replied to, it will also have an <dfn className="key-term">Expand Button</dfn> that will show all of the replies made on a comment when clicked. Users can also post comments on replies if they wish. Finally, there is a <dfn className="key-term">Like Button</dfn> and a <dfn className="key-term">Dislike Button</dfn> on every comment that logged in users can click to show that they believe a comment or reply is a good point or a bad point. This information can be seen in Figure 9 below.
        </p>

        {/* comment pane with buttons */}
        <figure>
          <div className="gradient-pane child-value-0 green-comment-border-right col-12 col-md-10 col-xxl-8 mx-auto mb-4">
            <div className="">
              <div className="comment-header mb-2 text-center text-xl-start">
                <strong className="me-1">Nostradamus</strong>
                <small className="text-muted">May 14, 2021 4:58 PM</small>
                <p className="d-block d-xl-inline float-xl-end">
                  <span className="highlight p-0 p-md-1">
                    <span>1 Reply | </span>
                    <span>Good Point: <span className="green">9 | </span></span>
                    <span>Bad Point: <span className="red">3</span></span>
                  </span>
                </p>
              </div>
              <p className="p-2">
                Here is a comment that has been left on a prediction. More users think this comment was a good point than a bad one, and there have been 23 replies made on this comment or on replies made on this comment.
              </p>
              <div className="text-center pe-none">
                <span className="highlight pt-2 pb-2">
                  <span className="reply-button"><BsChatText /></span>
                  <span className="expand-button"><MdExpand /></span>
                  <span className="comment-good green"><FaThumbsUp /></span>
                  <span className="comment-bad greyed-out"><FaRegThumbsDown /></span>
                </span>
              </div>
            </div>
          </div>
          <figcaption>
            Fig. 9 - A Comment pane showing the buttons to reply to, expand, like, and dislike a comment. The tally for Replies, Likes and Dislikes on a comment are highlighted as well.
          </figcaption>
        </figure>

        <p><dfn className="key-term">Colors on a Comment Pane</dfn></p>
        <p>
          Every Comment Pane implicitly contains information about how the user that left the comment voted on the Prediction. This can be any user, or the user who posted the Prediction. In Figure 10 and 11 below, the top comment is made by the user who posted the Prediction, while the second comment is made by a different user. The right border of the comment will always show how the user voted, and the left border will only have a meaningful color for the poster of the Prediction.
        </p>

        <p><dfn className="key-term">Colors on Comments for Pending Predictions</dfn></p>
        <p>
          Pending Predictions are Predictions that are neither true nor false at the current moment; the posting user must determine when their Prediction has come true or not if before the End Date. Also, the posting user cannot vote on the plausibility of their own Prediction. For these reasons, a comment left by the user that made the Prediction does not have any right border coloring on Pending Predictions. Instead, their comment will have a colored left border that reflects that Plausibility tally of their Prediction. For example, if 12 other users voted that the Prediction is implausible, while only 2 voted that it is plausible, the left border of the comment will be red. Comments left by any other user will be green if they voted that they think the Prediction was plausible, red if implausible, and yellow if they haven't voted.
        </p>

        {/* comment pane showing colors on Pending Prediction */}
        <figure>
          <div className="gradient-pane child-value-0 green-comment-border-right mx-auto mb-4">
            <div className="">
              <div className="comment-header mb-2 text-center text-xl-start">
                <strong className="me-1">Nostradamus</strong>
                <small className="text-muted">May 14, 2021 4:58 PM</small>
                <p className="d-block d-xl-inline float-xl-end">
                  <span>1 Reply | </span>
                  <span>Good Point: <span className="green">9 | </span></span>
                  <span>Bad Point: <span className="red">3</span></span>
                </p>
              </div>
              <p className="p-2">
                Here is an expanded comment that has been left on a Pending Prediction. Its right border is green because Nostradamus voted that the Prediction this is a comment on was Plausible.
              </p>
              <div className="text-center pe-none">
                <span className="reply-button"><BsChatText /></span>
                <span className="expand-button"><MdExpand /></span>
                <span className="comment-good green"><FaRegThumbsUp /></span>
                <span className="comment-bad red"><FaRegThumbsDown /></span>
              </div>

              <div className="comment-replies m-0 m-md-4">
                <div className="gradient-pane child-value-1 red-comment-border-left mx-auto mb-4">
                  <div className="">
                    <div className="comment-header mb-2 text-center text-xl-start">
                      <strong className="me-1">JonThePrognosticator</strong>
                      <small className="text-muted">May 15, 2021 2:18 PM</small>
                      <p className="d-block d-xl-inline float-xl-end">
                        <span>Good Point: <span className="green">2 | </span></span>
                        <span>Bad Point: <span className="red">15</span></span>
                      </p>
                    </div>
                    <p className="p-2">
                      Here is a comment that has been left on a Pending Prediction that the user base thinks is Implausible. Its right border is blank because JonThePrognosticator was the user that posted the Prediction. Its left border is red because the user base has voted that the Prediction this is a comment on was Implausible.
                    </p>
                    <div className="text-center pe-none">
                      <span className="reply-button"><BsChatText /></span>
                      <span className="comment-good green"><FaRegThumbsUp /></span>
                      <span className="comment-bad red"><FaRegThumbsDown /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <figcaption>
            Fig. 10 - A Comment pane showing a possible color combination for comments on a Pending Prediction.
          </figcaption>
        </figure>

        <p><dfn className="key-term">Colors on Comments for Concluding Predictions</dfn></p>
        <p>
          Concluded Predictions are Predictions that are true or false at the current moment; the posting user has determined that their Prediction has come true or not. Therefore, a comment left by the user that made the Prediction has a green right border if the user believes their Prediction is right, and red if wrong. Additionally, their comment will have a colored left border that reflects that Correctness tally of their Prediction. For example, if the user believes their Prediction is Right, and if 12 other users voted that they agree the Prediction is Right, while only 2 voted that they disagree the Prediction is Right, the left border of the comment will be green. Comments left by any other user will have two bands on the right border, the inner band reflecting their vote on the Prediction while it was Pending, and an outer band reflecting their vote on the Prediction as it is currently in the Concluded state. The colors mean the same as before: green if the user voted that they think the status of the Prediction is correct, red if incorrect, and yellow if they haven't voted.
        </p>

        {/* comment pane showing colors on Concluded Prediction */}
        <figure>
          <div className="gradient-pane child-value-0 yellow-comment-border-right mx-auto mb-4">
            <div className="green-comment-border-right inner-comment-border">
              <div className="comment-header mb-2 text-center text-xl-start">
                <strong className="me-1">Nostradamus</strong>
                <small className="text-muted">May 14, 2021 4:58 PM</small>
                <p className="d-block d-xl-inline float-xl-end">
                  <span>2 Replies | </span>
                  <span>Good Point: <span className="green">9 | </span></span>
                  <span>Bad Point: <span className="red">3</span></span>
                </p>
              </div>
              <p className="p-2">
                Here is an expanded comment that has been left on a Concluded Prediction. Its inner right border is green because Nostradamus voted that the Prediction this is a comment on was Plausible while Pending, and the outer right border is yellow because they haven't voted on the Concluded Prediction yet.
              </p>
              <div className="text-center pe-none">
                <span className="reply-button"><BsChatText /></span>
                <span className="expand-button"><MdExpand /></span>
                <span className="comment-good green"><FaRegThumbsUp /></span>
                <span className="comment-bad red"><FaRegThumbsDown /></span>
              </div>

              <div className="comment-replies m-0 m-md-4">
                <div className="gradient-pane child-value-1 yellow-comment-border-left red-comment-border-right mx-auto mb-4">
                  <div className="">
                    <div className="comment-header mb-2 text-center text-xl-start">
                      <strong className="me-1">JonThePrognosticator</strong>
                      <small className="text-muted">May 15, 2021 2:18 PM</small>
                      <p className="d-block d-xl-inline float-xl-end">
                        <span>Good Point: <span className="green">2 | </span></span>
                        <span>Bad Point: <span className="red">15</span></span>
                      </p>
                    </div>
                    <p className="p-2">
                      Here is a comment that has been left on a Concluded Prediction that the user base thinks is equally Correct and Incorrect. In this example, its right border is red because JonThePrognosticator believes their Prediction ended up being Wrong. Its left border is yellow because tallies for Correct and Incorrect are tied.
                    </p>
                    <div className="text-center pe-none">
                      <span className="reply-button"><BsChatText /></span>
                      <span className="comment-good green"><FaRegThumbsUp /></span>
                      <span className="comment-bad red"><FaRegThumbsDown /></span>
                    </div>
                  </div>
                </div>

                <div className="gradient-pane child-value-1 red-comment-border-right mx-auto mb-4">
                  <div className="red-comment-border-right inner-comment-border">
                    <div className="comment-header mb-2 text-center text-xl-start">
                      <strong className="me-1">JaneDoe</strong>
                      <small className="text-muted">May 15, 2021 3:49 PM</small>
                      <p className="d-block d-xl-inline float-xl-end">
                        <span>Good Point: <span className="green">12 | </span></span>
                        <span>Bad Point: <span className="red">5</span></span>
                      </p>
                    </div>
                    <p className="p-2">
                      For this comment, its inner right border is red because JaneDoe voted that the Prediction this is a comment on was Implausible while Pending, and the outer right border is also red because they voted that they disagree that the Concluded Prediction is Wrong. The right border is a thin blue which denotes that this is a reply to a comment and that JaneDoe is not the uesr that posted the Prediction.
                    </p>
                    <div className="text-center pe-none">
                      <span className="reply-button"><BsChatText /></span>
                      <span className="comment-good green"><FaRegThumbsUp /></span>
                      <span className="comment-bad red"><FaRegThumbsDown /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <figcaption>
            Fig. 11 - A Comment pane showing a possible color combination for comments on a Concluded Prediction.
          </figcaption>
        </figure>

        <h5 id="coming-soon-section">Coming Soon! <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          <dfn className="key-term">Search Predictions</dfn>: search through Predictions by keyword or Category.
        </p>
        <p>
          <dfn className="key-term">User's Statistics</dfn>: view statistics about how many Predictions a user has posted, how the user base has voted on their Predictions, number of comments, user base discussion and more.
        </p>
        <p>
          <dfn className="key-term">Enhanced User Profile</dfn>: create a profile with a picture, direct message other users, share information about yourself and your qualifications, and more.
        </p>

        <h5 id="first-pred-section">Make your first Prediction! <a href="#home-info-top"><HiOutlineChevronDoubleUp className="double-up"/></a></h5>
        <p>
          <a href="/register">Register</a> a user account if you haven't already, or <a href="/login">log in</a> to your account and click <dfn className="key-term">Make Prediction</dfn> at the top of the page on the navbar to get started!
        </p>
      </div>
    </div>
  )
}

export default Home