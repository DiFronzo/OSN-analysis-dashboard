import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ text, htmlFor, children }) => (
  <label htmlFor={htmlFor}>
    <p>{text}</p>
    {children}
  </label>
);

Label.propTypes = {
  text: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Label;
