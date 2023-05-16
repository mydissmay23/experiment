import React from "react";

export default class TaskResponse extends React.Component {

  handleChange = (row, col, event) => {
    const { player } = this.props;
    const sliderValue = Math.round(event.target.value);
    const valueGrid = player.round.get("value");
    valueGrid[row][col] = sliderValue;
    player.round.set("value", valueGrid);
  };

  renderSlider(value, row, col) {
    return (
      <span key={"slider-" + row + "-" + col} className="single-slider-display">
        <input 
          className="slider"
          id="slider"
          type="range"
          min="0"
          max="100"
          step="1"
          value={value}
          onChange={event => this.handleChange(row, col, event)}
          onKeyDown={event => event.preventDefault()}
        />
        <label className="slider-value" htmlFor="slider">{value}</label>
      </span>
    );
  }

  renderRow(row, rowIndex) {
    return (
      <div className={"slider-row-" + rowIndex} key={"row" + rowIndex}>
        {row.map((sliderValue, colIndex) => (
          this.renderSlider(sliderValue, rowIndex, colIndex)
        ))}
      </div>
    );
  }

  render() {
    const { player } = this.props;

    return (
      <div className="slider-task">
        {Array.isArray(player.round.get("value")) 
        && 
        player.round.get("value").map((row, rowIndex) => this.renderRow(row, rowIndex))}
      </div>
    );
  }
}
