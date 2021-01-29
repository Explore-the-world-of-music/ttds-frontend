import React, { useState } from 'react';
import Select from '@semcore/ui/select';
import { InputSearch } from '@semcore/ui/select';
import "./ArtistSelect.css"

const options = Array(20)
  .fill('')
  .map((i, idx) => ({
    value: `Option ${idx}`,
  }));

  export default function ArtistSelect() {
  const [filter, setFilter] = useState('');
  const filteredOptions = options.filter((option) => option.value.toString().toLowerCase().includes(filter.toLowerCase()));

  return (
    <Select placeholder="Select value" size="l">
      <Select.Trigger className="artistselect-trigger"/>
      <Select.Popper>
        <InputSearch value={filter} onChange={setFilter} placeholder="Search" />
        <Select.List hMax={'10rem'}>
          {filteredOptions.length ? (
            filteredOptions.map(({ value }) => (
              <Select.Option value={value} key={value}>
                {value}
              </Select.Option>
            ))
          ) : (
            <Select.OptionHint key="Nothing">Nothing found</Select.OptionHint>
          )}
        </Select.List>
      </Select.Popper>
    </Select>
  );
};

