import React, { Component } from 'react'
import './MainPage.css'
import Search from './Search'
import ResultCard from './ResultCard'
import Pagination from '@material-ui/lab/Pagination'
import background from '../background.jpg'

class MainPage extends Component {
    constructor (props) {
        super(props)
        this.resultsPerPage = 5
        const queryString = new URLSearchParams(this.props.location.search)
        document.title = 'Explore The World of Music'
        this.defaults = {
            query: queryString.get('query'),
            artist: queryString.get('artists')?.split(',').filter(r => r !== '') ?? [],
            genre: queryString.get('genres')?.split(',').filter(r => r !== '') ?? [],
            language: queryString.get('language')?.split(',').filter(r => r !== '') ?? [],
            phraseSearchByDefault: (queryString.get('phraseSearchByDefault') !== 'false'),
            years: queryString.get('years')?.split(',').filter(r => r !== '')?.map(Number) ?? [1960, 2021]
        }
        this.state = {
            results: [],
            page: (!isNaN(Number(queryString.get('page'))) && Number(queryString.get('page')) != null) ? Number(queryString.get('page')) : 1,
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
        if (data.phraseSearchByDefault) {
            data.newQuery = data.query.replace(/(((?!&)(?!-)[\p{L}0-9.!?\-&,'$£])+([\p{L}0-9. *!?\-&,'$£](?!&&)(?!-))*[\p{L}0-9.!?\-&,'$£]+)(?!(\s*[\p{L}0-9.*!?\-&,'$£]*\s*(\)|\(|")))(?!([\p{L}0-9. *!?\-&,'$£]*"))/ug, ' "$1" ').trim()
        } else {
            data.newQuery = data.query
        }
        data.newQuery = data.newQuery.trim()
        fetch(`/api/songs/search?query=${encodeURIComponent(data.newQuery)}&artists=${encodeURIComponent(data.artist)}&genres=${encodeURIComponent(data.genre)}&language=${encodeURIComponent(data.language)}&years=${data.years}&phraseSearchByDefault=${data.phraseSearchByDefault}`).then(res => res.json()).then((res) => {
            this.setState({ results: res.songs, loading: false, reportedQueryData: data })
            this.props.history.push(`/?query=${encodeURIComponent(data.query)}&page=${this.state.page}&artists=${data.artist.map(x => encodeURIComponent(x))}&genres=${data.genre.map(x => encodeURIComponent(x))}&language=${data.language.map(x => encodeURIComponent(x))}&years=${data.years}&phraseSearchByDefault=${data.phraseSearchByDefault}`)
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
        this.props.history.push(`/?query=${encodeURIComponent(data.query)}&page=${newPage}&artists=${data.artist.map(x => encodeURIComponent(x))}&genres=${data.genre.map(x => encodeURIComponent(x))}&language=${data.language.map(x => encodeURIComponent(x))}&years=${data.years}&phraseSearchByDefault=${data.phraseSearchByDefault}`)
        window.scrollTo(0, 0)
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
                    <ResultCard key={result.id} result={result} />)
            } else {
                cards = <h1 className="empty"> No results </h1>
            }
        }

        return (
            <div className="MainPage" style={{ backgroundImage: `url('${background}')` }}>
                <header className={'header' + (this.state.fullscreen ? ' header-full' : '')}>
                    <div className="inner-header">
                        <div className="logo"><a href="/">Explore the World of Music</a></div>
                        <Search className="search" defaultQuery={this.defaults.query} onSearchRequest={this.handleSearchRequestFromUser} fullscreen={this.state.fullscreen} nostretch={false} artist={this.defaults.artist} genre={this.defaults.genre} language={this.defaults.language} years={this.defaults.years} phraseSearchByDefault={this.defaults.phraseSearchByDefault}/>
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
