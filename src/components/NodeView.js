import React, { Component } from 'react';

class NodeView extends Component {
  render() {
    console.log('Render', this.props);
    return (
      <React.Fragment>
        <h1>{this.props.node.description}</h1>
        {Array.isArray(this.props.node.getContent()) ? (
          <ul>
            {this.props.node.getContent().map(function(item, index) {
              return <li key={`node_${index}`}>{item.getDescription()}</li>;
            })}
          </ul>
        ) : (
          <p>{this.props.node.getContent()}</p>
        )}
      </React.Fragment>
    );
  }
}

export { NodeView };
