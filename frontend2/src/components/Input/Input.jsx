import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = ({ id, type, ...data }) => (
  <input id={id} type={type} className={styles.input} {...data} />
);

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Input;
