import React, { Component } from 'react';

class UrlInput extends Component {
  constructor() {
    super()

    this.state = {
      urlAddress: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      urlAddress: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.updateUrl(this.state.urlAddress)
  }

  render() {
    return(
      <form className="url-input" onSubmit={this.handleSubmit} >
        <button className="get-btn">GET</button>
        <input 
          placeholder="Enter URL" 
          className="input"
          name='urlAddress'
          value={this.state.urlAddress}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default UrlInput;