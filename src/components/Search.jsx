import './Search.css'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from '@material-ui/core/Slider'
import Accordion from '@semcore/ui/accordion'
import { Text } from '@semcore/ui/typography'
import { Flex, Box } from '@semcore/ui/flex-box'
import Button from '@semcore/ui/button'
import ReactTooltip from 'react-tooltip'
import ArtistSelect from './ArtistSelect'
import MultiSelect from './MultiSelect'

class Search extends Component {
    constructor (props) {
        super(props)
        this.state = {
            query: this.props?.defaultQuery ?? '',
            advOptionsExpanded: false,
            years: this.props.years,
            author: this.props.author,
            genre: this.props.genre
        }
        this.handleYearSlider = this.handleYearSlider.bind(this)
        this.handleGenre = this.handleGenre.bind(this)
        this.handleArtist = this.handleArtist.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleClick (type) {
        switch (type) {
        case 'Phrase':
            this.setState({ query: 'Ups I did * again' })
            break
        case 'Logical':
            this.setState({ query: 'Ups && did &&|| heart' })
            break
        case 'Proximity':
            this.setState({ query: '#15(Ups,again)' })
            break
        }
        this.input.focus()
    }

    handleArtist (x) {
        this.setState({ author: x })
    }

    handleGenre (x) {
        this.setState({ genre: x })
    }

    handleInputChange (event) {
        this.setState({ query: event.target.value })
    }

    handleKeyPress (event) {
        console.log(event)
        if (event.key === 'Enter' || event.type === 'click') {
            if (this.state.query !== '') {
                this.props.onSearchRequest({ query: this.state.query, author: this.state.author, years: this.state.years, genre: this.state.genre })
            }
        }
    }

    handleClear (_) {
        this.setState({
            query: ''
        })
    }

    handleOptionsToggle () {
        this.setState({
            advOptionsExpanded: !this.state.advOptionsExpanded
        })
    }

    handleYearSlider (_, newYearRange) {
        this.setState({ years: newYearRange })
    }

    render () {
        const marks = [
            {
                value: 1960,
                label: '1960'
            },
            {
                value: 2021,
                label: '2021'
            }]

        return (
            <div className="Search">
                <div className="search-box-wrapper">
                    <input
                        aria-label="Search field"
                        className="search-box"
                        value = {this.state.query}
                        type="text"
                        id="search-input"
                        placeholder="Search..."
                        ref={(input) => { this.input = input }}
                        onKeyPress={this.handleKeyPress}
                        onChange={this.handleInputChange}
                    />
                    <FontAwesomeIcon icon="search" aria-label="Search" className="fa-search-icon" onClick={this.handleKeyPress} />
                    <FontAwesomeIcon icon="times" aria-label="Clear" className="fa-times-icon" onClick={this.handleClear} />
                </div>

                <div className="queries-row">
                    <Button size="l" use="primary" className="template-button" data-tip data-for="template1" onClick={(e) => this.handleClick('Phrase')}>Phrase Search</Button>
                    <ReactTooltip multiline id='template1' type='dark' effect="solid">
                        <h2>You know a part of the song? </h2>
                        <span>Then use <b>“Your Query”</b> to find exact expressions. <br/>If you do not know single words,<br/> just add <b>*</b> for each word that you don´t know. <br/>For advanced searches you can also combine <br/>the phrase search with a logical search, <br/>for example if you know an additional<br/> word in the song <b>(“Your Query” &amp;&amp; Word)</b>.</span>
                        <h3>Example: “Ups I did * again”</h3>
                    </ReactTooltip>
                    <Button size="l" use="primary" className="template-button" data-tip data-for="template2" onClick={(e) => this.handleClick('Logical')}>Logical Search</Button>
                    <ReactTooltip multiline id='template2' type='dark' effect="solid">
                        <h2>You know single words or want to exclude results?</h2>
                        <span>Then make use of the various helpers to narrow down the results.<br/> <b>Word 1 &amp;&amp; Word 2</b> means that both words are in the song,<br/> <b>Word 1 || Word 2</b> means that at least one of the words is in the song <br/>and with <b>-- Word 1</b> you allow only songs that do not contain Word 1. <br/>Of course, you can also chain the helpers <b>&amp;&amp;, || and --</b>.</span>
                        <h3>Example: “Ups &amp;&amp; did &amp;&amp;|| heart”</h3>
                    </ReactTooltip>
                    <Button size="l" use="primary" className="template-button" data-tip data-for="template3" onClick={(e) => this.handleClick('Proximity')}>Proximity Search</Button>
                    <ReactTooltip multiline id='template3' type='dark' effect="solid">
                        <h2>You know some words and you can<br/> guess how close they are together?</h2>
                        <span>Then use the proximity search to get the best results. <br/>You can define the maximal word distance between <br/>each two words in your query, if you are unsure just  <br/> make it a little larger. For advanced searches you can  <br/> also combine the proximity search with a logical search, <br/>for example if you know an additional word in the <br/> song <b>(#15(Your, Query) &amp;&amp; Word)</b>.</span>
                        <h3>Example: #15(Ups,again)</h3>
                    </ReactTooltip>
                </div>

                <div className={'advanced-options-box' + (this.props.fullscreen === false ? ' advanced-options-no-fullscreen' : '') + (this.props.nostretch === true ? ' advanced-options-no-stretch' : '')}>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Item.Toggle tag={Flex} alignItems="center">
                                <Accordion.Item.Chevron color="stone" mr={2} />
                                <Text>{'Advanced Options'}</Text>
                            </Accordion.Item.Toggle>
                            <Accordion.Item.Collapse>

                                <Box p="0rem 1.3rem" className="option-row">
                                    <span>Author:</span>
                                    <span>
                                        <ArtistSelect defaultValue={this.props.author} handler={this.handleArtist}/>
                                    </span>
                                </Box>
                                <Box p="0rem 1.3rem" className="option-row">
                                    <span>Genre:</span>
                                    <span>
                                        <MultiSelect defaultValue={this.props.genre} handler={this.handleGenre}/>
                                    </span>
                                </Box>
                                <Box p="0rem 1.3rem" className="option-row">
                                    <span>Year range:</span>
                                    <span>
                                        <Slider
                                            defaultValue={this.props.years}
                                            onChange={this.handleYearSlider}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="range-slider"
                                            getAriaValueText={(value) => value}
                                            step={1}
                                            marks={marks}
                                            min={1960}
                                            max={2021}
                                        />
                                    </span>
                                </Box>

                            </Accordion.Item.Collapse>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
        )
    }
}

Search.defaultProps = {
    query: '',
    years: [1960, 2021],
    author: [],
    genre: []
}

export default Search
