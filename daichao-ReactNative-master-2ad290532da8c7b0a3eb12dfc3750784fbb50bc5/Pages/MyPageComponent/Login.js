import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Picker,
  Dimensions,
  StatusBar,
  Keyboard,
  DeviceEventEmitter,
  AsyncStorage, Alert
} from 'react-native';
import * as ScreenUtils from "../Common/ScreenUtils";
import NetUtils from '../Common/NetUtils';
import JPushModule from "jpush-react-native/index";

let url = 'http://47.98.148.58/app/user/bankLading.do';
let URL = 'http://47.98.148.58/app/user/SMSLading.do';
const {width} = Dimensions.get('window');
export default class Login extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: StatusBar.currentHeight
    }
  };
  state = {
    One: true,
    ColorOne: '#F8D075',
    ColorTwo: '#F1F1F1',
    widthOne: 2,
    widthTwo: 0.7,
    num: '+86',
  };

  constructor(props) {
    super(props);
    this.netUtils = new NetUtils();
    this.state = {
      result: '',
      textTel: '',
      textPassword: '',
      we:1,
      registrationId:''
    }
  }


  componentDidMount(){
    JPushModule.initPush();
    JPushModule.getRegistrationID((registrationId) => {
      console.log("registrationId:"+ registrationId);
      this.setState({
        registrationId:registrationId
      })
    });
  }
  onLoad() {
    this.netUtils.fetchNetRepository(url,
        {"userTel": this.state.textTel, "password": this.state.textPassword,"registrationId":this.state.registrationId},
    )
        .then(result => {
          console.log(result);


          if(result.code===0){
            Alert.alert(
                '提示', //提示标题
                "登录成功", //提示内容
                [
                  {
                    text: '确定'
                  }
                ] //按钮集合
            );
            this.setData(result.data.tkid);
            this.props.navigation.goBack();
            DeviceEventEmitter.emit('NoticeName',1);
          }else {
            Alert.alert(
                '提示', //提示标题
                "登录失败", //提示内容
                [
                  {
                    text: '确定'
                  }
                ] //按钮集合
            );
          }
        })

        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }

  setData(text){
    AsyncStorage.setItem('login',text,(error)=>{ if (error) { alert(error); } });
  }

  textLogin() {
    this.netUtils.fetchNetRepository(URL,
        {"telNumber": this.state.textTel},
    )
        .then(result => {
          console.log(result);
          if(result.code === 0){
            this.props.navigation.navigate('LoginProve',{text:this.state.textTel});
          }else {
            Alert.alert(
                '提示', //提示标题
                '手机号未注册', //提示内容
                [
                  {
                    text: '确定'
                  }
                ] //按钮集合
            );
          }
        })
        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        });
  }

  _CheckProve(Num) {
    const correctnum =/^1(3|4|5|7|8)\d{9}$/;
    let regNum = new RegExp(correctnum);
    if (!regNum.test(Num)){
      Alert.alert(
          '提示', //提示标题
          "请输入正确的手机号", //提示内容
          [
            {
              text: '确定'
            }
          ] //按钮集合
      );
    }else {
      this.textLogin()
    }
  }
  _CheckNum(Num,Password) {
    const correctNum =/^1(3|4|5|7|8)\d{9}$/;
    const correctPass =/^[a-zA-Z0-9]{6,21}$/;
    let regNum = new RegExp(correctNum);
    let regPass = new RegExp(correctPass);
    if (!regNum.test(Num)||!regPass.test(Password)){
      Alert.alert(
          '提示', //提示标题
          "请输入正确的账号和密码", //提示内容
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

  StateTest() {
    if (this.state.One) {
      return (
          <View>
            <View style={styles.Call}>
              <Picker
                  selectedValue={this.state.num}
                  onValueChange={(num) => this.setState({num: num})}
                  style={styles.picker}
                  mode='dropdown'
                  itemStyle={{height:50}}
              >
                <Picker.Item label='+86' value={'移动'} style={{fontSize: 5}}/>
                <Picker.Item label='+10' value={'联通'} style={{fontSize: 5}}/>
                <Picker.Item label='+00' value={'电信'} style={{fontSize: 5}}/>
              </Picker>
              <TextInput
                  placeholder={'输入手机号'}
                  maxLength={11}
                  underline={true}
                  style={{width: width - 150, height:50, backgroundColor: 'white'}}
                  underlineColorAndroid={'#F1F1F1'}
                  keyboardType={'numeric'}
                  onChangeText={(textTel) => {this.setState({textTel});}}
              />
            </View>

            <View style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              borderBottomColor: 'gray',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                width: ScreenUtils.scaleSize(160),
                fontSize: ScreenUtils.setSpText(12),
                color: 'black'
              }}>密码</Text>
              <TextInput
                  placeholder={'输入密码'}
                  style={{width: width - 180, height:50,  backgroundColor: 'white'}}
                  underlineColorAndroid={'#F1F1F1'}
                  keyboardType={'default'}
                  onChangeText={(textPassword) => {this.setState({textPassword})}}
                  secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
                onPress={() => {
                  let str = this.state.textPassword;
                  let Str = str.replace(/\"/g,"");
                  this._CheckNum(parseInt(this.state.textTel),Str);
                }}
                style={styles.touch}
            >
              <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>登 录</Text>
            </TouchableOpacity>
          </View>
      );
    }
    else {
      return (
          <View>
            <View style={styles.Call}>
              <Picker
                  selectedValue={this.state.num}
                  onValueChange={(num) => this.setState({num: num})}
                  style={styles.picker}
                  mode='dropdown'
                  itemStyle={{height:50}}
              >
                <Picker.Item label='+86' value={'移动'} style={{fontSize: 5}}/>
                <Picker.Item label='+10' value={'联通'} style={{fontSize: 5}}/>
                <Picker.Item label='+00' value={'电信'} style={{fontSize: 5}}/>
              </Picker>
              <TextInput
                  placeholder={'输入手机号'}
                  maxLength={11}
                  style={{width: width - 150, hight:50, backgroundColor: 'white'}}
                  underlineColorAndroid={'#F1F1F1'}
                  keyboardType={'numeric'}
                  onChangeText={(textTel) => {
                    this.setState({
                      textTel:textTel
                    });
                  }}
              />
            </View>
            <TouchableOpacity
                onPress={() => {
                  if (this.state.text !== null&&this.state.text !== ""){
                    this._CheckProve(parseInt(this.state.textTel))
                  } else {
                    Alert.alert(
                        '提示', //提示标题
                        "请输入手机号", //提示内容
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
              <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>获取验证码</Text>
            </TouchableOpacity>
          </View>
      );
    }
  }

  LoginSwitchOne() {
    this.setState({
      ColorOne: '#F8D075',
      widthOne: 2,
      ColorTwo: '#F1F1F1',
      widthTwo: 0.7,
      One: true
    });
  };

  LoginSwitchTwo() {
    this.setState({
      ColorOne: '#F1F1F1',
      widthOne: 0.7,
      ColorTwo: '#F8D075',
      widthTwo: 2,
      One: false
    });
  }

  render() {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.container}
            onPress={()=>Keyboard.dismiss()}
        >
          <StatusBar
              backgroundColor='white'
          />
          <Image source={require('../../res/Images/denglulogo.png')}
                 style={styles.Img}
          />
          <View style={styles.One}>
            <TouchableOpacity
                onPress={this.LoginSwitchOne.bind(this)}
                style={[styles.TouchOne, {
                  borderBottomColor: this.state.ColorOne,
                  borderBottomWidth: this.state.widthOne
                }]}
            >
              <Text style={{fontSize: ScreenUtils.setSpText(17), color: 'black'}}>帐号登录</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={this.LoginSwitchTwo.bind(this)}
                style={[styles.TouchTwo, {
                  borderBottomColor: this.state.ColorTwo,
                  borderBottomWidth: this.state.widthTwo
                }]}
            >
              <Text style={{fontSize: ScreenUtils.setSpText(17), color: 'black'}}>短信登录</Text>
            </TouchableOpacity>
          </View>

          {this.StateTest()}


          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: ScreenUtils.scaleSize(24)
          }}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('FindBackPage')}
            >
              <Text style={{fontSize: ScreenUtils.setSpText(14)}}>忘记密码</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{justifyContent: 'center'}}
                onPress={() => this.props.navigation.navigate('Register')}
            ><Text style={{paddingLeft: 200, fontSize: ScreenUtils.setSpText(14)}}>新用户注册</Text>
            </TouchableOpacity>
          </View>

        </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  Img: {
    height: ScreenUtils.scaleSize(160),
    width: ScreenUtils.scaleSize(160),
    borderRadius: ScreenUtils.scaleSize(40),
    marginTop: ScreenUtils.scaleSize(120),
    marginBottom: ScreenUtils.scaleSize(60)
  },
  One: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: ScreenUtils.scaleSize(40)
  },
  TouchOne: {
    justifyContent: 'center',
    alignItems: 'center',
    width: ScreenUtils.scaleSize(240)
  },
  TouchTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: ScreenUtils.scaleSize(100),
    width: ScreenUtils.scaleSize(240)
  },
  Call: {
    flexDirection: 'row',
    borderBottomColor: 'gray',
    marginBottom: ScreenUtils.scaleSize(10),
    backgroundColor: 'white'
  },
  touch: {
    backgroundColor: '#FFE059',
    borderRadius: ScreenUtils.scaleSize(10),
    width: width - 60,
    height: ScreenUtils.scaleSize(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ScreenUtils.scaleSize(40)
  },
  picker: {
    height: 50,
    justifyContent:'center',
    width: ScreenUtils.scaleSize(160),
    marginRight: ScreenUtils.scaleSize(60),
  },
  warnStyle:{
    color:'red',
    fontSize:ScreenUtils.setSpText(5)
  }

});
