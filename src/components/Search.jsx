import './Search.css'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'
import Accordion from '@semcore/ui/accordion'
import { Text } from '@semcore/ui/typography'
import { Flex, Box } from '@semcore/ui/flex-box'
import Button from '@semcore/ui/button'
import ReactTooltip from 'react-tooltip'
import ArtistSelect from './ArtistSelect'
import MultiSelect from './MultiSelect'
import Select from '@semcore/ui/select'
import Input from '@semcore/ui/input'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

const searchAPI = value => fetch(`/api/songs/query_autocomplete?query=${encodeURIComponent(value)}`)
    .then(response => response.json())
    .then(json => json.suggestions)

const debounce = AwesomeDebouncePromise(searchAPI, 250)

function setUnderlineWord (searchValue, value) {
    const title = {
        __html: value
            .toLowerCase()
            .replace(
                searchValue.toLowerCase(),
                `<span style="text-decoration: underline; padding: 2px 0">${searchValue}</span>`
            )
    }
    return <span dangerouslySetInnerHTML={title} />
}

class Search extends Component {
    constructor (props) {
        super(props)
        this.state = {
            query: this.props?.defaultQuery ?? '',
            advOptionsExpanded: false,
            years: this.props.years,
            artist: this.props.artist,
            genre: this.props.genre,
            language: this.props.language,
            valid: true,
            phraseSearchByDefault: this.props.phraseSearchByDefault,
            options: []
        }
        this.pattern = /^((\s*--\s*)?([\p{L}0-9.!?,'\-&$£]+|("(?=.*\w.*)([\p{L}0-9.!?,'\-&$£]+){1}(\s+([\p{L}0-9.!?,'\-&$£]+|\*))*\s*([\p{L}0-9.!?,'\-&$£]+){1}\s*")|(#\d*\([\p{L}0-9.!?,'\-&$£]+\s*(,\s*[\p{L}0-9.!?,'\-&$£]+)*\)))\s*(((\|\|)|(&&))\s*(\s*--\s*)?([\p{L}0-9.!?,'\-&$£]+|("(?=.*\w.*)([\p{L}0-9.!?,'\-&$£]+){1}(\s+([\p{L}0-9.!?,'\-&$£]+|\*))*\s*([\p{L}0-9.!?,'\-&$£]+){1}\s*")|(#\d*\([\p{L}0-9.!?,'\-&$£]+\s*(,\s*[\p{L}0-9.!?,'\-&$£]+)*\)))\s*)*)$|(^([\p{L}0-9.!?,'\-&$£]+\s*)+$)/u
        this.patternPh = /^((\s*--\s*)?([\p{L}0-9.!?,'\-&$£]+|((?=.*\w.*)([\p{L}0-9.!?,'\-&$£]+){1}(\s+([\p{L}0-9.!?,'\-&$£]+|\*))*\s*([\p{L}0-9.!?,'\-&$£]+){1}\s*)|(#\d*\([\p{L}0-9.!?,'\-&$£]+\s*(,\s*[\p{L}0-9.!?,'\-&$£]+)*\)))\s*(((\|\|)|(&&))\s*(\s*--\s*)?([\p{L}0-9.!?,'\-&$£]+|((?=.*\w.*)([\p{L}0-9.!?,'\-&$£]+){1}(\s+([\p{L}0-9.!?,'\-&$£]+|\*))*\s*([\p{L}0-9.!?,'\-&$£]+){1}\s*)|(#\d*\([\p{L}0-9.!?,'\-&$£]+\s*(,\s*[\p{L}0-9.!?,'\-&$£]+)*\)))\s*)*)$|(^([\p{L}0-9.!?,'\-&$£]+\s*)+$)/u
        this.handleYearSlider = this.handleYearSlider.bind(this)
        this.handleGenre = this.handleGenre.bind(this)
        this.handleArtist = this.handleArtist.bind(this)
        this.handleLanguage = this.handleLanguage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDefaultModeChange = this.handleDefaultModeChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.changeValue = this.changeValue.bind(this)
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
    }

    componentWillUnmount () {
        this.setState = (state, callback) => {
        }
    }

    handleClick (type) {
        switch (type) {
        case 'Phrase':
            this.setState({ valid: true, query: '"smells like * spirit" && Nirvana' })
            break
        case 'Logical':
            this.setState({ valid: true, query: 'smells && teen && Nirvana' })
            break
        case 'Proximity':
            this.setState({ valid: true, query: '#15(smells,spirit) && Nirvana' })
            break
        }
        this.input.focus()
    }

    handleArtist (artist) {
        this.setState({ artist })
    }

    handleLanguage (language) {
        this.setState({ language })
    }

    handleGenre (genre) {
        this.setState({ genre })
    }

    handleKeyPress (event) {
        if (event.key === 'Enter' || event.type === 'click') {
            if (this.state.query !== '') {
                // if ((this.pattern.test(this.state.query) && !this.state.phraseSearchByDefault) || (this.patternPh.test(this.state.query) && this.state.phraseSearchByDefault)) {
                if ((this.pattern.test(this.state.query) && !this.state.phraseSearchByDefault) || (this.pattern.test(this.state.query) || (this.patternPh.test(this.state.query) && this.state.phraseSearchByDefault))) {
                    this.setState({ valid: true, options: [] })
                    this.input.blur()
                    this.props.onSearchRequest({ query: this.state.query, artist: this.state.artist, years: this.state.years, genre: this.state.genre, language: this.state.language, phraseSearchByDefault: this.state.phraseSearchByDefault })
                } else {
                    this.setState({ valid: false })
                }
            }
        }
    }

    handleSuggestionClick (event) {
        this.setState({ query: event.target.innerText, valid: true }, this.handleKeyPress.bind(null, event))
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

    handleDefaultModeChange (event) {
        this.setState({ phraseSearchByDefault: event.target.checked, valid: true })
    }

    handleYearSlider (_, newYearRange) {
        this.setState({ years: newYearRange })
    }

    changeValue (query) {
        this.setState({ query, valid: true })
        // this.input.blur()
        // this.input.focus()
    }

    async handleChange (value) {
        this.changeValue(value)
        const list = value.split(' ').filter(n => n)
        const regex = /^([\p{L}0-9'])+$/u
        if (value.trim() !== '' && (regex.test(list[list.length - 1])) && (length < 2 || regex.test(list[list.length - 2]))) {
            const options = await debounce(value)
            this.setState({ options })
        } else {
            this.setState({ options: [] })
        }
    };

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

        const { query, options } = this.state

        return (
            <div className="Search">
                <div className="search-box-wrapper">
                    <Select className="AutoSuggest" interaction="focus" value={query} onChange={this.changeValue} size="l" >
                        <Select.Trigger tag={Input} className={'search-box' + (this.state.valid ? '' : ' error-border')}>
                            <Input.Value
                                aria-label="Search field"
                                value = {this.state.query}
                                type="text"
                                id="search-input"
                                placeholder="Search..."
                                ref={(input) => { this.input = input }}
                                onKeyDown={this.handleKeyPress}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                        </Select.Trigger>
                        {options.length > 0 && query && (
                            <Select.Menu>
                                {options.map((option) => {
                                    return (
                                        <Select.Option value={option} key={option} onClick={this.handleSuggestionClick} className="select-option">
                                            {setUnderlineWord(query, option)}
                                        </Select.Option>
                                    )
                                })}
                            </Select.Menu>
                        )}
                    </Select>

                    <FontAwesomeIcon icon="search" aria-label="Search" className="fa-search-icon" onClick={this.handleKeyPress} />
                    <FontAwesomeIcon icon="times" aria-label="Clear" className="fa-times-icon" onClick={this.handleClear} />
                </div>
                {!this.state.valid ? <div className="error">The query is not valid</div> : ''}
                <div className="queries-row">
                    <Button size="l" use="primary" className="template-button" data-tip data-for="template1" onClick={(e) => this.handleClick('Phrase')}>Phrase Search</Button>
                    <ReactTooltip multiline id='template1' type='dark' effect="solid">
                        <h2>You know a part of the song? </h2>
                        <span>Then use <b>&quot;Your Query&quot;</b> to find exact expressions. <br/>If you do not know single words,<br/> just add <b>*</b> for each word that you don´t know. <br/>For advanced searches you can also combine <br/>the phrase search with a logical search, <br/>for example if you know an additional<br/> word in the song <b>(“Your Query” &amp;&amp; Word)</b>.</span>
                        <h3>Example: &quot;smells like * spirit&quot; &amp;&amp; Nirvana</h3>
                    </ReactTooltip>
                    <Button size="l" use="primary" className="template-button" data-tip data-for="template2" onClick={(e) => this.handleClick('Logical')}>Logical Search</Button>
                    <ReactTooltip multiline id='template2' t1ype='dark' effect="solid">
                        <h2>You know single words or want to exclude results?</h2>
                        <span>Then make use of the various helpers to narrow down the results.<br/> <b>Word 1 &amp;&amp; Word 2</b> means that both words are in the song,<br/> <b>Word 1 || Word 2</b> means that at least one of the words is in the song <br/>and with <b>-- Word 1</b> you allow only songs that do not contain Word 1. <br/>Of course, you can also chain the helpers <b>&amp;&amp;, || and --</b>.</span>
                        <h3>Example:  smells &amp;&amp; teen &amp;&amp; Nirvana</h3>
                    </ReactTooltip>
                    <Button size="l" use="primary" className="template-button" data-tip data-for="template3" onClick={(e) => this.handleClick('Proximity')}>Proximity Search</Button>
                    <ReactTooltip multiline id='template3' type='dark' effect="solid">
                        <h2>You know some words and you can<br/> guess how close they are together?</h2>
                        <span>Then use the proximity search to get the best results. <br/>You can define the maximal word distance between <br/>each two words in your query, if you are unsure just  <br/> make it a little larger. For advanced searches you can  <br/> also combine the proximity search with a logical search, <br/>for example if you know an additional word in the <br/> song <b>(#15(Your, Query) &amp;&amp; Word)</b>.</span>
                        <h3>Example: #15(smells,spirit) &amp;&amp; Nirvana</h3>
                    </ReactTooltip>
                </div>

                <div className={'advanced-options-box' + (this.props.fullscreen === false ? ' advanced-options-no-fullscreen' : ' advanced-options-fullscreen') + (this.props.nostretch === true ? ' advanced-options-no-stretch' : '')}>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Item.Toggle tag={Flex} alignItems="center">
                                <Accordion.Item.Chevron color="stone" mr={2} />
                                <Text>{'Advanced Options'}</Text>
                            </Accordion.Item.Toggle>
                            <Accordion.Item.Collapse>
                                <Box p="0rem 1.3rem" className="option-row-switch">
                                    <Text>Use phrase search for basic queries </Text><FontAwesomeIcon icon="info-circle" aria-label="info" data-tip data-for="info" className="fa-info-circle" /><Switch color="default" checked={this.state.phraseSearchByDefault} onChange={this.handleDefaultModeChange} name="phraseSearchByDefault" inputProps={{ 'aria-label': 'Enable phrase search by default' }} />
                                    <ReactTooltip multiline id="info" type="dark" effect="solid">Search for an exact match<br/> even if your query doesn&apos;t contain <br/>any speechmarks. <br/>(for example, <i>smells &amp;&amp; teen spirit</i>).<br/> If disabled, word frequency (tf-idf) <br/>will be used  for each term instead.</ReactTooltip>
                                </Box>
                                <Box p="0rem 1.3rem" className="option-row">
                                    <span>Artist:</span>
                                    <span>
                                        <ArtistSelect defaultValue={this.state.artist} handler={this.handleArtist}/>
                                    </span>
                                </Box>
                                <Box p="0rem 1.3rem" className="option-row">
                                    <span>Language:</span>
                                    <span>
                                        <MultiSelect method="get_languages" defaultValue={this.state.language} handler={this.handleLanguage}/>
                                    </span>
                                </Box>
                                <Box p="0rem 1.3rem" className="option-row">
                                    <span>Genre:</span>
                                    <span>
                                        <MultiSelect method="get_genres" defaultValue={this.state.genre} handler={this.handleGenre}/>
                                    </span>
                                </Box>
                                <Box p="0rem 1.3rem" className="option-row">
                                    <span>Year range:</span>
                                    <span>
                                        <Slider
                                            value={this.state.years}
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
                        <div className="fix"></div>
                    </Accordion>
                </div>
            </div>
        )
    }
}

Search.defaultProps = {
    query: '',
    years: [1960, 2021],
    artist: [],
    genre: [],
    language: [],
    phraseSearchByDefault: true
}

export default Search
