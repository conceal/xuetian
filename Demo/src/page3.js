/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View , TextInput , TouchableOpacity , Dimensions , Alert} from 'react-native';

import Page4 from './page4';

export default class Page3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText1 : null,
            inputText2 : null,
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
            placeholder={'输入密码'}
            onChangeText={(text)=> this.TextInput1Change(text)}
        />
        <TextInput 
            placeholder={'确认密码'}
            onChangeText={(text)=> this.TextInput2Change(text)}
        />
        <View style={styles.textViewStyle}>
            <Text style={styles.textStyle}>密码长度8-32位，须包含数字、字母、符号至少两种或以上的元素</Text>
        </View>
        <TouchableOpacity 
            onPress={this.onPress}
            style={styles.buttonStyle}
        >
            <Text style={styles.buttonTextStyle}>确认提交</Text>
        </TouchableOpacity>
      </View>
    );
  }

  TextInput1Change = (text)=> {
      this.setState({
          inputText1 : text
      })
  }

  TextInput2Change = (text)=> {
    this.setState({
        inputText2 : text
    })
}

  onPress = ()=> {
      if(this.state.inputText1 === this.state.inputText2 && this.state.inputText1 !== null ) {
        this.props.navigation.navigate('Page4')
      }else{
          Alert.alert('密码错误')
      }
      
  }
}
const styles = StyleSheet.create({
    textViewStyle:{
        alignItems:'center',
    },
    textStyle:{
        fontSize:11,
        marginTop:10,
        color:'gray'
    },
    buttonStyle:{
        width:Dimensions.width,
        height:45,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
    },
    buttonTextStyle:{
        fontSize:20,
        color:'white',
    }
})



