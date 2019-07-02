import React, { useState } from 'react';

function ModalWrapper({ entryPoint, modalBody }) {
  const [isShown, setIsShown] = useState(false);

  function show() {
    setIsShown(true);
  }

  function hide() {
    setIsShown(false);
  }

  return (
    <React.Fragment>
      {entryPoint(show)}
      {isShown && modalBody(hide)}
    </React.Fragment>
  );
}

export default ModalWrapper;
