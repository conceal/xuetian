/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Router from './src/config/router';

export default class App extends Component {
  render() {
    return (
        <Router/>
    );
  }
}

AppRegistry.registerComponent('Project', ()=> App);
