import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Header from '../../components/Header/Header';

const StyledMain = styled.main(() => ({
  margin: '0 auto',
  width: '80%',
}));

function MainLayout({ children }) {
  return (
    <>
      <Header title="OSN Dashboard" />
      <StyledMain>{children}</StyledMain>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MainLayout;
