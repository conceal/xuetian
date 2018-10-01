import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  DeviceEventEmitter,
  Alert
} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";
let width = Dimensions.get('window');
import Icon1 from "react-native-vector-icons/Ionicons";
import NetUtils from "../../Common/NetUtils";
let url = 'http://47.98.148.58/app/user/changeNickName.do';

export default class Change_Name extends Component {
  constructor(props) {
    super(props);
    this.netUtils = new NetUtils;
    this.state = {
      switchState: true,
      text:''
    };
  }

  _complete() {
    const { navigate } = this.props.navigation;
    navigate('Setting');
  };
  onLoad(){
    this.netUtils.fetchNetRepository(url,
        {"nickName":this.state.text}
    )
        .then(result => {
          console.log(result);
          if(result.code===0){
            Alert.alert(
                '提示', //提示标题
                "修改成功", //提示内容
                [
                  {
                    text: '确定'
                  }
                ] //按钮集合
            );
            this._complete();
            DeviceEventEmitter.emit('NoticeName',1);
          }else {
            Alert.alert(
                '提示', //提示标题
                "修改失败", //提示内容
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
  _Load(){
    if(this.state.text === ""||this.state.text === null){
      Alert.alert(
          '提示', //提示标题
          "请输入昵称", //提示内容
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

  render() {
    return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor='white'
          />
          <View style={styles.NavBar}>
            <TouchableOpacity
                style={{flexDirection:'row', alignItems: 'center', marginLeft: 16, height: 25,}}
                onPress={() => this.props.navigation.pop()}>
              <Icon1 name="ios-arrow-back" size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={{color:'black',fontSize:ScreenUtils.setSpText(18), fontWeight: 'bold'}}>修改昵称</Text>
            <TouchableOpacity
                onPress={()=> this._Load()}
            >
              <Text style={{color:'black',fontSize:ScreenUtils.setSpText(18),marginRight:ScreenUtils.scaleSize(25)}}>完成</Text>
            </TouchableOpacity>
          </View>
          <TextInput
              style={styles.input}
              placeholder='请输入昵称'
              clearButtonMode='always'
              maxLength={10}
              underlineColorAndroid='transparent'
              onChangeText={(text) => {this.setState({text})}}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  input:{
    backgroundColor:'white',
    padding:ScreenUtils.scaleSize(20),
    height:ScreenUtils.scaleSize(90),
    width:0.9*width,
    marginTop:ScreenUtils.scaleSize(30)
  },
  NavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:60,
    backgroundColor: 'white',
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
    paddingTop:10,
  }
});
