import React, { Component } from 'react';

const Response = ({currentSelection, response}) => {
  if(response === undefined) {
    let renderObj = '';
    console.log(renderObj)
  } else {
    //let renderObj = response.prototype.toString();
  }
  return(
    <div className="response">
      <h4>Example</h4>
      <p className="example">{ currentSelection }</p>

      <pre>
        
      </pre>
    </div>
  );
}

export default Response;


