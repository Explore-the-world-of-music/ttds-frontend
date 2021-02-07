import React from 'react'
import Select, { InputSearch } from '@semcore/ui/select'

import './ArtistSelect.css'

const options = [{ value: 'Any' }, ...Array(20)
    .fill('')
    .map((i, idx) => ({
        value: `Option ${idx}`
    }))]

class ArtistSelect extends React.Component {
    constructor (props) {
        super(props)
        this.state = { filter: '', selected: [] }
        this.filteredOptions = options.filter((option) => option.value.toString().toLowerCase().includes(this.state.filter.toLowerCase()))
    }

    render () {
        return (
            <Select className="ArtistSelect" multiselect value={this.state.selected} placeholder="Select value" size="l" defaultValue={this.props.defaultValue} onChange={v => this.setState({ selected: v })}>
                <Select.Trigger className="artistselect-trigger" />
                <Select.Popper>
                    <InputSearch value={this.state.filter} onChange={(filter) => this.setState({ filter })} placeholder="Search" />
                    <Select.List hMax={'10rem'}>
                        {this.filteredOptions.length
                            ? (this.filteredOptions.map(({ value }) => (
                                <Select.OptionCheckbox value={value} key={value}>
                                    {value}
                                </Select.OptionCheckbox>
                            )))
                            : (
                                <Select.OptionHint key="Nothing">Nothing found</Select.OptionHint>
                            )}
                    </Select.List>
                </Select.Popper>
            </Select>
        )
    }
}

export default ArtistSelect
