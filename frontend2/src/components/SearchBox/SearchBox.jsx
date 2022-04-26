import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './SearchBox.module.css';
import AdvancedOptionsMenu from '../AdvancedOptionsMenu';
import Button from '../Button';
import Input from '../Input';

const SearchBox = () => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState({
    amount: '100',
    region: '',
    from: '',
    to: '',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setSearch(searchParams.get('query') || '');
    setOptions({
      amount: searchParams.get('amount') || '100',
      region: searchParams.get('region') || '',
      from: searchParams.get('from') || '',
      to: searchParams.get('to') || '',
    });
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    let path = `/dashboard?query=${search}`;
    if (showAdvanced) {
      path = `${path}&amount=${options.amount}&region=${options.region}&from=${options.from}&to=${options.to}`;
    }
    navigate(path);
  };

  const handleChange = (e) => setSearch(e.target.value);

  const handleOptionChange = (e) =>
    setOptions({ ...options, [e.target.name]: e.target.value });

  const toggleAdvancedSettings = () => setShowAdvanced(!showAdvanced);

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      <Input
        id="search"
        type="search"
        placeholder="Search..."
        value={search}
        onChange={handleChange}
      />
      <Button submit>Search</Button>
      <Button onClick={toggleAdvancedSettings}>Advanced</Button>
      {showAdvanced && (
        <AdvancedOptionsMenu
          options={options}
          onOptionChange={handleOptionChange}
        />
      )}
    </form>
  );
};

export default SearchBox;
