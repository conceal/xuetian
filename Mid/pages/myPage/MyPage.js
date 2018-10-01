/**
 * 我的界面
 */

import React, { Component } from 'react';
import {AppRegistry, Text, View, TouchableOpacity} from 'react-native';

export default class MyPage extends Component {
  render() {
    return(
        <View>
          <View style={{height:50}}/>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
              <Text>登陆</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Setting')}>
              <Text>设置</Text>
            </TouchableOpacity>
        </View>

    )
  }
}

