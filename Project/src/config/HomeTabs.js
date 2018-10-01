/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon0 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/FontAwesome'

import Movie from '../screens/movie/Movie';
import Music from '../screens/music/Music';
import Picture from '../screens/picture/Picture';
import Read from '../screens/newRead/Read';
import Mine from '../screens/mine/Mine';
import {CommonStyle} from './utils/utils';
import ComingMovieList from "../screens/movie/comingMovie/ComingMovieList";

export default class HomeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:'movie',
    }
  }

  render() {
    return (
        <TabNavigator style={styles.container}>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'movie'}
              title="电影"
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={() => <Icon0 name="movie-roll" size={25} color={CommonStyle.textGrayColor}/>}
              renderSelectedIcon={() => <Icon0 name="movie-roll" size={28} color="#00BFFF"/>}
              onPress={()=> this.setState({selectedTab:'movie'})}
          >
            <Movie showingMovieList={this.props.showingMovieList} comingMovieList={this.props.comingMovieList} attentionList={this.props.attentionList}/>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'music'}
              title="音乐"
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={() => <Icon0 name="music-circle" size={25} color={CommonStyle.textGrayColor}/>}
              renderSelectedIcon={() => <Icon0 name="music-circle" size={28} color="#00BFFF"/>}
              onPress={()=> this.setState({selectedTab:'music'})}
          >
            <Music/>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'picture'}
              title="图文"
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={() => <Icon1 name="photo-filter" size={25} color={CommonStyle.textGrayColor}/>}
              renderSelectedIcon={() => <Icon1 name="photo-filter" size={28} color="#00BFFF"/>}
              onPress={()=> this.setState({selectedTab:'picture'})}
          >
            <Picture/>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'read'}
              title="阅读"
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={() => <Icon2 name="unread" size={25} color={CommonStyle.textGrayColor}/>}
              renderSelectedIcon={() => <Icon2 name="unread" size={28} color="#00BFFF"/>}
              onPress={()=> this.setState({selectedTab:'read'})}
          >
            <Read/>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'me'}
              title="我的"
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={() => <Icon3 name="user" size={25} color={CommonStyle.textGrayColor}/>}
              renderSelectedIcon={() => <Icon3 name="user" size={28} color="#00BFFF"/>}
              onPress={()=> this.setState({selectedTab:'me'})}
          >
            <Mine/>
          </TabNavigator.Item>
        </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FAFF',
  },
  titleStyle:{
    color:'gray'
  },
  selectedTitleStyle:{
    color:'black'
  },
});
