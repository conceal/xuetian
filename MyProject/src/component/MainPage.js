/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, {Component} from 'react';
import {StyleSheet, Text, View , Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import AsyncStoragePage from './AsyncStoragePage';
import MyPage from './MyPage';

export default class MainPage extends Component{
  constructor(props) {
    super(props);
    this.state={
      selectedTab:'Home',
    }
  }
  render() {
    return (
        <View style={styles.container}>
          <TabNavigator>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Home'}
                title='微信'
                selectedTitleStyle={{color:'#2196F3'}}
                renderIcon={() => <Image source={require('../image/image01.png')} style={styles.iconStyle  }/>}
                renderSelectedIcon={() => <Image source={require('../image/image01.png')} style={styles.iconSelectedStyle}/>}
                onPress={() => this.setState({selectedTab:'Home'})}
            >
              <PopularPage/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'friend'}
                title='朋友圈'
                selectedTitleStyle={{color:'red'}}
                renderIcon={() => <Image source={require('../image/image02.png')} style={styles.iconStyle}/>}
                renderSelectedIcon={() => <Image source={require('../image/image02.png')} style={styles.iconSelectedStyle}/>}
                onPress={() => this.setState({selectedTab:'friend'})}
            >
              <AsyncStoragePage/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'QQ'}
                title='QQ'
                selectedTitleStyle={{color:'red'}}
                renderIcon={() => <Image source={require('../image/image03.png')} style={styles.iconStyle}/>}
                renderSelectedIcon={() => <Image source={require('../image/image03.png')} style={styles.iconSelectedStyle}/>}
                onPress={() => this.setState({selectedTab:'QQ'})}
            >
              <View style={styles.iconStyle}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'QQPlace'}
                title='QQ空间'
                selectedTitleStyle={{color:'red'}}
                renderIcon={() => <Image source={require('../image/image04.png')} style={styles.iconStyle}/>}
                renderSelectedIcon={() => <Image source={require('../image/image04.png')} style={styles.iconSelectedStyle}/>}
                onPress={() => this.setState({selectedTab:'QQPlace'})}
            >
              <MyPage {...this.props}/>
            </TabNavigator.Item>
          </TabNavigator>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle:{
    height:30,
    width:30,
    borderRadius:15,
  },
  iconSelectedStyle:{
    height:30,
    width:30,
    borderRadius:15,
  },
  PageStyle:{
    backgroundColor:'red',
  }
});