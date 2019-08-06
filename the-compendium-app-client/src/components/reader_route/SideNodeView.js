import React from 'react';

import './SideNodeView.scss';

function SideNodeView({ className, children, setFocusedNode }) {
  return (
    <div className={'side-node-view ' + className}>
      {children.map(function(item, index) {
        return (
          <p
            key={'side_block_' + index}
            className={'side-block-item'}
            onClick={function() {
              setFocusedNode(item);
            }}
          >
            <span>{item.getTitle()}</span>
          </p>
        );
      })}
    </div>
  );
}

export default SideNodeView;
