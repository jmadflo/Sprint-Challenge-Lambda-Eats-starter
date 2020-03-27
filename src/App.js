import React from "react";
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Form from './Form'
import './App.css'

const App = () => {
  return (
    <div className='App'>
      <h1>Lambda Pizza</h1>
      <Switch>
          <Route path="/pizza">
            <Form />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
  );
};

export default App;
