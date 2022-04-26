import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';
import Label from '../Label';

const AdvancedOptionsMenu = ({ options, onOptionChange }) => (
  <section>
    <Label text="Amount of Tweets:" htmlFor="amount">
      100
      <Input
        id="amount"
        name="amount"
        type="range"
        min={100}
        max={1000}
        value={options.amount}
        onChange={onOptionChange}
      />
      1000
    </Label>
    <p>{options.amount}</p>
    <p>{((options.amount * 0.5) / 60).toFixed(2)} seconds</p>
    <Label text="Region" htmlFor="region">
      <Select
        id="region"
        name="region"
        label="Region"
        value={options.region}
        onChange={onOptionChange}
      />
    </Label>
    <Label text="From" htmlFor="from-time">
      <Input
        id="from-time"
        name="from"
        type="date"
        value={options.from}
        onChange={onOptionChange}
      />
    </Label>
    <Label text="To" htmlFor="to-time">
      <Input
        id="to-time"
        name="to"
        type="date"
        value={options.to}
        onChange={onOptionChange}
      />
    </Label>
  </section>
);

AdvancedOptionsMenu.propTypes = {
  options: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }).isRequired,
  onOptionChange: PropTypes.func.isRequired,
};

export default AdvancedOptionsMenu;
