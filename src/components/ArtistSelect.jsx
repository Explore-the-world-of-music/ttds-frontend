import React from 'react'
import Select, { InputSearch } from '@semcore/ui/select'
import Spin from '@semcore/ui/spin'

import './ArtistSelect.css'

import AwesomeDebouncePromise from 'awesome-debounce-promise'

const searchAPI = value => fetch(`/api/artists/get_artist?query=${encodeURIComponent(value)}`)
    .then(response => response.json())
    .then(json => {
        let options = json.results.map((item) => ({
            value: item.id,
            title: item.artist
        }))
        if (!value.length) {
            options = []
        }
        return options
    })

const debounce = AwesomeDebouncePromise(searchAPI, 500)

class ArtistSelect extends React.Component {
    constructor (props) {
        super(props)
        this.state = { options: [], filter: '', value: this.props?.defaultValue ?? [], loading: false }
        this.handleChange = this.handleChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    async handleFilterChange (filter) {
        this.setState({ filter })
        const options = await debounce(filter)
        this.setState({ options, loading: false })
    };

    handleChange (value) {
        this.setState({ value })
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
                                    const { value: valueOption, title } = option
                                    return (
                                        <Select.OptionCheckbox value={valueOption} key={idx} className="select-option">
                                            {title}
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
