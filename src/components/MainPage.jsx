import React, { Component } from 'react';
import './MainPage.css';
import Search from './Search'
import ResultCard from './ResultCard';
import Pagination from "@material-ui/lab/Pagination";



class MainPage extends Component {

  constructor(props) {
    super(props)
    this.resultsPerPage = 10
    this.props.history.replace() 
    this.state =  {
      results: [],
      page: 1,
      loading: false,
      query: "",
      fullscreen: true
    }

    //this.props.location.state ||


    this.handlePaginationChange = this.handlePaginationChange.bind(this)
    this.handleSearchRequest = this.handleSearchRequest.bind(this)
  }

  componentDidMount() {
    console.log(this.props?.location?.state?.query)
    if (this?.props?.location?.state?.query !== undefined) {
      this.handleSearchRequest(this?.props?.location?.state?.query)
    }
    const queryString = new URLSearchParams(this.props.location.search);
    const query = queryString.get('query')
    const page = queryString.get('page')
    if (query !== null && page !== null)
    {
      this.handleSearchRequest(query);
      this.setState({page:page})
    }
  }

  processResults(res) {
    return res.results.map((x) => {
      let data = { name: x.name.first + " " + x.name.last, city: x.location.city, state: x.location.state, picture: x.picture.large };
      return data;
    })
  }

  handleSearchRequest(query) {
    this.setState({ loading: true, fullscreen: false, query: query })

    fetch(`https://randomuser.me/api/?results=35&seed=${query}`, { mode: 'cors' }).then(res => res.json()).then((res) => {
      //setTimeout(() => {}},100000000)
      this.setState({ results: this.processResults(res), loading: false })

      this.props.history.push(`/?query=${this.state.query}&page=${this.state.page}`)
      //this.props.history.replace(this.props.location.pathname, this.state)

    })
  }


  // const [results, setResults] = useState( handleSearchRequest(props?.location?.state?.query))
  // const [page, setPage] = useState(1)
  // const [loading, setLoading] = useState(false)
  // const [fullscreen, setFullscreen] = useState( props?.location?.state?.fullscreen ?? true)



  handlePaginationChange(_, newPage) {
    this.setState({ page: newPage })
    this.props.history.push(`/?query=${this.state.query}&page=${newPage}`)
  }


  render() {
    console.log("2:" + this.props?.location?.state?.query)

    let cards;
    if (this.state.loading) {
      cards = [...Array(4).keys()].map((x) =>
        <div className="placeholder" key={x}></div>
      )
    } else {
      cards = this.state.results.slice((this.state.page - 1) * this.resultsPerPage, (this.state.page) * this.resultsPerPage).map(result =>
        <ResultCard key={result.name.toString()} result={result} />)
    }

    return (
      <div className="MainPage">
        <header className={"header" + (this.state.fullscreen ? " header-full" : "")}>
          <div className="inner-header">
          <div className="logo"><a href="/">McLyrics</a></div>
            <Search className="search" defaultQuery={this.props?.location?.state?.query ?? ""} onSearchRequest={this.handleSearchRequest} fullscreen={this.state.fullscreen} />
          </div>
        </header>
        <main className="main">
          <div className="inner-main">
            {cards}
            {this.state.fullscreen || this.state.results.length < this.resultsPerPage ? "" : <Pagination className="pagination" variant="outlined" shape="rounded" count={Math.ceil(this.state.results.length / this.resultsPerPage)} onChange={this.handlePaginationChange} />}
          </div>
        </main>
      </div>
    );
  }
}

export default MainPage;