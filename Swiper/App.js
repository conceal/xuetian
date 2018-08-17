/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View , AppRegistry , Image} from 'react-native';
import Swiper from 'react-native-swiper';
let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
import Guidance from './guidance'
import ARC from './ARC';

export default class App extends Component {
  render() {
    return (
      <Guidance/>
    );
  }
}

const styles = StyleSheet.create({
  
  imageStyle:{
    width:width,
    height:200
  }
})

AppRegistry.registerComponent('Swiper' , ()=> App);