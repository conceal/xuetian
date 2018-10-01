/**
 *
 */

import React, { Component } from 'react';
import {StyleSheet, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import EarnPage from '../earnPage/EarnPage';
import LendPage from '../lendPage/LendPage';
import MyPage from '../myPage/MyPage';

export default class HomeTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:'LendPage'
    }
  }

  render() {
    return (
        <TabNavigator style={styles.container}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'LendPage'}
            title= '借钱'
            titleStyle={styles.titleStyle}
            selectedTitleStyle={styles.selectedTitleStyle}
            renderIcon={()=><Image style={styles.image}
                                   source={require('../../res/images/jieqian.png')}/>}
            renderSelectedIcon={()=><Image style={[styles.image]}
                                           source={require('../../res/images/jieqian2.png')}/>}
            onPress={()=> this.setState({selectedTab:'LendPage'})}
          >
            <LendPage/>
          </TabNavigator.Item>

          <TabNavigator.Item
              selected={this.state.selectedTab === 'EarnPage'}
              title= '赚钱'
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={()=><Image style={styles.image}
                                     source={require('../../res/images/qiandai.png')}/>}
              renderSelectedIcon={()=><Image style={[styles.image]}
                                             source={require('../../res/images/qiandai2.png')}/>}
              onPress={()=> this.setState({selectedTab:'EarnPage'})}
          >
            <EarnPage/>
          </TabNavigator.Item>

          <TabNavigator.Item
              selected={this.state.selectedTab === 'MyPage'}
              title= '我的'
              titleStyle={styles.titleStyle}
              selectedTitleStyle={styles.selectedTitleStyle}
              renderIcon={()=><Image style={styles.image}
                                     source={require('../../res/images/me.png')}/>}
              renderSelectedIcon={()=><Image style={[styles.image]}
                                             source={require('../../res/images/me2.png')}/>}
              onPress={()=> this.setState({selectedTab:'MyPage'})}
          >
            <MyPage {...this.props}/>
          </TabNavigator.Item>
        </TabNavigator>
    )
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
    fontSize:12,
    color:'gray'
  },
  selectedTitleStyle:{
    color:'black'
  },
  image:{
    width:22,
    height:22
  },
});


