import React, { Component } from 'react'
import './LyricsPage.css'
import Search from './Search'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import SuggestionCard from './SuggestionCard'
import Spin from '@semcore/ui/spin'

/*
"id": result.id,
            "name": result.name,
            "artist": result.artist.name,
            "lyrics": result.lyrics,
            "album": result.album,
            "image": result.artist.image,
            "rating": result.rating,
            "released": result.released,
            "genre": result.genre,
            "bpm": result.bpm,
            "key": result.key,
            "topic_id": result.topic_id,
            "length": result.length,
            "language": result.language
*/

class LyricsPage extends Component {
    constructor (props) {
        super(props)
        this.redirectRequest = this.redirectRequest.bind(this)
        this.state = { isLoaded: false, song: null }
    }

    componentDidMount () {
        const id = this.props.match.params.id
        const mapping = { 0: 'Love', 1: 'Rap', 2: 'Party', 3: 'Lifecycle' }
        fetch(`/api/songs/get_lyrics?id=${id}`).then(res => res.json()).then(res => {
            res.topic_id = mapping[res.topic_id]
            res.length = ~~(res.length / 60) + ':' + res.length % 60 + (res.length % 60 < 10 ? '0' : '')
            this.setState({ isLoaded: true, song: res })
        })
    }

    redirectRequest (data) {
        this.props.history.push(`/?query=${encodeURIComponent(data.query)}&artists=${encodeURIComponent(data.artist)}&genres=${encodeURIComponent(data.genre)}&language=${encodeURIComponent(data.language)}&years=${data.years}&phraseSearchByDefault=${data.phraseSearchByDefault}`)
    }

    render () {
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 900 },
                items: 3
            },
            tablet: {
                breakpoint: { max: 900, min: 464 },
                items: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        }

        const cards = this.state.isLoaded
            ? this.state.song.recommendations.map(rec =>
                <SuggestionCard key={rec.id} id={rec.id} artist={rec.artist} name={rec.name} picture={rec.image}/>)
            : []
        return (
            !this.state.isLoaded
                ? <div className="spinner-wrapper"><Spin centered size="xxl" theme="dark" /></div>
                : <div className="LyricsPage">
                    <header className={'header'}>
                        <div className="inner-header">
                            <div className="logo logo-small"><a href="/">Explore the World of Music</a></div>
                            <Search onSearchRequest={this.redirectRequest} fullscreen={false} nostretch />

                        </div>
                        <div className="header-details">
                            <div className="meta-info">
                                <div className="album-cover">
                                    <img src={this.state.song.image ?? '/album-placeholder.png'} alt="album cover" />
                                </div>
                                <div className="info-container">
                                    {this.state.song.genre ? <div>Genre: {this.state.song.genre}</div> : ''}
                                    {this.state.song.language ? <div>Language: {this.state.song.language}</div> : ''}
                                    {this.state.song.rating ? <div>Rating: {this.state.song.rating}</div> : ''}
                                    {this.state.song.length ? <div>Length: {this.state.song.length}</div> : ''}
                                    {this.state.song.bpm ? <div>BPM: {this.state.song.bpm}</div> : ''}
                                    {this.state.song.topic_id ? <div>Topic: {this.state.song.topic_id}</div> : ''}
                                    {this.state.song.key ? <div>Key: {this.state.song.key}</div> : ''}
                                </div>
                            </div>

                            <div className="song-details">
                                <div className="title">{this.state.song.name}</div>
                                <div className="artist">{this.state.song.artist}</div>
                                {/* <div className="album">{this.state.song.album}</div> */}
                                <div className="release-date">{this.state.song.released}</div>
                                <div className="info-container-small">
                                    {this.state.song.genre ? <div>Genre: {this.state.song.genre}</div> : ''}
                                    {this.state.song.language ? <div>Language: {this.state.song.language}</div> : ''}
                                    {this.state.song.rating ? <div>Rating: {this.state.song.rating}</div> : ''}
                                    {this.state.song.length ? <div>Length: {this.state.song.length}</div> : ''}
                                    {this.state.song.bpm ? <div>BPM: {this.state.song.bpm}</div> : ''}
                                    {this.state.song.topic_id ? <div>Topic: {this.state.song.topic_id}</div> : ''}
                                    {this.state.song.key ? <div>Key: {this.state.song.key}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className="main">
                        <div className="inner-main">
                            <div className="lyrics">
                                {this.state.song.lyrics}
                            </div>
                            <div className="suggestions">
                                <div className="suggestions-title">You might also like:</div>
                                <div className="carousel-wrapper">
                                    <Carousel responsive={responsive} containerClass="carousel-wrapper" item-class="suggestion-card">
                                        {cards}
                                    </Carousel>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>
        )
    }
}

export default LyricsPage
