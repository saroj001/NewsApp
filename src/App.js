// import './App.css';

import React, { Component } from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './Components/Header';
import NewComponent from './Components/NewComponent';

export default class App extends Component {
  pageSize = 15;
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path='/' element={<NewComponent key="general" pageSize={this.pageSize} />}></Route>
          <Route exact path='/Business' element={<NewComponent key="business" pageSize={this.pageSize} country='in' category='business' />}></Route>
          <Route exact path='/General' element={<NewComponent key="general" pageSize={this.pageSize} country='in' category='general' />}></Route>
          <Route exact path='/Entertainment' element={<NewComponent key="entertainment" pageSize={this.pageSize} country='in' category='entertainment' />}></Route>
          <Route exact path='/Health' element={<NewComponent key="health" pageSize={this.pageSize} country='in' category='health' />}></Route>
          <Route exact path='/Science' element={<NewComponent key="science" pageSize={this.pageSize} country='in' category='science' />}></Route>
          <Route exact path='/Sports' element={<NewComponent key="sports" pageSize={this.pageSize} country='in' category='sports' />}></Route>
          <Route exact path='/Technology' element={<NewComponent key="technology" pageSize={this.pageSize} country='in' category='technology' />}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}
