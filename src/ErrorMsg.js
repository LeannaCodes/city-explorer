import React, { Component } from "react";

export class ErrorMsg extends Component {
  render() {
    return <div>{this.props.message}</div>;
  }
}

export default ErrorMsg;
