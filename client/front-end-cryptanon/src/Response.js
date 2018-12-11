import React, { Component } from 'react';

const Response = ({currentSelection, response}) => {
  console.log(response.toString())

  return(
    <div className="response">
      <h4>Example</h4>
      <p className="example">{ currentSelection }</p>
      <h4>Response</h4>
      <pre>{JSON.stringify(response[0], null, 2) }</pre>
    </div>
  );
}

export default Response;



