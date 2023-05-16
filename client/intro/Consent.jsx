import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";
import { isDesktop, isChrome, isFirefox, isEdge } from "react-device-detect";

export default class Consent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: [false, false, false]
    };
  }

  handleChange(index) {
    let updateIsChecked = this.state.isChecked;
    updateIsChecked[index] = !updateIsChecked[index];
    this.setState({isChecked: updateIsChecked});
  }

  render() {
    return (
      isDesktop && (isChrome || isFirefox || isEdge) ? 
      (
        <Centered>
          <div className="consent">
            <h1> Consent Form </h1>
            <h4>
              Thanks for your interest in this project about task performance. 
              This form gives you information about the project and asks for your
              consent to participate. If you agree, please tick the three check boxes
              near the bottom and click the "I agree" button that will appear 
              once all the check boxes are checked.
            </h4>
            <h3 className="sectionHeader">What is this study about?</h3>
            <p>
              This study is about assessing task performance.
            </p>
            <h3 className="sectionHeader">What will my involvement be?</h3>
            <p>
              You will participate in an online experiment involving an activity
              of positioning sliders at a specified point (approximately 10 minutes)
              and then a brief survey about the activity and some demographic questions 
              (about 5 minutes).
            </p>
            <h3 className="sectionHeader">Do I have to take part?</h3>
            <p>
              Participation is <b>voluntary</b>. During the survey at the end of 
              this experiment, you can skip any question you are uncomfortable with.
            </p>
            <h3 className="sectionHeader">What will my information be used for?</h3>
            <p>
              Your results in the task and answers in the survey will be anonymized 
              and analyzed to be used in a master's dissertation. It is possible that, 
              after anonymized, they could be used in future research or publications.
            </p>
            <h3 className="sectionHeader">Will my information be anonymous?</h3>
            <p>
              The only identifying information collected in the study is your MTurk 
              Worker ID, which will not be used in any reports or publications resulting 
              from the study. Your Worker ID is only collected to aid in making payments 
              and will be deleted after that is done, making your information anonymous.
            </p>
            <form className="consentCheckboxes">
              <h3 className="sectionHeader">Please read these statements. If you 
              agree with them, tick the boxes below.</h3>
              <label htmlFor="consent1">
                I have read the above information and certify that I am at least 18 
                years old.
              </label>
              <input 
                id="consent1" 
                type="checkbox"
                name="consent"
                value="readInfo"
                checked={this.state.isChecked[0]}
                onChange={() => this.handleChange(0)}
              />
              <br />
              <label htmlFor="consent2">
                I agree to participate in the online experiment and survey.
              </label>
              <input 
                id="consent2" 
                type="checkbox"
                name="consent"
                value="agreeToParticipate"
                checked={this.state.isChecked[1]}
                onChange={() => this.handleChange(1)}
              />
              <br />
              <label htmlFor="consent3">
                I understand that my responses will be kept confidential and 
                anonymous and that my personal information will be kept securely 
                and destroyed at the end of the study.
              </label>
              <input 
                id="consent3" 
                type="checkbox"
                name="consent"
                value="responsesAndPersonalInfo"
                checked={this.state.isChecked[2]}
                onChange={() => this.handleChange(2)}
              />
            </form>
            <br />
            <p>
              The London School of Economics Research Privacy Policy can be found {" "}
              <a href="https://info.lse.ac.uk/staff/divisions/Secretarys-Division/Assets/Documents/Information-Records-Management/Privacy-Notice-for-Research-v1.2.pdf" 
              target="_blank">here</a>.
            </p>
            <br />
            {this.state.isChecked.every(currentValue => currentValue === true) 
              && <ConsentButton text="I AGREE"/>}
          </div>
        </Centered>
      ) :
      (
        <div>
          Please use a laptop or desktop computer and either Google Chrome, Firefox, or 
          Microsoft Edge.
        </div>
      )
    );
  }
}
