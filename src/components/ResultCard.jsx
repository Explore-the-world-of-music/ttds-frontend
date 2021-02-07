import React, { Component } from 'react'
import './ResultCard.css'

class ResultCard extends Component {
    render () {
        return (
            <div className="ResultCard">
                <div className="top">
                    <div className="title">{this.props.result.name}</div>

                    <div className="author">{this.props.result.state}</div>
                </div>
                <div className="bottom">
                    <div className="left">
                        <div className="lyrics">{(((this.props.result.city + ' ').repeat(3) + '\n').repeat(4) + '\n').repeat(2)}</div>
                    </div>
                    <div className="right">
                        <div className="album-cover">
                            <img src={this.props.result.picture} alt="Album Cover" />
                        </div>
                    </div>
                </div>
                <div className="button-lyrics"><a href={'/song/' + this.props.result.name}><button>Full Lyrics</button></a></div>
            </div>
        )
    }
}

export default ResultCard
