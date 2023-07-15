import React, { Component } from 'react';
import NewItem from './NewItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class NewComponent extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
  }

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading: true,
      page: 1,
      totalResults: 0
    }
  }
  capatilizeFirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=84b165a255b444e99a5f8c80e1c72cae&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    document.title = `${this.capatilizeFirstletter(this.props.category)} - BadarNews`;
  }

  async componentDidMount() {
    this.updateNews();

  }
  // handlePrevClick = async()=> {
  //   this.setState({page: this.state.page - 1});
  //   this.updateNews();
  // }
  // handleNextClick = async()=> {
  //   this.setState({page: this.state.page + 1});
  //   this.updateNews();
  // }


  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=84b165a255b444e99a5f8c80e1c72cae&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      // loading: false
    })
  }

  render() {
    return (
      <div className=' my-10'>
        <div className="my-4">
          <div className="container text-center">
            <h1 className='mb-4'>Latest News from <i>{this.capatilizeFirstletter(this.props.category)}</i></h1>
            {/* <p className='text-right'>{this.state.page}/{Math.ceil(this.state.totalResults/ this.props.pageSize)}</p> */}
          </div>
          {this.state.loading && <Spinner />}
          
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row flex">
                {this.state.articles.map((element)=>{
                  return <div className="col-md-4 col-lg-3 mb-4 flex" key={element.url}>
                    <NewItem title={element.title?element.title:''} description={element.content?element.content.slice(0,88):''} imageUrl={element.urlToImage?element.urlToImage:''} newsUrl={element.url?element.url:''} totalResults={Math.ceil(this.state.totalResults/ this.props.pageSize)} author={element.author?element.author:'Unknown'} date={element.publishedAt} source={element.source.name}/>
                  </div> 
                })}
              </div>
            </div>
          </InfiniteScroll>
          {/* <div className="container">
            <p className='d-flex justify-content-end'>{this.state.page}/{Math.ceil(this.state.totalResults/ this.props.pageSize)}</p>
          </div> */}
          {/* <div className="btn-holder py-4 d-flex justify-content-between">
            <button disabled={this.state.page<=1} className='btn btn-sm btn-dark' onClick={this.handlePrevClick}>&larr; Prev</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/ this.props.pageSize)} className='btn btn-sm btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
        </div>
      </div>
    )
  }
}
