import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ submit, children, ...attr }) => (
  <button
    type={submit ? 'submit' : 'button'}
    className={`${styles.btn}${submit ? ` ${styles.submit}` : ''}`}
    {...attr}>
    {children}
  </button>
);

Button.defaultProps = {
  submit: false,
};

Button.propTypes = {
  submit: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Button;
