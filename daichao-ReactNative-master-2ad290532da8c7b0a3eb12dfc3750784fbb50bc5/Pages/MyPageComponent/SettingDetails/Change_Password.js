import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  StatusBar,
  DeviceEventEmitter,
  Alert
} from 'react-native';
import NetUtils from "../../Common/NetUtils";
const {width} = Dimensions.get('window');
let url = 'http://47.98.148.58/app/user/changePwd.do';
export default class Change_Password extends Component{
  static navigationOptions={
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerRight: (
        <View/>
    ),
    headerStyle:{
      marginTop:StatusBar.currentHeight
    }
  };
  constructor(props){
    super(props);
    this.utils=new NetUtils;
    this.state=({
      newPwd:0,
      oldPwd:0
    })
  }
  _CheckNum(Password) {
    const correctPass =/^[a-zA-Z0-9]{6,21}$/;
    let regPass = new RegExp(correctPass);
    if (!regPass.test(Password)){
      Alert.alert(
          '提示', //提示标题
          "请输入正确的密码", //提示内容
          [
            {
              text: '确定'
            }
          ] //按钮集合
      );
    }else {
      this.onLoad()
    }
  }
  onLoad() {
    console.log(this.state.newPwd);
    this.utils.fetchNetRepository(url,
        {"password":this.state.newPwd})
        .then(result => {
          console.log(result);
          if(result.code === 0){
            Alert.alert(
                '提示', //提示标题
                "修改成功", //提示内容
                [
                  {
                    text: '确定'
                  }
                ] //按钮集合
            );
            DeviceEventEmitter.emit('NoticeName',1);
            this.props.navigation.navigate('Setting')
          }
        })
        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }
  render(){
    return(
        <View style={styles.First}>
          <View style={styles.container1}>
            <View style={{justifyContent:'center',
              alignItems:'center',width:70,backgroundColor:'white'}}>
              <Text style={styles.old}>新密码</Text>
            </View>
            <TextInput
                placeholder={'输入新密码'}
                maxLength={11}
                style={{width:width-70,height:50, backgroundColor:'white'}}
                underlineColorAndroid={'transparent'}
                keyboardType={'default'}
                secureTextEntry={true}
                onChangeText={(text)=>this.setState({oldPwd:text})}
            />

          </View>
          <View style={styles.container2}>
            <View style={{justifyContent:'center',
              alignItems:'center',width:70, backgroundColor:'white'}}>
              <Text style={styles.old}>确认密码</Text>
            </View>
            <TextInput
                placeholder={'再次输入新密码'}
                maxLength={11}
                secureTextEntry={true}
                style={{width:width-70, height:50, backgroundColor:'white'}}
                underlineColorAndroid={'transparent'}
                keyboardType={'default'}
                onChangeText={(text)=>this.setState({newPwd:text})}
            />

          </View>
          <TouchableOpacity
              onPress={()=>{
                if (this.state.newPwd === 0){
                  Alert.alert(
                      '提示', //提示标题
                      "请输入密码", //提示内容
                      [
                        {
                          text: '确定'
                        }
                      ] //按钮集合
                  );

                }else if ((this.state.newPwd === this.state.oldPwd)&&(this.state.newPwd!==0&&this.state.oldPwd!==0)) {
                  let str = this.state.newPwd;
                  let Str = str.replace(/\"/g,"");
                  this._CheckNum(Str);
                }else {
                  Alert.alert(
                      '提示', //提示标题
                      "请确认两次密码输入一致", //提示内容
                      [
                        {
                          text: '确定'
                        }
                      ] //按钮集合
                  );
                }
              }}
              style={styles.touch}
          >
            <Text style={{fontSize:19,color:'black'}}>完 成</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles=StyleSheet.create({
  First:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#F3F4F6'
  },
  container2:{
    height: 50,
    flexDirection:'row',
    marginTop:2,
    marginBottom:40,
  },
  container1:{
    height: 50,
    flexDirection:'row',
    marginTop:10,
  },
    picker:{
        width:100,
        justifyContent:'center',
        backgroundColor:'white',
        color:'gray',
        marginLeft:40
    },
  touch:{
    backgroundColor:'#FFE059',
    borderRadius:5,
    width:width-60,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    marginTop:20
  },
  old:{
    color:'black',
    fontSize:15
  }
});
