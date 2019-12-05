import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import PersonList from './components/PersonList';

function App() {
  return (
    <div className="App">
        <Route path="/" exact component={PersonList} />
    </div>
  );
}

export default App;
