import React from "react";

import Sidebar from "./Sidebar.jsx";
import Feedback from "./Feedback.jsx";
import Task from "./Task.jsx";

export default class Round extends React.Component {
  render() {
    const { round, stage, player, game } = this.props;

    return (
      <div className="round">
        <div className="content">
          <Sidebar stage={stage} />
          {
            stage.name === "slider task" ? (
              <Task game={game} round={round} stage={stage} player={player} />
            ) : (
              <Feedback stage={stage} round={round} player={player} game={game} />
            )
          }
        </div>
      </div>
    );
  }
}
