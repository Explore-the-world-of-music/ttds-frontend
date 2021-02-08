import React, { useState } from 'react'
import Select, { InputSearch } from '@semcore/ui/select'

import './MultiSelect.css'
import { Text } from '@semcore/typography'

const options = Array(20)
    .fill('')
    .map((i, idx) => ({
        value: `Option ${idx}`
    }))

export default function MultiSelect (props) {
    const [filter, setFilter] = useState('')
    const filteredOptions = options.filter((option) => option.value.toString().toLowerCase().includes(filter.toLowerCase()))

    return (
        <Select multiselect placeholder="Select value" defaultValue={props.defaultValue} onChange={props.handler} size="l">
            {(props, handlers) => {
                const {
                    value: currentValue // the current value of the select
                } = props
                const {
                    value // function that controls the internal state of the selected value
                } = handlers
                const handleClick = () => {
                    const newValue = currentValue.length ? [] : options.map(({ value }) => value)
                    value(newValue)
                    return false // cancel the default handler
                }
                return (
                    <React.Fragment>
                        <Select.Trigger className="MultiSelect"/>
                        <Select.Popper>
                            <InputSearch value={filter} onChange={setFilter} placeholder="Search" />
                            <Select.List hMax={'10rem'}>
                                {
                                    filteredOptions.length === options.length
                                        ? (
                                            <Select.Option onClick={handleClick}>
                                                <Text color="denim-blue">{currentValue.length ? 'Deselect all' : 'Select all'}</Text>
                                            </Select.Option>
                                        )
                                        : ''
                                }
                                {filteredOptions.length
                                    ? (
                                        filteredOptions.map(({ value }) => (
                                            <Select.OptionCheckbox value={value} key={value}>
                                                {value}
                                            </Select.OptionCheckbox>
                                        ))

                                    )
                                    : (
                                        <Select.OptionHint key="Nothing">Nothing found</Select.OptionHint>
                                    )}
                            </Select.List>
                        </Select.Popper>
                    </React.Fragment>

                )
            }}
        </Select>
    )
}
