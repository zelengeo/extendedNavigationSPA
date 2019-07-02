import React, { useState } from 'react';

import './AddPublicationModalBody.scss';

function AddPublicationModalBody({ hide, save }) {
  const [formValue, setFormValue] = useState('');
  const onFormChange = function(event) {
    setFormValue(event.target.value);
  };
  const onFormSubmit = function(event) {
    save({ content: formValue });
    event.preventDefault();
  };

  return (
    <div className="add-publication-modal">
      <div className="add-publication-modal-body">
        <form onSubmit={onFormSubmit}>
          <label>
            Publication content:
            <input
              type="text"
              name="name"
              value={formValue}
              onChange={onFormChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={hide}>Hide</button>
      </div>
    </div>
  );
}

export default AddPublicationModalBody;
