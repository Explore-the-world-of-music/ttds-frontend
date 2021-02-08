import React, { Component } from 'react'
import './MainPage.css'
import Search from './Search'
import ResultCard from './ResultCard'
import Pagination from '@material-ui/lab/Pagination'

class MainPage extends Component {
    constructor (props) {
        super(props)
        this.resultsPerPage = 10
        const queryString = new URLSearchParams(this.props.location.search)
        this.defaults = {
            query: queryString.get('query'),
            author: queryString.get('author')?.split(',').filter(r => r !== ''),
            genre: queryString.get('genre')?.split(',').filter(r => r !== ''),
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
    }

    componentDidMount () {
        if (this.state.queryUrlData.query !== null) {
            this.handleSearchRequest(this.defaults)
        }
    }

    processResults (res) {
        return res.results.map((x) => {
            const data = { name: x.name.first + ' ' + x.name.last, city: x.location.city, state: x.location.state, picture: x.picture.large }
            return data
        })
    }

    handleSearchRequest (data) {
        this.setState({ loading: true, fullscreen: false })

        fetch(`https://randomuser.me/api/?results=35&seed=${data.query}`).then(res => res.json()).then((res) => {
            // setTimeout(() => {}},100000000)
            this.setState({ results: this.processResults(res), loading: false, reportedQueryData: data })
            this.props.history.push(`/?query=${encodeURIComponent(data.query)}&page=${this.state.page}&author=${data.author.map(x => encodeURIComponent(x))}&genre=${data.genre.map(x => encodeURIComponent(x))}&years=${data.years}`)
        })
    }

    handlePaginationChange (_, newPage) {
        this.setState({ page: newPage })
        const data = this.state.reportedQueryData
        this.props.history.push(`/?query=${encodeURIComponent(data.query)}&page=${this.state.page}&author=${data.author.map(x => encodeURIComponent(x))}&genre=${data.genre.map(x => encodeURIComponent(x))}&years=${data.years}`)
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.location !== this.props.location) {
            console.log(prevState)
        }
    }

    render () {
        let cards
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
                <header className={'header' + (this.state.fullscreen ? ' header-full' : '')}>
                    <div className="inner-header">
                        <div className="logo"><a href="/">Explore the World of Music</a></div>
                        <Search className="search" defaultQuery={this.defaults.query} onSearchRequest={this.handleSearchRequest} fullscreen={this.state.fullscreen} nostretch={this.state.fullscreen} author={this.defaults.author} genre={this.defaults.genre} years={this.defaults.years}/>
                    </div>
                </header>
                <main className="main">
                    <div className="inner-main">
                        {cards}
                        {this.state.fullscreen || this.state.results.length < this.resultsPerPage ? '' : <Pagination className="pagination" variant="outlined" shape="rounded" count={Math.ceil(this.state.results.length / this.resultsPerPage)} onChange={this.handlePaginationChange} />}
                    </div>
                </main>
            </div>
        )
    }
}

export default MainPage
