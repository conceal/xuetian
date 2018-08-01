/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet , Text ,View , TextInput , TouchableOpacity} from 'react-native';

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');

export default class App extends Component {
  render() {
    return (
      <View>
        <TextInput 
            onPress={this.onPress}
            placeholder='输入邀请码'
        >
        </TextInput>
        <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>--在好友分享链接中找到他的邀请码--</Text>
        </View>
        <View style={styles.horizontalStyle}>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Home')}
                style={styles.rightStyle}
            >
                <Text style={styles.rightTextStyle}>跳过</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Page1')}
                style={styles.leftStyle}
            >
                <Text style={styles.leftTextStyle}>确认</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    textViewStyle:{
        alignItems:'center',
        marginTop:10,    
    },
    textStyle:{
        color:'gray'
    },
    horizontalStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:10,
    },
    rightStyle:{
        width:width*0.3,
        height:40,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
    },
    rightTextStyle:{
        fontSize:15,
        color:'white',
    },
    leftStyle:{
        width:width*0.3,
        height:40,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
    },
    leftTextStyle:{
        fontSize:15,
        color:'white',
    }
})


