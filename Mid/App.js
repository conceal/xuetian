/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import Router from './pages/Router';

export default class App extends Component{
  render() {
    return (
        <Router/>
    );
  }
}

AppRegistry.registerComponent('Demo', ()=> App);
