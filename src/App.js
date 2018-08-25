import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import createAppStore from './lib/store';
import Dashboard from './component/dashboard/dashboard';

import './App.css';

const store = createAppStore();

export default class App extends Component {
  render() {
    return (
      // <h1>sdlkjfs</h1>
      <Provider store ={store}>
        <BrowserRouter>

          <Route exact path='/' component={Dashboard} />

        </BrowserRouter>
      </Provider>
    );
  }
}

