/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry , StyleSheet, Text, View} from 'react-native';
import TabBar from './TabNavigator/TabBar';
import MyNavigation from './MyNavigation';

export default class App extends Component{
  render() {
    return (
      <MyNavigation/>
    );
  }
}

AppRegistry.registerComponent('Navigation' , () => App);