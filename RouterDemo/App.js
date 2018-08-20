/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import FootRouter from './src/FootRouter';

export default class App extends Component{
  render() {
    return (
     <FootRouter/>
    );
  }
}

AppRegistry.registerComponent('RouterDemo', ()=> App);
