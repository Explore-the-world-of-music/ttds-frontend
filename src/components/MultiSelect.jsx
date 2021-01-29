import React, { useState } from 'react';
import Select from '@semcore/ui/select';
import { InputSearch } from '@semcore/ui/select';
import "./MultiSelect.css"

const options = Array(20)
  .fill('')
  .map((i, idx) => ({
    value: `Option ${idx}`,
  }));

  export default function MultiSelect() {
  const [filter, setFilter] = useState('');
  const filteredOptions = options.filter((option) => option.value.toString().toLowerCase().includes(filter.toLowerCase()));

  return (
    <Select multiselect placeholder="Select value" size="l">
      <Select.Trigger className="multiselect-trigger"/>
      <Select.Popper>
        <InputSearch value={filter} onChange={setFilter} placeholder="Search" />
        <Select.List hMax={'10rem'}>
          {filteredOptions.length ? (
            filteredOptions.map(({ value }) => (
              <Select.OptionCheckbox value={value} key={value}>
                {value}
              </Select.OptionCheckbox>
            ))
          ) : (
            <Select.OptionHint key="Nothing">Nothing found</Select.OptionHint>
          )}
        </Select.List>
      </Select.Popper>
    </Select>
  );
};

