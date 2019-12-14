import React, { Component } from "react";
import "./PostWrapper.css";

class PostWrapper extends Component {
  render() {
    return <div className="PostWrapper">{this.props.children}</div>;
  }
}

export default PostWrapper;
