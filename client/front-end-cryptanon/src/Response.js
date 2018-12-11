import React, { Component } from 'react';

const Response = ({currentSelection, response}) => {
  return(
    <div className="response">
      <h4>Example</h4>
      <p className="example">{ currentSelection }</p>

    </div>
  );
}

export default Response;


