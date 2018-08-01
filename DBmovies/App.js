/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Navigator from './src/scene/Navigator'

export default class App extends Component {
  render() {
    return (
      <Navigator/>
    );
  }
}

AppRegistry.registerComponent('DBmovies' , ()=> App);

