import './Search.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // results: {},
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
            if (this.state.query !== "") {
                this.props.onSearchRequest(this.state.query)
            }
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

    render() {
        return (
            <div className="wrapper">
                <div className="search-box-wrapper">
                    <input
                        className="search-box"
                        defaultValue ={this.props.defaultQuery}
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
                    <div className={"advanced-options-content" + (this.state.advOptionsExpanded ? "" : " advanced-options-hidden") + (this.props.fullscreen ? " advanced-options-fullscreen" : "")}>COMING SOON </div>
                </div>
            </div>
        );
    }
}

export default Search;