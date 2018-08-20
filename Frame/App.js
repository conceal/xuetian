/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import RequestAnimationFrameView from './src/requestAnimationFrame/RequestAnimationFrame'
import SimpleAnimated from './src/animated/SimpleAnimated';
import TranslateAnimation from './src/animated/TranslateAnimation';
import InterPolateAnimation from './src/animated/InterPolateAnimation';
import ZuHeAnimation01 from './src/animated/ZuHeAnimation01';
import ScrollAnimation from './src/animated/ScrollAnimation';
import PanAnimation from './src/animated/PanAnimation';

export default class App extends Component {
  render() {
    return (
     <PanAnimation/>
    );
  }
}

AppRegistry.registerComponent('Frame', ()=> App);

