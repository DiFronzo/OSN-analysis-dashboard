import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ id, label, ...data }) => (
  <label htmlFor={id}>
    <p>{label}</p>
    <select id={id} {...data}>
      <option>Worldwide</option>
    </select>
  </label>
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Select;
