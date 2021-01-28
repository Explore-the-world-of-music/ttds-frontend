import './Search.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Accordion from '@semcore/accordion';
import { Text } from '@semcore/typography';
import { Flex, Box } from '@semcore/flex-box';
import Button from '@semcore/button';

import AutoSuggest from './AutoSuggest'
import ReactTooltip from 'react-tooltip';

import MultiSelect from './MultiSelect'

import styles from './custom.shadow.css';



class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            <div className="search">
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
                
                <div className="queries-row">
                    <Button size="l" use="primary" data-tip data-for="template1" styles={styles}>Template 1</Button>
                    <ReactTooltip id='template1' type='dark'  effect="solid">
                    <h2>Hint 1</h2>
                    <span>Content</span>
                    </ReactTooltip>
                    <Button size="l" use="primary" data-tip data-for="template2" styles={styles}>Template 2</Button>
                    <ReactTooltip id='template2' type='dark' effect="solid">
                    <h2>Hint 2</h2>
                    <span>Content</span>
                    </ReactTooltip>
                    <Button size="l" use="primary" data-tip data-for="template3" styles={styles}>Template 3</Button>
                    <ReactTooltip id='template3' type='dark' effect="solid">
                    <h2>Hint 3</h2>
                    <span>Content</span>
                    </ReactTooltip>
                </div>

                <div className={"advanced-options-box" + (this.props.nostretch === true ? " advanced-options-no-stretch":  "")}>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Item.Toggle tag={Flex} alignItems="center">
                            <Accordion.Item.Chevron color="stone" mr={2} />
                            <Text>{'Advanced Options'}</Text>
                            </Accordion.Item.Toggle>
                            <Accordion.Item.Collapse>
                                
                            <Box p="0rem 1.3rem" className="author-row">
                                <span>Author:</span> 
                                <AutoSuggest/>
                            </Box>
                            <Box p="0rem 1.3rem" className="author-row">
                                <span>Genre:</span> 
                                <MultiSelect/>
                            </Box>

                            </Accordion.Item.Collapse>
                        </Accordion.Item>
                    </Accordion>    
                </div>
            </div>
        );
    }
}

export default Search;