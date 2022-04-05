import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './SearchBox.module.css';
import AdvancedOptions from '../AdvancedOptions';

const SearchBox = () => {
  const [search, setSearch] = useState('');
  const [amount, setAmount] = useState('100');
  const [region, setRegion] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setSearch(searchParams.get('query') || '');
    setAmount(searchParams.get('amount') || '100');
    setRegion(searchParams.get('region') || '');
    setFrom(searchParams.get('from') || '');
    setTo(searchParams.get('to') || '');
  }, [setSearch, setAmount, setRegion, setFrom, setTo, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/dashboard?query=${search}&amount=${amount}&region=${region}&from=${from}&to=${to}`,
    );
  };

  const handleChange = (e) => setSearch(e.target.value);

  const toggleAdvancedSettings = () => setShowAdvanced(!showAdvanced);

  return (
    <form onSubmit={handleSearch}>
      <input type="search" value={search} onChange={handleChange} />
      <button type="submit">Search</button>
      <button type="button" onClick={toggleAdvancedSettings}>
        Advanced
      </button>
      {showAdvanced && (
        <AdvancedOptions
          amount={amount}
          setAmount={setAmount}
          region={region}
          setRegion={setRegion}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
        />
      )}
    </form>
  );
};

export default SearchBox;
