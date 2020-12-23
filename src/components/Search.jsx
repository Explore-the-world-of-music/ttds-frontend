import './Search.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // results: {},
            loading: false,
            query: "",
            advOptionsExpanded: false
        };
    }

    handleInputChange = (_) => {
        this.setState({
            query: this.search.value
        })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.makeSearchRequest()
        }
    }

    handleClear = (_) => {
        this.setState({
            query: ""
        })
        this.search.value = ""
    }

    handleOptionsToggle = () => {
        console.log(this.state.advOptionsExpanded)
        this.setState({
            advOptionsExpanded: !this.state.advOptionsExpanded
        })
    }

    makeSearchRequest = () => {
        if (this.state.query !== "") {
            this.props.onLoadingResults()
            fetch(`https://randomuser.me/api/?results=35&seed=${this.state.query}`, { mode: 'cors' }).then(res => res.json()).then(res => {
                //setTimeout(() => this.props.onResultsReceived(res),100000000)
                this.props.onResultsReceived(res)
            })
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="search-box-wrapper">
                    <input
                        className="search-box"
                        type="text"
                        id="search-input"
                        ref={input => this.search = input}
                        placeholder="Search..."
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleInputChange}
                    />
                    <FontAwesomeIcon icon="search" className="fa-search-icon" onClick={this.makeSearchRequest} />
                    <FontAwesomeIcon icon="times" className="fa-times-icon" onClick={this.handleClear} />

                </div>

                <div className="advanced-options-box">
                    <div className="advanced-options-button" onClick={this.handleOptionsToggle}>Advanced options <FontAwesomeIcon icon="angle-down" className="fa-angle-down-icon" /></div>
                    <div className={"advanced-options-content" + (this.state.advOptionsExpanded ? "" : " options-hidden") }>COMING SOON </div>
                </div>
            </div>
        );
    }
}

export default Search;