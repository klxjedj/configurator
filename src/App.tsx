// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import { Configure } from './components/configuratorView/configurator'
import { Menu } from './components/menu/menu';
import './App.css';

function App() {
  return (
    <div className="App">
      <Configure />
      <Menu />
    </div>
  );
}

export default App;
