/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry , StyleSheet, Text, View} from 'react-native';

export default class App extends Component{
  render() {
    return (
      <Text>这是第一个页面</Text>
    );
  }
}

AppRegistry.registerComponent('Navigation' , () => App);