/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import Page3 from './src/page3';
import Page4 from './src/page4';
import Navigator from './src/Navigator'

export default class App extends Component {
  render() {
    return (
      <Navigator/>
    );
  }
}

AppRegistry.registerComponent('Demo' , ()=> App);
