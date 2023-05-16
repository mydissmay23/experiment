import React from "react";

import { Centered } from "meteor/empirica:core";

export default class Feedback extends React.Component {
  convertToOrdinal(n) {
    if (n % 10 === 1 && n % 100 !== 11) {
      return (n + "st");
    } else if (n % 10 === 2 && n % 100 !== 12) {
      return (n + "nd");
    } else if (n % 10 === 3 && n % 100 !== 13) {
      return (n + "rd");
    } else {
      return (n + "th");
    }
  }

  produceRelativeFeedback() {
    const { stage, round, player, game } = this.props;
    const ties = round.get("numberTiedWithPlayer");
    const playerRank = player.round.get("value")[player.round.get("value").length - 1];
    if (ties[playerRank]) {
      return this.produceTieMessage(playerRank, ties);
    } else {
      return (this.convertToOrdinal(playerRank) + " out of " +
        game.players.length);
    }
  }

  produceTieMessage(playerRank, tiesObject) {
    const { stage, round, player, game } = this.props;
    const numTiedWith = tiesObject[playerRank];
    if (playerRank === round.get("lastPlaceRank") && playerRank != 1) {
      playerRank = "last";
    } else {
      playerRank = this.convertToOrdinal(playerRank);
    }
    let message = "You tied for " + playerRank + " out of " + 
      game.players.length + " with " + numTiedWith + " other player";
    if (numTiedWith > 1) {
      message += "s";
    }
    return message;
  }

  render() {
    const { stage, round, player, game } = this.props;
    const value = player.round.get("value");

    return (
      <Centered>
        <div className="feedback">
          {
            game.treatment.feedbackType === "absolute" ? (
              <h1>Score: {(value[value.length - 2] * 100).toFixed()}</h1>
            ) : (
              <h1>Rank: {this.produceRelativeFeedback()}</h1>
            )
          }
          <p>The activity will continue when the countdown on the left ends.</p>
        </div>
      </Centered>
    );
  }
}