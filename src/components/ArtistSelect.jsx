import React from 'react'
import Select, { InputSearch } from '@semcore/ui/select'
import Spin from '@semcore/ui/spin'

import './ArtistSelect.css'

import AwesomeDebouncePromise from 'awesome-debounce-promise'

const searchAPI = value => fetch(`/api/artists/get_artist?query=${encodeURIComponent(value)}`)
    .then(response => response.json())
    .then(json => {
        let options = json.results.map((item) => ({
            label: item.artist
        }))
        if (!value.length) {
            options = []
        }
        return options
    })

const debounce = AwesomeDebouncePromise(searchAPI, 250)

class ArtistSelect extends React.Component {
    constructor (props) {
        super(props)
        this.state = { options: [], mapping: {}, filter: '', value: this.props?.defaultValue ?? [], loading: false }
        this.handleChange = this.handleChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    async handleFilterChange (filter) {
        this.setState({ filter })
        const resp = await debounce(filter)
        const options = resp.map(x => x.label)
        this.setState({ options, loading: false })
    };

    handleChange (value) {
        this.setState({ value })
        if (!(value instanceof Array)) {
            value = [value]
        }
        this.props.handler(value)
    }

    render () {
        return (
            <Select multiselect placeholder="Select value" value={this.state.value} size="l" onChange={this.handleChange}>
                <Select.Trigger className="ArtistSelectSuggest" />
                <Select.Popper>
                    <InputSearch value={this.state.filter} onChange={this.handleFilterChange} placeholder="Search"/>
                    <Select.List hMax={'10rem'}>
                        {(() => {
                            if (this.state.loading) {
                                return (
                                    <Spin centered size="xs" />
                                )
                            } else if (this.state.filter !== '' && this.state.options.length) {
                                return (this.state.options.map((option, idx) => {
                                    return (
                                        <Select.OptionCheckbox value={option} key={idx} className="select-option">
                                            {option}
                                        </Select.OptionCheckbox>
                                    )
                                }))
                            } else if (this.state.filter !== '' && !this.state.options.length) {
                                return (<Select.OptionHint key="Nothing">Nothing found</Select.OptionHint>)
                            } else if (this.state.filter === '' && this.state.value.length) {
                                return (this.state.value.map((value) => (
                                    <Select.OptionCheckbox value={value} key={value}>
                                        {value}
                                    </Select.OptionCheckbox>
                                )))
                            } else if (this.state.filter === '' && !this.state.value.length) {
                                return (<Select.OptionHint key="All">Start typing to search</Select.OptionHint>)
                            }
                        })}
                    </Select.List>
                </Select.Popper>
            </Select>
        )
    }
}
export default ArtistSelect
