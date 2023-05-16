import React from "react";

import { Centered } from "meteor/empirica:core";

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

export default class Quiz extends React.Component {
  state = { };

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.attentionCheck !== "strongly disagree") {
      alert("Incorrect! Read the instructions, and please try again.");
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    const { attentionCheck } = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1> Preliminary Exercise </h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Please select "strongly disagree" below to show you are paying attention.</label>
              <div>
                <Radio
                  selected={attentionCheck}
                  name="attentionCheck"
                  value="strongly agree"
                  label="strongly agree"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={attentionCheck}
                  name="attentionCheck"
                  value="agree"
                  label="agree"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={attentionCheck}
                  name="attentionCheck"
                  value="disagree"
                  label="disagree"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={attentionCheck}
                  name="attentionCheck"
                  value="strongly disagree"
                  label="strongly disagree"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <p>
              <button type="button" onClick={onPrev} disabled={!hasPrev}>
                Back to instructions
              </button>
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </Centered>
    );
  }
}
