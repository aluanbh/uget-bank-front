import React from "react";
import Select from "../../bootstrap/forms/Select";
import FormGroup from "../../bootstrap/forms/FormGroup";


const SelectYear = ({ value, onChange }) => {
  return (
    <FormGroup id="data" label="Ano da Meta" className="col-md-4 mb-3">
      <Select
        id="example"
        list={[
          {
            text: '2022',
            value: '2022',
          },
          {
            text: '2023',
            value: '2023',
          },
          {
            text: '2024',
            value: '2024',
          },
          {
            text: '2025',
            value: '2025',
          },
          {
            text: '2026',
            value: '2026',
          },
          {
            text: '2027',
            value: '2027',
          },
          {
            text: '2028',
            value: '2028',
          },
          {
            text: '2029',
            value: '2029',
          },
          {
            text: '2030',
            value: '2030',
          },
          {
            text: '2031',
            value: '2031',
          },
          {
            text: '2032',
            value: '2032',
          },
          {
            text: '2033',
            value: '2033',
          },
          {
            text: '2034',
            value: '2034',
          },
          {
            text: '2035',
            value: '2035',
          },
        ]}
        onBlur={function noRefCheck() { }}
        onFocus={function noRefCheck() { }}
        onInput={function noRefCheck() { }}
        onInvalid={function noRefCheck() { }}
        onSelect={function noRefCheck() { }}
        onChange={onChange}
        value={value}
      />
    </FormGroup>
  );
}

export default SelectYear;