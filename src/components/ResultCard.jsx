import React, { Component } from 'react'
import './ResultCard.css'

class ResultCard extends Component {
    createLyrics () {
        return { __html: this.props.result.lyrics }
    }

    render () {
        return (
            <div className="ResultCard">
                <div className="top">
                    <div className="title">{`${this.props.result.name} (${this.props.result.released})` }</div>
                </div>
                <div className="bottom">
                    <div className="left">
                        <div className="artist">{this.props.result.artist}</div>
                        <div className="lyrics" dangerouslySetInnerHTML={this.createLyrics()}/>
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
