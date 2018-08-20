/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class PageTwo extends Component{
  render() {
    return (
        <View style={styles.container}>
          <Text
              style={styles.welcome}
              onPress={()=> Actions.three({data:'我跳到PageThree了'})}>
            我是PageTwo
          </Text >
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignSelf:'center',
  },
  welcome:{
    fontSize:40,
    color:'red',
  },
  refresh:{
    fontSize:40,
    color: 'white'
  }
});


