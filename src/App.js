import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Form from './Form'
import Complete from './Complete'
import './App.css'

const App = () => {
  const [order, setOrder] = useState([])
  return (
    <div className='App'>
      <h1>Lambda Pizza</h1>
      <Switch>
          <Route path="/pizza/completed">
            <Complete order={order}/>
          </Route>
          <Route path="/pizza">
            <Form order={order} setOrder={setOrder}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
  );
};

export default App;
