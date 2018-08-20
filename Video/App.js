import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Video from './video';

export default class App extends Component {
  render(){
    return(
        <Video/>
    )
  }
}

AppRegistry.registerComponent('Video', ()=> App);