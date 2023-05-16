import React from "react";

import { Centered } from "meteor/empirica:core";
import { competIndexQuestions, taskQuestions } from "./surveyQuestions";

const Radio = ({ selected, name, value, label, onChange }) => (
  <label>
    <input
      type="radio"
      name={name}
      value={value}
      checked={selected === value}
      onChange={onChange}
    />
    {label}
  </label>
);

export default class ExitSurvey extends React.Component {
  static stepName = "ExitSurvey";
  state = { age: "" };

  handleChange = event => {
    const answer = event.currentTarget;
    this.setState({ [answer.name]: answer.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  renderTrueFalse(question) {
    return (
      <div className="multiple-choice" key={"qestion-" + question.name}>
        <label>{question.questionText}</label>
        <div>
          <Radio
            selected={this.state[question.name]}
            name={question.name}
            value="true"
            label="True"
            onChange={this.handleChange}
          />
          <Radio
            selected={this.state[question.name]}
            name={question.name}
            value="false"
            label="False"
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }

  render() {
    const { player } = this.props;
    const { age, gender, education, race, multipleChoice } = this.state;

    return (
      <Centered>
        <div className="exit-survey">
          <h1> Exit Survey </h1>
          <p>
            Please complete the following survey. None of your answers 
            will have an effect on your assignment being accepted, so 
            please answer as honestly as you can. You do not have to provide
            any information you feel uncomfortable with.
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-line">
              <div>
                <label htmlFor="age">Age</label>
                <div>
                  <input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    step="1"
                    dir="auto"
                    name="age"
                    value={age}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="multiple-choice">
              <label>What is your gender?</label>
              <div>
                <Radio
                  selected={gender}
                  name="gender"
                  value="male"
                  label="Male"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={gender}
                  name="gender"
                  value="female"
                  label="Female"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={gender}
                  name="gender"
                  value="other"
                  label="Other"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="multiple-choice">
              <label>Highest education level completed (if currently enrolled, then the 
                highest you have already completed)</label>
              <div>
                <Radio
                  selected={education}
                  name="education"
                  value="no-school"
                  label="No School"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="prior-to-high-school"
                  label="Schooling prior to high school"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="some-high-school"
                  label="Some high school"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="high-school"
                  label="High school diploma or alternative qualification (e.g. GED)"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="some college"
                  label="Some college or university (no degree)"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="associate"
                  label="Associate degree"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="bachelor"
                  label="Bachelor's degree"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="trade-school"
                  label="Trade or technical school"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="grad-school"
                  label="A graduate degree"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={education}
                  name="education"
                  value="other"
                  label="Other"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="multiple-choice">
              <label>Which race do you most identify with?</label>
              <div>
                <Radio
                  selected={race}
                  name="race"
                  value="American-Indian-Alaska-Native"
                  label="American Indian or Alaska Native"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={race}
                  name="race"
                  value="Asian"
                  label="Asian"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={race}
                  name="race"
                  value="Black"
                  label="Black or African American"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={race}
                  name="race"
                  value="Pacific"
                  label="Native Hawaiian or Other Pacific Islander"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={race}
                  name="race"
                  value="White"
                  label="White"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={race}
                  name="race"
                  value="other"
                  label="Other"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div>
              <h3>When responding to the questions below, think about how you felt 
                during this experiment.</h3>
              {taskQuestions.map(question => this.renderTrueFalse(question))}

              <div className="multiple-choice">
                <label>My feelings of competitiveness changed from the first round to the last one.</label>
                <div>
                  <Radio
                    selected={multipleChoice}
                    name="multipleChoice"
                    value="true-more"
                    label="True, I felt more competitive in later rounds."
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={multipleChoice}
                    name="multipleChoice"
                    value="true-less"
                    label="True, I felt less competitive in later rounds."
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={multipleChoice}
                    name="multipleChoice"
                    value="false"
                    label="False"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={multipleChoice}
                    name="multipleChoice"
                    value="n/a"
                    label="N/A - I did not experience feelings of competitiveness."
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3>When completing the rest of the questions, think about how you feel 
                in general, not necessarily just during this experiment.</h3>
              {competIndexQuestions.map(question => this.renderTrueFalse(question))}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </Centered>
    );
  }
}
