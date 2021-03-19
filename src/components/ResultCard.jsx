import React, { Component } from 'react'
import './ResultCard.css'

class ResultCard extends Component {
    render () {
        return (
            <div className="ResultCard">
                <div className="top">
                    <div className="title">{this.props.result.name}</div>
                </div>
                <div className="bottom">
                    <div className="left">
                        <div className="artist">{this.props.result.artist}</div>
                        <div className="lyrics">{this.props.result.lyrics}</div>
                    </div>
                    <div className="right">
                        <div className="album-cover">
                            <img src={this.props.result?.image ?? '/album-placeholder.png'} alt="Album Cover" />
                        </div>
                    </div>
                </div>
                <div className="button-lyrics"><a href={'/song/' + this.props.result.id}><button>Full Lyrics</button></a></div>
            </div>
        )
    }
}

export default ResultCard
