import React, { Component } from 'react';
import logo1 from "../logo1.svg"
import logo2 from "../logo2.svg"
import logo3 from "../logo3.svg"
import logo4 from "../logo4.svg"
import logo5 from "../logo5.svg"
import logo6 from "../logo6.svg"
import logo_ from "../logo_.svg"

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenLogo: null
    };
  }

  componentWillMount() {
    document.addEventListener("keydown",this._arrowKeyPressEventHandler, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown",this._arrowKeyPressEventHandler, false);
  }

  _arrowKeyPressEventHandler(event){
    if (event.code === "ArrowLeft" || event.code === "ArrowRight" || event.code === "ArrowUp" || event.code === "ArrowDown"){
      event.preventDefault();
      console.log("Event",event);
    }


  }

  render() {
    let logos=[logo1,logo2,logo3,logo4,logo5,logo6].map(
        (logo, index)=>(<img onClick={()=> this.setState({chosenLogo: logo})} key={`logo_${index}`} src={logo} className="logoElement" alt="logo" />));

    return (
    <div className={"mainContainer"}>
      <div className={"elements"}>
        {logos}
      </div>
      <div className={"selectedElement"}>
        <p>"Selected field"</p>
        <div className={"selectedImgBorder"}>
          <img id={"selectedLogo"} src={this.state.chosenLogo ? this.state.chosenLogo : logo_} alt={"logo"}/>
        </div>
      </div>
    </div>
    )
  }
}

export {MainContainer};