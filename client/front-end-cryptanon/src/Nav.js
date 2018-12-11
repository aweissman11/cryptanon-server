import React, { Component } from 'react';

const Nav = ({updateSelection}) => {
  return(
    <div className="nav-bar">
      <button 
        className="nav-btn"
        onClick={() => updateSelection(0)}
        >Top 50 Cryptocurrencies</button>
      <button 
        className="nav-btn"
        onClick={() => updateSelection(1)}
        >Historical Pricing for Cryptocurrency</button>
      <button 
        className="nav-btn"
        onClick={() => updateSelection(2)}
        >Range of Historical Pricing</button>
      <button 
        className="nav-btn"
        onClick={() => updateSelection(3)}
        >Top Headlines for Currency</button>
    </div>
  );
}

export default Nav;