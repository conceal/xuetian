/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import ListView from './listView';
import ListView01 from './listView01';

export default class App extends Component {
  render() {
    return (
    <ListView/>
    );
  }
}
AppRegistry.registerComponent('ListViewApp' , ()=> App);
