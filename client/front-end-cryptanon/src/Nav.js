import React, { Component } from 'react';

const Nav = () => {
  return(
    <div className="nav-bar">
      <button className="nav-btn">Top 50 Cryptocurrencies</button>
      <button className="nav-btn">Historical Pricing for Cryptocurrency</button>
      <button className="nav-btn">Range of Historical Pricing</button>
      <button className="nav-btn">Top Headlines for Currency</button>
    </div>
  );
}

export default Nav;