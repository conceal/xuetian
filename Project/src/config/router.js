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
import MovieDetails from '../screens/HomeScreen/movie/MovieDetails';
import PlayMovieList from '../screens/HomeScreen/movie/PlaymovieList'
import ActorList from '../screens/HomeScreen/movie/ActorList'
import MiniCommentList from '../screens/HomeScreen/movie/comment/MiniCommentList';
import PlusCommentList from '../screens/HomeScreen/movie/comment/PlusCommentList'
import StagePicture from '../screens/HomeScreen/movie/comment/StagePicture';

export default class Routers extends Component {
  render() {
    return (
        <Router>
          <Scene key='root'>
            <Scene key='Home' component={Home} initial={true} hideNavBar/>
            <Scene key='MovieDetails' component={MovieDetails} hideNavBar/>
            <Scene key='PlayMovieList' component={PlayMovieList} title="预告片&拍摄花絮" navigationBarStyle={{backgroundColor:'#151C28'}}/>
            <Scene key='ActorList' component={ActorList} title="演员" navigationBarStyle={{backgroundColor:'#151C28'}}/>
            <Scene key='ActorList' component={MiniCommentList} title="短评" navigationBarStyle={{backgroundColor:'#151C28'}}/>
            <Scene key='ActorList' component={PlusCommentList} hideNavBar/>
            <Scene key='StagePicture' component={StagePicture} hideNavBar/>
          </Scene>
        </Router>
    );
  }
}
