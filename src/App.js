import React from 'react';
import logo from './logo.svg';
import './App.css';
import PageHeader from './PageHeader'

function App() {
  return (
    <div className="App">
      <PageHeader />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
