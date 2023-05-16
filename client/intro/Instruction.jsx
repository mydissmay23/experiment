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

export default class Instruction extends React.Component {
  state = { };

  handleChange = event => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  makeAlert = incorrectAnswers => {
    let message = "Please check your answer"
    incorrectAnswers.length > 1 ? message += "s for " : message += " for ";
    for (let i = 0; i < incorrectAnswers.length; i++) {
      if (i === 0) {
        message += incorrectAnswers[i];
      } else if (i != incorrectAnswers.length - 1) {
        message = message + ", " + incorrectAnswers[i];
      } else {
        message = message + " and " + incorrectAnswers[i];
      }
    }
    return (message + ", and try again.")
  };

  handleSubmit = event => {
    event.preventDefault();

    // find incorrect answers
    let incorrectAnswers = [];
    if (this.state.q1 !== "slider and results") {
      incorrectAnswers.push("Q1");
    }
    if (this.state.q2 !== "wait") {
      incorrectAnswers.push("Q2");
    }
    if (this.state.q3 !== "true") {
      incorrectAnswers.push("Q3");
    }

    if (incorrectAnswers.length > 0) {
      alert(this.makeAlert(incorrectAnswers));
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;
    const { q1, q2, q3 } = this.state;
    let feedbackInstructions;
    if (game.treatment.feedbackType === "absolute") {
      feedbackInstructions = "you will receive your results in the form of a score. " 
        + "The higher the score the better."
    } else {
      feedbackInstructions = "you will receive your results in the form of how you "
        + "ranked compared to the other participants, with the first-place participant "
        + "being the top performer for the round."
    }

    return (
      <Centered>
        <div className="instructions">
          <h1> Instructions </h1>
          <p>
            You will only be allowed to participate in this experiment once. This page 
            walks you through instructions for completing the assignment. If at any point 
            during this experiment, a page does not load and you are met with a blank 
            screen, it is okay to refresh the page. You should also refresh if your screen 
            is stuck saying "waiting for server response" for about 5 seconds.
          </p>
          <h3 className="sectionHeader">Lobby</h3>
          <p>
            After you complete this page and the question on the next screen, you might 
            wait in a "lobby" for other participants to be ready. If it takes longer than 
            seven minutes after the first participant enters the lobby for enough players to 
            show up, the experiment will begin anyway. If you close out while in the lobby
            and attempt to come back after the experiment has started, you will not be able to
            continue.
          </p>
          <h3 className="sectionHeader">Slider Task</h3>
          <p>
            When the experiment begins, you will see a screen of sliders and 
            instructions telling you to position as many of them to 50 as you can. Each 
            slider's current position is listed to its right, and as you adjust the slider, 
            you will see that value change. You will have 90 seconds to position as many 
            sliders as you can, and there will be a timer counting down on the left side 
            of your screen. There may be more sliders if you scroll down.
          </p>
          <h3 className="sectionHeader">Feedback</h3>
          <p>
            After the 90 seconds to position the sliders are up, {feedbackInstructions + " "} 
            This screen will be shown for 20 seconds and then the slider task of the next 
            round will begin. There are five rounds, each consisting of the 90-second slider 
            task followed by the feedback screen for 20 seconds. The results presented after 
            each round reflect only your performance during that specific round. They are 
            not affected by any previous round.
          </p>
          <h3 className="sectionHeader">Survey</h3>
          <p>
            After the final round of the slider task, you will see your results of the 
            last round, again for 20 seconds, and then you will be directed to a survey. The 
            survey asks questions about your feelings during the task and other more general 
            situations, as well as some demographic questions. You may skip any question you 
            do not feel comfortable answering.
          </p>
          <h3 className="sectionHeader">Completion</h3>
          <p>
            After you take the survey, you will receive a completion code to enter in the 
            MTurk task. Once you click "next" on the screen that gives you your completion 
            code, you will see a thank-you message indicating that you are finished.
          </p>
          <h3 className="sectionHeader">Compensation</h3>
          <p>
            You will receive a base pay of $2.00 for completing the HIT. In addition to the 
            base pay, you will receive a bonus that depends on your average performance across 
            all five rounds. The better you perform, the higher your bonus.
          </p>
          <p>
            <b>Bonuses are in addition to the $2.00 base pay and will be determined as follows:</b>
          </p>
          <ul>
            <li>Participant with the highest average score: $4.00</li>
            <li>Second highest average score: $3.50</li>
            <li>Third highest average score: $3.00</li>
            <li>Top half of participants but not in the top three: $2.00</li>
            <li>Bottom half of participants but not in the bottom three: $1.50</li>
            <li>Third to last: $0.75</li>
            <li>Second to last: $0.25</li>
            <li>Last place: $0</li>
          </ul>

          <h3 className="sectionHeader">
            Please answer the following questions to see if you understand the instructions:
          </h3>

          <form onSubmit={this.handleSubmit}>
            <div className="multiple-choice">
              <label>
                <b>Q1:</b> What will each round consist of?
              </label>
              <div>
                <Radio
                  selected={q1}
                  name="q1"
                  value="slider"
                  label="Just a slider task"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={q1}
                  name="q1"
                  value="results"
                  label="Just a results screen"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={q1}
                  name="q1"
                  value="slider and results"
                  label="A slider task and a results screen"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="multiple-choice">
              <label>
                <b>Q2:</b> What do you do on the results screen in each round after checking your results?
              </label>
              <div>
                <Radio
                  selected={q2}
                  name="q2"
                  value="next"
                  label="Click next"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={q2}
                  name="q2"
                  value="wait"
                  label="Wait for the countdown to end and the experiment to continue"
                  onChange={this.handleChange}
                />
                <Radio
                  selected={q2}
                  name="q2"
                  value="leave"
                  label="Leave the experiment"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {game.treatment.feedbackType === "absolute" && (
              <div className="multiple-choice">
                <label>
                  <b>Q3:</b> True or false: A higher score is better.
                </label>
                <div>
                  <Radio
                    selected={q3}
                    name="q3"
                    value="true"
                    label="True"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={q3}
                    name="q3"
                    value="false"
                    label="False"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            )}
            {game.treatment.feedbackType === "relative" && (
              <div className="multiple-choice">
                <label>
                  <b>Q3:</b> The participant ranked in 1st is the participant that performed the best in that round.
                </label>
                <div>
                  <Radio
                    selected={q3}
                    name="q3"
                    value="true"
                    label="True"
                    onChange={this.handleChange}
                  />
                  <Radio
                    selected={q3}
                    name="q3"
                    value="false"
                    label="False"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            )}

            <p>
              <button type="button" onClick={onPrev} disabled={!hasPrev}>
                Previous
              </button>
              <button type="submit" disabled={!hasNext}>
                Next
              </button>
            </p>
          </form>

        </div>
      </Centered>
    );
  }
}
