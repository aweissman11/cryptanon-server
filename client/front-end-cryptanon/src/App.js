import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import UrlInput from './UrlInput';
import Response from './Response';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Nav />
          <UrlInput />
        </header>
        <Response />
      </div>
    );
  }
}

export default App;
