import React, { Component } from 'react';
import { StyleSheet, View, Text,  TextInput, Image, Button ,  Alert} from 'react-native';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;

export default class loginView extends Component {

  // componentWillMount() {
  //   Alert.alert('即将开始')
  // }

  constructor(props){
    super(props);
    this.state={Text:'登陆功能'};
  }

  static defaultProps={
    otherLogin:'其他登录方式'
  }

  render() {
    return (
      <View style={styles.container}>
        {Alert.alert('欢迎使用')}
        {/*头像*/}
        <View>
          <Image source={require('./image/HeadPortrait.jpg')} style={styles.headStyle}/>
        </View>
        {/*账号密码*/}
        <View>
          <TextInput style={styles.textInputStyle}
          placeholder={'请输入账号'}
          clearButtonMode='always'
          />
          <TextInput style={styles.textInputStyle}
          placeholder={'请输入账号'}
          secureTextEntry={true}
          clearButtonMode='always'
          />
        </View>
        {/*登陆按钮*/}
        <View style={styles.loginStyle} >
          <Button
          title="登陆"
          color="blue"
          accessibilityLabel="let's go"
          onPress={()=>this.click()}
          />
        </View>
        {/*设置*/}
        <View style={styles.settingStyle}>
          <Text>无法登陆</Text>
          <Text>新用户</Text>
        </View>
        {/*第三方登录*/}
        <View style={styles.otherLoginStyle} >
          <Text>{this.props.otherLogin}</Text>
          <Image source={require('./image/QQ.jpg')} style={styles.otherImageStyle} />
          <Image source={require('./image/WeChat.png')} style={styles.otherImageStyle} />
          <Image source={require('./image/Maipo.jpg')} style={styles.otherImageStyle} />
        </View>
      </View>
    );
  }
  
  // componentDidMount() {
  //   Alert.alert('DidMount')
  // }

  // componentDidUpdate() {
  //  Alert.alert('刷新了UI')
  // }

  //自定义的方法建议使用属性的方法进行定义
  click = ()=> {
    Alert.alert('暂时不能使用' + this.state.Text)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop:50,
  },
  headStyle: {
    width:80,
    height:80,
    borderRadius:40,
    marginBottom:15,
  },
  textInputStyle: {
    backgroundColor:'white',
    width:width,
    height:40,
    marginBottom:2,
  },
  loginStyle: {
    height:40,
    width:width*0.9,
    backgroundColor:'blue',
    borderRadius:15,
    marginTop:30,
    marginBottom:30,
    justifyContent:'center',
    alignItems:'center',
  },
  settingStyle: {
    width:width*0.9,
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:5,
    paddingBottom:5,
  },
  otherLoginStyle: {
    flexDirection:'row',
    alignItems:'center',
    position:'absolute',
    bottom:10,
    left:20,
  },
  otherImageStyle: {
    width:40,
    height:40,
    borderRadius:20,
    marginLeft:15,
  },
});

//输出一个类
module.exports = loginView;