import React, { Component } from 'react'

export default class NewItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className="card flex flex-column">
        <img src={imageUrl?imageUrl:'https://media.zenfs.com/en/reuters-finance.com/9a05816f8c0a4758a5f36d2a5e360e9b'} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title" title={title}>{title}</h5>
          <p className="card-text">{description}...</p>
          <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    )
  }
}
