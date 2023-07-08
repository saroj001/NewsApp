// import './App.css';

import React, { Component } from 'react'
import Header from './Components/Header';
import NewComponent from './Components/NewComponent';

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <NewComponent />
      </>
    )
  }
}
