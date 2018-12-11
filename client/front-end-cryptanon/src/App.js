import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import UrlInput from './UrlInput';
import Response from './Response';
import exampleUrl from './helper'

class App extends Component {
  state = {
    response: [],
    post: '',
    responseToPost: '',
    currentSelection: '',
    currentUrl: '',
  };

  componentDidMount() {
    this.callApi()
  }

  callApi = async () => {
    const response = await fetch('/api/v1/assets')
    console.log(response);
    const body = await response.json();

    console.log(body);
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  updateSelection = (id) => {
    this.setState({
      currentSelection: exampleUrl[id]
    })
  }

  updateUrl = async (input) => {
    await this.setState({
      currentUrl: input
    })
    this.getExample()
  }

  getExample = async () => {
    const response = await fetch(this.state.currentUrl)
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) } else {
      await this.setState({
        response: body
      })
    }
  }
 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Nav updateSelection={this.updateSelection} />
          <UrlInput updateUrl={this.updateUrl} />
        </header>
        <Response currentSelection={this.state.currentSelection} response={this.state.response[0]} />
      </div>
    );
  }
}

export default App;
