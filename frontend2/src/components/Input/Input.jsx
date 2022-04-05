import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, label, textBefore, textAfter, ...data }) => (
  <label htmlFor={id}>
    <p>{label}</p>
    {textBefore}
    <input id={id} {...data} />
    {textAfter}
  </label>
);

Input.defaultProps = {
  textBefore: '',
  textAfter: '',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  textBefore: PropTypes.string,
  textAfter: PropTypes.string,
};

export default Input;
