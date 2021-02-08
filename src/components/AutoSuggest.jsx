import React from 'react'
import Select from '@semcore/ui/select'
import Input from '@semcore/ui/input'
import './AutoSuggest.css'

function setUnderlineWord (searchValue, value) {
    const re = new RegExp(searchValue.toLowerCase(), 'g')
    const title = {
        __html: value
            .toLowerCase()
            .replace(
                re,
                `<span style="text-decoration: underline; padding: 2px 0">${searchValue}</span>`
            )
    }
    return <span dangerouslySetInnerHTML={title} />
}
class AutoSuggest extends React.PureComponent {
    constructor (props) {
        super()
        this.timer = null
        this.state = { value: null, options: [] }
    }

    changeValue (value) {
        this.setState({ value })
    }

    handleChange (value) {
        this.changeValue(value)
        this.debounceSend(value)
    };

    debounceSend (value) {
        if (!this.timer) {
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
                this.setState({ options })
            })
            .catch(console.error)
    };

    componentWillUnmount () {
        this.timer = null
    }

    render () {
        const { value, options } = this.state
        return (
            <Select className="AutoSuggest" interaction="focus" value={value} onChange={this.changeValue} size="l" >
                <Select.Trigger tag={Input} >
                    <Input.Value
                        value={value || ''}
                        placeholder="Type a name"
                        onChange={this.handleChange}
                    />
                </Select.Trigger>
                {options.length > 0 && value && (
                    <Select.Menu>
                        {options.map((option, idx) => {
                            const { value: valueOption, title } = option
                            return (
                                <Select.Option value={valueOption} key={idx} className="select-option">
                                    {setUnderlineWord(value, title)}
                                </Select.Option>
                            )
                        })}
                    </Select.Menu>
                )}
            </Select>
        )
    }
}
export default AutoSuggest
