import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import UrlInput from './UrlInput';
import Response from './Response';
import exampleUrl from './helper';
import UserEndpoints from './UserEndpoints';
import EndpointResponses from './EndpointResponses';


class App extends Component {
  state = {
    response: [],
    post: '',
    responseToPost: '',
    currentSelection: '',
    currentUrl: '',
    error: false
  };

  updateSelection = (id) => {
    this.setState({
      currentSelection: exampleUrl[id]
    })
  }

  updateUrl = async (input) => {
    await this.setState({
      currentUrl: input,
      error: false
    })
    this.getExample()
  }

  getExample = async () => {
    try {
      const response = await fetch(this.state.currentUrl)
      const body = await response.json();
      console.log(body)

      if (response.status !== 200) {
        await this.setState({
          error: true
        })
        throw Error(body.message)
        } else {
        await this.setState({
          response: body
        })
      }
    } catch(error) {
      console.log(error)
    }
  }
 
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className='title'>Cryptanon</h1>
          <Nav updateSelection={this.updateSelection} />
          <UrlInput updateUrl={this.updateUrl} />
        </header>
        <Response currentSelection={this.state.currentSelection} response={this.state.response} error={this.state.error}/>
        <UserEndpoints />
        <EndpointResponses />
      </div>
    );
  }
}

export default App;
