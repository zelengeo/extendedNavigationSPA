import React from 'react';

import './SideNodeView.scss';

function SideNodeView(props) {
  return (
    <div className={'side-node-view ' + props.className}>
      {props.children.map(function(item, index) {
        return (
          <p
            key={'side_block_' + index}
            className={'side-block-item'}
            onClick={function() {
              props.setFocusedNode(item);
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
