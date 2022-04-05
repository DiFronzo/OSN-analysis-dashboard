import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import Select from '../Select';

const AdvancedOptions = ({
  amount,
  region,
  from,
  to,
  setAmount,
  setRegion,
  setTo,
  setFrom,
}) => {
  const handleChange = (setValue) => (e) => setValue(e.target.value);

  return (
    <section>
      <Input
        id="amount"
        label="Amount of Tweets"
        textBefore="100"
        textAfter="1000"
        name="amount"
        type="range"
        min={100}
        max={1000}
        value={amount}
        onChange={handleChange(setAmount)}
      />
      <Select
        id="region"
        label="Region"
        value={region}
        onChange={handleChange(setRegion)}
      />
      <Input
        id="from-time"
        label="From"
        name="from"
        type="date"
        value={from}
        onChange={handleChange(setFrom)}
      />
      <Input
        id="to-time"
        label="To"
        name="to"
        type="date"
        value={to}
        onChange={handleChange(setTo)}
      />
    </section>
  );
};

AdvancedOptions.propTypes = {
  amount: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  setAmount: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
  setTo: PropTypes.func.isRequired,
  setFrom: PropTypes.func.isRequired,
};

export default AdvancedOptions;
