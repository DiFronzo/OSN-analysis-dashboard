import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [amount, setAmount] = useState(100);
  const [region, setRegion] = useState('Worldwide');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [advanced, setAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (setState) => (e) => setState(e.target.value);
  const toggleAdvancedChange = () => setAdvanced(!advanced);

  return (
    <>
      <header>
        <h1>OSN analysis dashboard</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input type="search" />
          <button type="submit">Search</button>
          <button type="button" onClick={toggleAdvancedChange}>
            Advanced
          </button>
          {advanced && (
            <section>
              <label htmlFor="amount">
                <p>Amount of Tweets</p>
                100
                <input
                  id="amount"
                  name="amount"
                  type="range"
                  min={100}
                  max={1000}
                  value={amount}
                  onChange={handleChange(setAmount)}
                />
                1000
              </label>
              <label htmlFor="region">
                <p>Region</p>
                <select
                  id="region"
                  value={region}
                  onChange={handleChange(setRegion)}>
                  <option>Worldwide</option>
                </select>
              </label>
              <label htmlFor="from-time">
                <p>From</p>
                <input
                  id="from-time"
                  name="from"
                  type="date"
                  value={fromTime}
                  onChange={handleChange(setFromTime)}
                />
              </label>
              <label htmlFor="to-time">
                <p>To</p>
                <input
                  id="to-time"
                  name="to"
                  type="date"
                  value={toTime}
                  onChange={handleChange(setToTime)}
                />
              </label>
            </section>
          )}
        </form>
      </main>
    </>
  );
};

export default App;
