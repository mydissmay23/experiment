import React from "react";

export default class CompletionCode extends React.Component {
  static stepName = "CompletionCode";

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { player, onSubmit } = this.props;

    return (
      <div className="completion-code">
        <h3>
          Copy the following completion code to provide it in the Mturk task 
          to receive your base pay and bonus:
        </h3>
        <h2>
        {player._id}
        </h2>
        <br />

        <button type="submit" onClick={onSubmit}>
          Next
        </button>
      </div>
    );
  }
}