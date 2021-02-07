import React, { Component } from 'react'
import './LyricsPage.css'
import Search from './Search'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import SuggestionCard from './SuggestionCard'
// import {Link} from 'react-router-dom';

class LyricsPage extends Component {
    constructor (props) {
        super(props)
        this.redirectRequest = this.redirectRequest.bind(this)
    }

    redirectRequest (data) {
        this.props.history.push(`/?query=${data.query}&author=${data.author}&genre=${data.genre}&years=${data.years}`)
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

        const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(result =>
            <SuggestionCard key={result} author={'Rick Astley'} title={'Never Gonna Give You Up'} picture="https://images.genius.com/a23b3135f345a510fefe813084192479.600x600x1.jpg"/>)

        return (
            <div className="LyricsPage">
                <header className={'header'}>
                    <div className="inner-header">
                        <div className="logo logo-small"><a href="/">Explore the World of Music</a></div>
                        <Search onSearchRequest={this.redirectRequest} fullscreen={false} nostretch />

                    </div>
                    <div className="header-details">
                        <div className="album-cover">
                            <img src="https://images.genius.com/a23b3135f345a510fefe813084192479.600x600x1.jpg" alt="album cover" />
                        </div>
                        <div className="song-details">
                            <div className="title">{this.props.match.params.id}</div>
                            <div className="author">Rick Astley</div>
                            <div className="album">Whenever You Need Somebody</div>
                            <div className="release-date">1987</div>
                        </div>
                    </div>
                </header>
                <main className="main">
                    <div className="inner-main">
                        <div className="lyrics">
                            {"We're no strangers to love\nYou know the rules and so do I\nA full commitment's what I'm thinking of\nYou wouldn't get this from any other guy\nI just wanna tell you how I'm feeling\nGotta make you understand\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nWe've known each other for so long\nYour heart's been aching but\nYou're too shy to say it\nInside we both know what's been going on\nWe know the game and we're gonna play it\nAnd if you ask me how I'm feeling\nDon't tell me you're too blind to see\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\n(Ooh, give you up)\n(Ooh, give you up)\n(Ooh)\nNever gonna give, never gonna give\n(Give you up)(Ooh)\nNever gonna give, never gonna give(Give you up)\nWe've know each other for so long\nYour heart's been aching but\nYou're too shy to say it\nInside we both know what's been going on\nWe know the game and we're gonna play it\nI just wanna tell you how I'm feeling\nGotta make you understand\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you\nNever gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\nNever gonna make you cry\nNever gonna say goodbye\nNever gonna tell a lie and hurt you"}
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
