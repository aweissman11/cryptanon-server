import React from 'react';

const Response = ({currentSelection, response, error}) => {
  console.log(response.toString())

  if( error === true ) {
    return(
      <div className="response">
        <h4>Example</h4>
        <p className="example">{ currentSelection }</p>
        <h4>Response</h4>
        <p>Incorrect URL</p>
      </div>
    )
  } else if (response.length === 0) {
    return(
      <div className="response">
        <h4>Example</h4>
        <p className="example">{ currentSelection }</p>
        <h4>Response</h4>
      </div>
    )
  } else {
    return(
      <div className="response">
        <h4>Example</h4>
        <p className="example">{ currentSelection }</p>
        <h4>Response</h4>
        <pre>{JSON.stringify(response, null, 2) }</pre>
      </div>
    )
  }
}

export default Response;



