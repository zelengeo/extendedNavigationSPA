import React from 'react';

import './NodeView.scss';

function NodeView({ node, setFocusedNode }) {
  return (
    <div className={'node-view'}>
      <h1>{node.getTitle()}</h1>
      <p>{node.getSynopsis()}</p>
      {Array.isArray(node.getContent()) ? (
        <ul>
          {node.getContent().map(function(item, index) {
            return (
              <li
                key={`node_${index}`}
                onClick={function() {
                  setFocusedNode(item);
                }}
              >
                {item.getTitle()}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>{node.getContent()}</p>
      )}
    </div>
  );
}

export default NodeView;
