import React from "react";

import Timer from "./Timer.jsx";

export default class Sidebar extends React.Component {

  render() {
    const { stage } = this.props;

    return (
      <aside className="sidebar">
        <Timer stage={stage} />
      </aside>
    );
  }
}
