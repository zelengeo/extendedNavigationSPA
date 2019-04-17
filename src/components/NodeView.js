import React from 'react';

import './NodeView.scss';

function NodeView(props) {
  return (
    <div className={'node-view'}>
      <h1>{props.node.getTitle()}</h1>
      <p>{props.node.getSynopsis()}</p>
      {Array.isArray(props.node.getContent()) ? (
        <ul>
          {props.node.getContent().map(function(item, index) {
            return <li key={`node_${index}`}>{item.getTitle()}</li>;
          })}
        </ul>
      ) : (
        <p>{props.node.getContent()}</p>
      )}
    </div>
  );
}

export default NodeView;
