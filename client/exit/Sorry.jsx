import React, { Component } from 'react'
import { Meteor } from "meteor/meteor";
import { Centered } from "meteor/empirica:core";

export default class Sorry extends Component {
    static stepName = "Sorry";

    render() {
        const { player, game } = this.props;
        let msg;
        let completionCode;
        switch (player.exitStatus) {
            case "gameFull":
                msg = "All games currently available have filled up too fast. "
                        + "You are still eligible to participate another time if the  "
                        + "experiment is run again.";
                break;
            case "gameLobbyTimedOut":
                msg = "There were not enough players for the game to start...";
                break;
            case "playerEndedLobbyWait":
                msg =
                    "You decided to stop waiting, we are sorry it was too long a wait.";
                break;
            default:
                msg = "Unfortunately there was an error and the game was cancelled. I greatly "
                        + "apologize. Please provide the following completion code, so that I "
                        + "can still pay you for your time:";
                completionCode = player._id;
                break;
        }
        if (player.exitReason === "failedQuestion") {
            msg =
                "Unfortunately you did not meet the conditions required to play the game.";
        }
        // Only for dev
        if (!game && Meteor.isDevelopment) {
            msg =
                "Unfortunately the Game was cancelled because of failed to init Game (only visible in development, check the logs).";
        }
        return (
            <Centered>
                <div>
                    <h4>Sorry!</h4>
                    <p>{msg}</p>
                    {completionCode && <h2>{completionCode}</h2>}
                </div>
            </Centered>
        );
    }
}