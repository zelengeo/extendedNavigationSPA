import React, { Component } from 'react';
class Header extends Component{

  render() {
    return (
      <nav className={"navBar"}>
        {this.props.children.map((child)=> (<div className={"navLink"} key={`linkTo${child.props.children}`}>{child}</div>))}
      </nav>
    )
  }
}
export {Header};