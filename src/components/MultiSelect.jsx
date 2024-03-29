import React, { useState, useEffect } from 'react'
import Select, { InputSearch } from '@semcore/ui/select'

import './MultiSelect.css'
import { Text } from '@semcore/typography'
import Spin from '@semcore/ui/spin'

export default function MultiSelect (props) {
    const [filter, setFilter] = useState('')
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState([])
    const filteredOptions = options.filter((option) => option.toString().toLowerCase().includes(filter.toLowerCase()))
    const [translationMap, setTranslationMap] = useState({})

    useEffect(() => {
        setLoading(true)
        fetch(`/api/songs/${props.method}`).then(res => res.json()).then((res) => {
            if (props.method === 'get_languages' && Intl.DisplayNames !== undefined) {
                const languageNames = new Intl.DisplayNames(['en'], { type: 'language' })
                const converted = res.response.map(x => languageNames.of(x))
                setTranslationMap(Object.fromEntries(converted.map((_, i) => [converted[i], res.response[i]])))
                console.log(translationMap)
                res.response = converted
            }
            setOptions(res.response)
            setLoading(false)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    function handlerWrapper (value) {
        if (props.method === 'get_languages' && Intl.DisplayNames !== undefined) {
            console.log(translationMap)
            value = value.map(x => translationMap[x])
        }
        props.handler(value)
    }

    return (
        <Select multiselect placeholder="Select value" defaultValue={props.defaultValue} onChange={handlerWrapper} size="l">
            {(props, handlers) => {
                const {
                    value: currentValue // the current value of the select
                } = props
                const {
                    value // function that controls the internal state of the selected value
                } = handlers
                const handleClick = () => {
                    const newValue = currentValue.length ? [] : options
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
                                        filteredOptions.map((value) => (
                                            <Select.OptionCheckbox value={value} key={value}>
                                                {value}
                                            </Select.OptionCheckbox>
                                        ))

                                    )
                                    : (
                                        loading ? <Spin centered size="xs" /> : <Select.OptionHint key="Nothing">Nothing found</Select.OptionHint>
                                    )}
                            </Select.List>
                        </Select.Popper>
                    </React.Fragment>

                )
            }}
        </Select>
    )
}
