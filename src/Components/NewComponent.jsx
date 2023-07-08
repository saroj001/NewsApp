import React, { Component } from 'react'
import NewItem from './NewItem'

export default class NewComponent extends Component {

  constructor(){
    super();
    this.state = {
      articles : [],
      loading: false,
      page: 1,

    }
  }
  async componentDidMount() {
    let url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=84b165a255b444e99a5f8c80e1c72cae&page=1&pageSize=20';
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})

  }
  handlePrevClick = async()=> {
    console.log('Prev');
    if(this.state.page - 1 > Math.ceil(this.state.totalResults/ 20)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=84b165a255b444e99a5f8c80e1c72cae&page=${this.state.page - 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
      })
    }
  }
  handleNextClick = async()=> {
    console.log('Next');  
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/ 20)) {

    }
    else {  
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=84b165a255b444e99a5f8c80e1c72cae&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }
  }

  render() {
    return (
      <div className='container my-10'>
        <h2 className='mb-4'>Badar News Headling</h2>
        <div className="row flex">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4 col-lg-3 mb-4 flex" key={element.url}>
              <NewItem title={element.title?element.title:''} description={element.content?element.content.slice(0,88):''} imageUrl={element.urlToImage?element.urlToImage:''} newsUrl={element.url?element.url:''}/>
            </div>
          })}
        </div>
        <div className="btn-holder py-4 d-flex justify-content-between">
          <button disabled={this.state.page<=1} className='btn btn-sm btn-dark' onClick={this.handlePrevClick}>&larr; Prev</button>
          <button className='btn btn-sm btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
