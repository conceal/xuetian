/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text , View , Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Color from '../common/color'
import PlayingMovie from './PlayingMovie';
import ComingMovie from './ComingMovie';

let navigation = null;
export default class HomeScreen extends Component {
    static navigationOptions={
        headerTitle:'豆瓣电影',
        headerStyle:{backgroundColor:Color.themeColor},
        headerTitleStyle:{alignSelf:'center'},
        headerTintColor:'white',
    }
    constructor(props) {
        super(props);
        this.state={
            selectedTab : 'PlayingMovie',
        };
        navigation = this.props.navigation;
    }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
            <TabNavigator.Item 
                // 选中的位置
                selected={this.state.selectedTab === 'PlayingMovie'}
                //标题
                title='正在热映'
                //标题样式
                titleStyle={styles.tabText}
                //选中时标题样式
                selectedTitleStyle={styles.selectedTabText}
                //图标
                renderIcon={()=> <Image style={styles.icon} source={require('../image/playing-active.png')}/>}
                //选中时图标
                renderSelectedIcon={()=> <Image style={styles.selectedIcon} source={require('../image/playing-active.png')}/>}
                //点击PlayingMovie
                onPress={()=> this.setState({selectedTab:'PlayingMovie'})} >
                <PlayingMovie   onPress={()=> this.props.navigation.navigate('Details')}/>
            </TabNavigator.Item>  

            <TabNavigator.Item 
                selected={this.state.selectedTab === 'ComingMovie'}
                title='即将上映'
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={()=> <Image style={styles.icon} source={require('../image/coming-active.png')}/>}
                renderSeclectedIcon={()=> <Image style={styles.selectedIcon} source={require('../image/coming-active.png')}/>}
                onPress={()=> this.setState({selectedTab:'ComingMovie'})} >
                <ComingMovie  onPress={()=> this.props.navigation.navigate('Details')}/>
            </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    tabText:{
        fontSize:10,
        color:'grey',
    },
    selectedTabText:{
        fontSize:10,
        color:'blue',
     },
    icon:{
        width:30,
        height:22,

    },
    selectedIcon:{
        width:30,
        height:22,
    }
})

