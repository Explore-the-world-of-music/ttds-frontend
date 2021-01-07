import React, { useState } from 'react';
import './App.css';
import Search from './components/Search'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faTimes, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import ResultCard from './components/ResultCard';

import Pagination from "@material-ui/lab/Pagination";

library.add(faSearch, faTimes, faAngleDown);

function App() {
  const resultsPerPage = 10
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [fullscreen, setFullscreen] = useState(true)


  const handleLoadingResults = () => {
    setLoading(true)
    setFullscreen(false)
    console.log("loading: " + loading)
  }

  const handleResultsReceived = (res) => {
    setResults(res.results.map((x) => { 
      let data = {name: x.name.first + " " + x.name.last, city: x.location.city, state: x.location.state, picture:x.picture.large};
      return data;
    }))
    setLoading(false)
    console.log("loading: " + loading)
    console.log(results)
  }

  const resultCards = results.slice((page-1)*resultsPerPage, (page)*resultsPerPage).map(result =>
    <ResultCard key={result.name.toString()} result={result} />
  );

  const placeholders = [...Array(4).keys()].map((x) => 
    <div className="placeholder" key={x}></div>
  )

  const handlePaginationChange = (_, newPage) => {
    setPage(newPage)
  }

  let isHeaderFullScreen = fullscreen ? " header-full" : ""

  return (
    <div className="App">
      <header className={"header" + isHeaderFullScreen}> 
        <div className="inner-header">
          <div className="logo">McLyrics</div>
          <Search className="search" onLoadingResults={handleLoadingResults} onResultsReceived={handleResultsReceived} fullscreen={fullscreen}/>
        </div> 
      </header>
      <main className="main"> 
        <div className="inner-main">
          {loading ?  placeholders : resultCards}
          {fullscreen || results.length < resultsPerPage ? "" :<Pagination variant="outlined" shape="rounded" count={Math.ceil(results.length / resultsPerPage)} onChange={handlePaginationChange} />}
        </div>
      </main>
    </div>
  );
}

export default App;