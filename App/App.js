/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry , Text , View} from 'react-native';
import HomePage from './Component/homePage'
export default class App extends Component {
  render() {
    return (
      <HomePage/>
    );
  }
}



AppRegistry.registerComponent('App', () => App);
