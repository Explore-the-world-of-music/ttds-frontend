import React, { Component } from 'react';
import './LyricsPage.css';
import Search from './Search';

class LyricsPage extends Component {

    constructor(props) {
        super(props)
        this.redirectRequest = this.redirectRequest.bind(this);
    }

    redirectRequest(query) {
        this.props.history.push({
            pathname: '/',
            state: {
                query: query,
                fullscreen: false,
            }
        })
    }

    render() {
        return (
            <div className="LyricsPage">
                <header className={"header"}>
                    <div className="inner-header">
                        <div className="logo logo-small"><a href="/">McLyrics</a></div>
                        <Search className="search" onSearchRequest={this.redirectRequest} fullscreen={false} />
                    </div>
                </header>
                <main className="main">
                    <div className="inner-main">
                        <h1>{this.props.match.params.id}</h1>
                        <div>
                            We're no strangers to loveYou know the rules and so do I
                            A full commitment's what I'm thinking of
                            You wouldn't get this from any other guy
                            I just wanna tell you how I'm feelingGotta make you understandNever gonna give you up
                            Never gonna let you down
                            Never gonna run around and desert you
                            Never gonna make you cry
                            Never gonna say goodbyeNever gonna tell a lie and hurt you
                            We've known each other for so long
                            Your heart's been aching but
                            You're too shy to say it
                            Inside we both know what's been going onWe know the game and we're gonna play it
                            And if you ask me how I'm feeling
                            Don't tell me you're too blind to see
                            Never gonna give you up
                            Never gonna let you down
                            Never gonna run around and desert youNever gonna make you cry
                            Never gonna say goodbye
                            Never gonna tell a lie and hurt you
                            Never gonna give you up
                            Never gonna let you down
                            Never gonna run around and desert youNever gonna make you cry
                            Never gonna say goodbye
                            Never gonna tell a lie and hurt you
                            (Ooh, give you up)
                            (Ooh, give you up)
                            (Ooh)
                            Never gonna give, never gonna give
                            (Give you up)(Ooh)
                            Never gonna give, never gonna give(Give you up)
                            We've know each other for so long
                            Your heart's been aching but
                            You're too shy to say it
                            Inside we both know what's been going onWe know the game and we're gonna play it
                            I just wanna tell you how I'm feeling
                            Gotta make you understand
                            Never gonna give you upNever gonna let you down
                            Never gonna run around and desert you
                            Never gonna make you cry
                            Never gonna say goodbye
                            Never gonna tell a lie and hurt you
                            Never gonna give you up
                            Never gonna let you down
                            Never gonna run around and desert you
                            Never gonna make you cry
                            Never gonna say goodbye
                            Never gonna tell a lie and hurt you
                            Never gonna give you up
                            Never gonna let you down
                            Never gonna run around and desert you
                            Never gonna make you cry
                            Never gonna say goodbye
                            Never gonna tell a lie and hurt you
                        </div>
                    </div>
                </main>
            </div>

        );
    }
}

export default LyricsPage;