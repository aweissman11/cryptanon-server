import React, { Component } from 'react';

const Response = () => {
  return(
    <div className="response">
      <h4>Example</h4>
      <p className="example">
http://cryptanon-server.herokuapp.com/api/v1/assets</p>
    </div>
  );
}

export default Response;


//conditional render if there is a response
//    <h4>Response</h4>
//   <p className="example"></p>