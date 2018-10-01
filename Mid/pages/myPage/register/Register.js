import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Dimensions, Picker, TextInput, Text, View, Keyboard} from 'react-native';
const {width} = Dimensions.get('window');

import * as ScreenUtils from '../../Common/ScreenUtils'
export default class Register extends Component{
  static navigationOptions={
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerRight: (
        <View/>
    ),
  };

  constructor(props) {
    super(props);
    this.state={
      text: "",
      num: '86',
      click:false,
      textTel: ' ',
    }
  }

  render() {
    return (
        <TouchableOpacity style={styles.container} onPress={()=> Keyboard.dismiss()}>
          <View style={styles.Row}>
            <Picker
              selectedValue={this.state.num}
              onValueChange={(num)=> this.setState({num:num})}
              style={styles.picker}
              mode='dropdown'
            >
              <Picker.Item label='+86' value={'移动'} style={{fontSize: 5}}/>
              <Picker.Item label='+10' value={'联通'} style={{fontSize: 5}}/>
              <Picker.Item label='+00' value={'电信'} style={{fontSize: 5}}/>
            </Picker>
            <TextInput
                placeholder={'输入手机号'}
                maxLength={11}
                style={{width:width-50, height: 50, backgroundColor:'white'}}
                underlineColorAndroid={'#F1F1F1'}
                keyboardType={'numeric'}
                onChangeText={(textTel)=> this.setState({ textTel:textTel})}
            />
          </View>
          <TouchableOpacity style={styles.touch} onPress={()=> this.props.navigation.navigate('FindProve')}>
            <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>获取验证码</Text>
          </TouchableOpacity>
        </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#F3F4F6'
  },
  Row: {
    flexDirection: 'row',
    height:50,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor:'white',
  },
  picker: {
    width:50,
    height:50,
    justifyContent:'center',
    backgroundColor:'white',
    color:'gray',
    marginLeft:30
  },
  touch: {
    backgroundColor: '#FFE059',
    borderRadius: ScreenUtils.scaleSize(10),
    width: width - 60,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ScreenUtils.scaleSize(40)
  },
});
