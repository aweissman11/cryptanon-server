import React from "react";

const Response = ({ currentSelection, response, error }) => {
  if (error === true) {
    return (
      <div className="get-response">
        <h4>Example</h4>
        <p className="example">{currentSelection}</p>
        <h4>Response</h4>
        <p className="get-response-example">Incorrect URL</p>
      </div>
    );
  } else if (response.length === 0) {
    return (
      <div className="get-response">
        <h4>Example</h4>
        <p className="example">{currentSelection}</p>
        <h4>Response</h4>
      </div>
    );
  } else {
    return (
      <div className="get-response">
        <h4>Example</h4>
        <p className="example">{currentSelection}</p>
        <h4>Response</h4>
        <pre className="get-response-example">
          {JSON.stringify(response[0], null, 2)}
        </pre>
      </div>
    );
  }
};

export default Response;
