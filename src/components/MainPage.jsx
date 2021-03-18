import React, { Component } from 'react'
import './MainPage.css'
import Search from './Search'
import ResultCard from './ResultCard'
import Pagination from '@material-ui/lab/Pagination'

class MainPage extends Component {
    constructor (props) {
        super(props)
        this.resultsPerPage = 5
        const queryString = new URLSearchParams(this.props.location.search)
        this.defaults = {
            query: queryString.get('query'),
            artist: queryString.get('artist')?.split(',').filter(r => r !== ''),
            genre: queryString.get('genre')?.split(',').filter(r => r !== ''),
            language: queryString.get('language')?.split(',').filter(r => r !== ''),
            years: queryString.get('years')?.split(',').filter(r => r !== '').map(Number)
        }
        this.state = {
            results: [],
            page: queryString.get('page') !== null ? queryString.get('page') : 1,
            loading: false,
            fullscreen: true,
            queryUrlData: this.defaults
        }

        this.handlePaginationChange = this.handlePaginationChange.bind(this)
        this.handleSearchRequest = this.handleSearchRequest.bind(this)
        this.handleSearchRequestFromUser = this.handleSearchRequestFromUser.bind(this)
    }

    componentDidMount () {
        if (this.state.queryUrlData.query !== null) {
            this.handleSearchRequest(this.defaults)
        }
    }

    handleSearchRequest (data) {
        this.setState({ loading: true, fullscreen: false })

        fetch(`/api/songs/search?query=${encodeURIComponent(data.query)}&artist=${encodeURIComponent(data.artist)}&genre=${encodeURIComponent(data.genre)}&language=${encodeURIComponent(data.language)}&years=${data.years}`).then(res => res.json()).then((res) => {
            this.setState({ results: res.songs, loading: false, reportedQueryData: data, page: 1 })
            this.props.history.push(`/?query=${encodeURIComponent(data.query)}&page=${this.state.page}&artist=${data.artist.map(x => encodeURIComponent(x))}&genre=${data.genre.map(x => encodeURIComponent(x))}&language=${data.language.map(x => encodeURIComponent(x))}&years=${data.years}`)
        }).catch(error => {
            console.log(error)
            this.setState({ results: [], loading: false, reportedQueryData: null })
        })
    }

    handleSearchRequestFromUser (data) {
        this.setState({ page: 1 })
        this.handleSearchRequest(data)
    }

    handlePaginationChange (_, newPage) {
        this.setState({ page: newPage })
        const data = this.state.reportedQueryData
        this.props.history.push(`/?query=${encodeURIComponent(data.query)}&page=${newPage}&artist=${data.artist.map(x => encodeURIComponent(x))}&genre=${data.genre.map(x => encodeURIComponent(x))}&language=${data.language.map(x => encodeURIComponent(x))}&years=${data.years}`)
    }

    render () {
        let cards
        if (this.state.loading) {
            cards = [...Array(4).keys()].map((x) =>
                <div className="placeholder" key={x}></div>
            )
        } else {
            if ((this.state.results.length) || (this.state.fullscreen)) {
                cards = this.state.results.slice((this.state.page - 1) * this.resultsPerPage, (this.state.page) * this.resultsPerPage).map(result =>
                    <ResultCard key={result.name.toString()} result={result} />)
            } else {
                cards = <h2 className="empty"> No results </h2>
            }
        }

        return (
            <div className="MainPage">
                <header className={'header' + (this.state.fullscreen ? ' header-full' : '')}>
                    <div className="inner-header">
                        <div className="logo"><a href="/">Explore the World of Music</a></div>
                        <Search className="search" defaultQuery={this.defaults.query} onSearchRequest={this.handleSearchRequestFromUser} fullscreen={this.state.fullscreen} nostretch={false} artist={this.defaults.artist} genre={this.defaults.genre} language={this.defaults.language} years={this.defaults.years}/>
                    </div>
                </header>
                <main className="main">
                    <div className="inner-main">
                        {cards}
                        {this.state.fullscreen || this.state.results.length < this.resultsPerPage || !this.state.results.length ? '' : <Pagination className="pagination" variant="outlined" shape="rounded" page={this.state.page} count={Math.ceil(this.state.results.length / this.resultsPerPage)} onChange={this.handlePaginationChange} />}
                    </div>
                </main>
            </div>
        )
    }
}

export default MainPage
