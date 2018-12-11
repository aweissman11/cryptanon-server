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
        <p className='host' >http://cryptanon-server.herokuapp.com/</p>
        <input 
          placeholder="Enter URL" 
          className="input"
          name='urlAddress'
          value={this.state.urlAddress}
          onChange={this.handleChange}
        />
        <button className="get-btn">GET</button>
      </form>
    );
  }
}

export default UrlInput;