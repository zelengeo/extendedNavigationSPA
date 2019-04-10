import React from 'react';

import './NodeView.scss';

function NodeView(props) {
  return (
    <div className={'node-view'}>
      <h1>{props.node.description}</h1>
      {Array.isArray(props.node.getContent()) ? (
        <ul>
          {props.node.getContent().map(function(item, index) {
            return <li key={`node_${index}`}>{item.getDescription()}</li>;
          })}
        </ul>
      ) : (
        <p>{props.node.getContent()}</p>
      )}
    </div>
  );
}

export default NodeView;
