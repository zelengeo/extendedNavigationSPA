import React, { Component } from 'react';
import {MainContainer} from "./MainContainer"

class Home extends Component {
  render() {
    return(
    <div className={"homeContainer"}>
      <h1>Home</h1>
      <MainContainer/>
    </div>
  )}
}

export {Home}