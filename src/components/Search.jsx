import './Search.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Slider from "@material-ui/core/Slider";


import Accordion from '@semcore/ui/accordion';
import { Text } from '@semcore/ui/typography';
import { Flex, Box } from '@semcore/ui/flex-box';
import Button from '@semcore/ui/button';

//import AutoSuggest from './AutoSuggest'
import ReactTooltip from 'react-tooltip';

import ArtistSelect from './ArtistSelect'
import MultiSelect from './MultiSelect'


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            advOptionsExpanded: false,
            yearRange: [1960, 2021],
        };
        this.handleYearSlider = this.handleYearSlider.bind(this)
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

    handleYearSlider = (_, newYearRange) => {
        this.setState({yearRange: newYearRange})
    }

    render() {
        const marks = [
            {
              value: 1960,
              label: '1960',
            },
            {
              value: 2021,
              label: '2021',
            }]

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
                    <Button size="l" use="primary" className="template-button" data-tip data-for="template1">Template 1</Button>
                    <ReactTooltip id='template1' type='dark'  effect="solid">
                    <h2>Hint 1</h2>
                    <span>Content</span>
                    </ReactTooltip>
                    <Button size="l" use="primary" className="template-button" data-tip data-for="template2">Template 2</Button>
                    <ReactTooltip id='template2' type='dark' effect="solid">
                    <h2>Hint 2</h2>
                    <span>Content</span>
                    </ReactTooltip>
                    <Button size="l" use="primary" className="template-button" data-tip data-for="template3">Template 3</Button>
                    <ReactTooltip id='template3' type='dark' effect="solid">
                    <h2>Hint 3</h2>
                    <span>Content</span>
                    </ReactTooltip>
                </div>

                <div className={"advanced-options-box" + (this.props.fullscreen === false ? " advanced-options-no-fullscreen":  "") + (this.props.nostretch === true ? " advanced-options-no-stretch":  "")}>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Item.Toggle tag={Flex} alignItems="center">
                            <Accordion.Item.Chevron color="stone" mr={2} />
                            <Text>{'Advanced Options'}</Text>
                            </Accordion.Item.Toggle>
                            <Accordion.Item.Collapse>
                                
                            <Box p="0rem 1.3rem" className="option-row">
                                <span>Author:</span> 
                                <ArtistSelect/>
                            </Box>
                            <Box p="0rem 1.3rem" className="option-row">
                                <span>Genre:</span> 
                                <MultiSelect/>
                            </Box>
                            <Box p="0rem 1.3rem" className="option-row">
                                <span>Year range:</span> 
                                <Slider
                                    value={this.state.yearRange}
                                    onChange={this.handleYearSlider}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={(value) => value}
                                    step={1}
                                    marks={marks}
                                    min={1960}
                                    max={2021}
                                />
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