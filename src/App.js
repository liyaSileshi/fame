import Editor from './editor';
import React, { Component } from 'react';
import './App.css';
import ImgDrop from './ImgDrop'
import PageHeader from './PageHeader'

function App() {

  return (
    <div className="App">
      <header className="App-header">
      {/* <ImgDrop /> */}
      <PageHeader />
      <Editor />
      </header>
    </div>
  );
}

export default App;




