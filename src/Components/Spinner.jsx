import React, { Component } from 'react'
import loading from '../spinner.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="Spinner" className='my-3' style={{width: '100px'}}/>
      </div>
    )
  }
}
