import React, { Component } from 'react'
import './SuggestionCard.css'

class SuggestionCard extends Component {
    render () {
        return (
            <div className="SuggestionCard">
                <a href={'/song/' + this.props.id}>
                    <div className="suggestion-album-cover">
                        <img src={this.props.picture ?? '/album-placeholder.png'} alt="Album Cover" />
                    </div>
                    <div className="title">{this.props.name}</div>
                    <div className="artist">{this.props.artist}</div>
                </a>
            </div>
        )
    }
}

export default SuggestionCard
