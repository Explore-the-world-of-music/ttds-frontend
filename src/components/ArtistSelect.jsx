import React from 'react'
import Select, { InputSearch } from '@semcore/ui/select'
import Spin from '@semcore/ui/spin'

import './ArtistSelect.css'

class ArtistSelect extends React.Component {
    constructor (props) {
        super(props)
        this.timer = null
        this.state = { options: [], filter: '', value: this.props?.defaultValue ?? [], loading: false }
        this.handleChange = this.handleChange.bind(this)
        this.sendData = this.sendData.bind(this)
        this.debounceSend = this.debounceSend.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
    }

    handleFilterChange (filter) {
        this.setState({ filter })
        this.debounceSend(filter)
    };

    debounceSend (value) {
        if (!this.timer) {
            this.setState({ loading: true })
            this.timer = setTimeout(() => {
                this.timer = null
                this.sendData(value)
            }, 250)
        }
    };

    sendData (value) {
        fetch(`https://suggestions.semrush.com/?type=domain&q=${value}`)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                let options = json.results.map((item) => ({
                    value: item.value,
                    title: item.value
                }))
                if (!value.length) {
                    options = []
                }
                this.setState({ options, loading: false })
            })
            .catch(console.error)
    };

    componentWillUnmount () {
        this.timer = null
    }

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
