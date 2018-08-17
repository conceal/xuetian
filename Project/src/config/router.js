/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Home from './HomeTabs';

export default class Routers extends Component {
  render() {
    return (
        <Router>
          <Scene key='root'>
            <Scene key='Home' component={Home} initial={true} hideNavBar/>
          </Scene>
        </Router>
    );
  }
}
