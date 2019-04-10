import React from 'react';

import './SideNodeView.scss';

function SideNodeView(props) {
  return (
    <div className={'side-node-view ' + props.className}>
      {props.children.map(function(item, index) {
        return <div key={'side_block_' + index}>{item.getDescription()}</div>;
      })}
    </div>
  );
}

export default SideNodeView;
