import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import useQueryParams from '../../hooks/useQueryParams';
import getQueryParamString from '../../utils/getQueryParamString';

function Navigation() {
  const { params } = useQueryParams();
  const queryParamString = getQueryParamString(params);

  return (
    <ButtonGroup sx={{ margin: '1em 0' }}>
      <Button LinkComponent={Link} to={`/dashboard${queryParamString}`}>
        Dashboard
      </Button>
      <Button LinkComponent={Link} to={`/table${queryParamString}`}>
        Table
      </Button>
    </ButtonGroup>
  );
}

export default Navigation;
