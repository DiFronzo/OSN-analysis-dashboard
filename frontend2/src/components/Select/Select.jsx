import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.css';

const Select = ({ id, ...data }) => (
  <select id={id} className={styles.select} {...data}>
    <option>Worldwide</option>
  </select>
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Select;
