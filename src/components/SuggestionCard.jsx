import React, { Component } from 'react'
import './SuggestionCard.css'
import { Link } from 'react-router-dom'

class SuggestionCard extends Component {
    render () {
        return (
            <div className="SuggestionCard">
                <Link to={'/song/' + this.props.title}>
                    <div className="suggestion-album-cover">
                        <img src={this.props.picture} alt="Album Cover" />
                    </div>
                    <div className="title">{this.props.title}</div>
                    <div className="author">{this.props.author}</div>
                </Link>
            </div>
        )
    }
}

export default SuggestionCard
