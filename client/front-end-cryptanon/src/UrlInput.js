import React, { Component } from 'react';

const UrlInput = () => {
  return(
    <div className="url-input">
      <button className="get-btn">GET</button>
      <input type="text" placeholder="Enter URL" className="input"/>
    </div>
  );
}

export default UrlInput;