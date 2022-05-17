import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Search() {
  const [search, setSearch] = useState('');

  const handleChange = (e) => setSearch(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={search}
        onChange={handleChange}
        variant="outlined"
        type="search"
      />
      <Button type="submit" variant="contained">
        Hello
      </Button>
    </form>
  );
}

export default Search;
