/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Alert, StatusBar} from 'react-native';
import {SegmentedControl} from 'antd-mobile-rn';

import ShowingMovieList from './showingMovie/ShowingMovieList';
import ComingMovieList from './comingMovie/ComingMovieList';
import {CommonStyle} from '../../config/utils/utils';
import HttpUtils from '../../config/HttpUtils';
import SplashScreen from 'rn-splash-screen';
import {comingMovies, showingMovies} from '../../config/utils/Services';
import NavigationBar from "../../config/NavigationBar";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      showingMovieList:this.props.showingMovieList,
      attentionList:[],
      comingMovieList: [],
      selectedTab:'正在热映',
      isLoading: false,
    }
  }

  onValueChange = (value)=> {
    this.setState({
      selectedTab: value,
    })
  };

  render() {
    return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor='#151C28'
          />
          <View style={styles.navBarStyle}>
            <View style={styles.segmentedControlStyle}>
              <SegmentedControl
                  style={styles.tabStyle}
                  selectedIndex={0}
                  values={['正在热映', '即将上映']}
                  onValueChange={(value) => this.onValueChange(value)}
              />
            </View>
          </View>
          {
            this.state.selectedTab === '正在热映' ?
                <ShowingMovieList showingMovieList={this.props.showingMovieList} /> :
                <ComingMovieList comingMovieList={this.props.comingMovieList} attentionList={this.props.attentionList}/>
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  navBarStyle:{
    height: CommonStyle.navHeight,
    backgroundColor: '#151C28',
  },
  segmentedControlStyle:{
    marginTop: CommonStyle.navStatusBarHeight,
    height: CommonStyle.navContentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabStyle:{
    width:180,
  }
});
