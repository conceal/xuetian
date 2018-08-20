/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Navigator from './Navigation/Navigator';


export default class App extends Component{
  render() {
     return(
       <Navigator/>
     )
  }
}
AppRegistry.registerComponent('NavigationApp', () => App);
