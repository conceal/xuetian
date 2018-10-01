import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import * as ScreenUtils from "../../Common/ScreenUtils";
import NetUtils from "../../Common/NetUtils";

let url = 'http://47.98.148.58/app/user/leaveWords.do';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
export default class LeaveMessage extends Component {
  constructor(props) {
    super(props);
    this.utils = new NetUtils;
    this.state = {
      content: "",
      mail: ""
    }
  }

  static navigationOptions = {
    headerTitle: '意见反馈',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerRight: (
        <View/>
    ),
    headerStyle: {
      marginTop: StatusBar.currentHeight
    }
  };

  onLoad() {
    console.log("mail:" + this.state.mail);
    console.log("content:" + this.state.content);
    this.utils.fetchNetRepository(url,
        {"queOrSug": this.state.content, "qqMail": this.state.mail},
    )
        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }

  revise() {
    if (this.state.content === null || this.state.content === "") {
      Alert.alert(
          '提示', //提示标题
          '请输入反馈信息', //提示内容
          [
            {
              text: '确定'
            }
          ] //按钮集合
      );
    }

    if (this.state.mail === null || this.state.mail === "") {
      Alert.alert(
          '提示', //提示标题
          '请输入您的邮箱', //提示内容
          [
            {
              text: '确定'
            }
          ] //按钮集合
      );
    }
    if ((this.state.mail !== null && this.state.mail !== "")&&(this.state.content !== null && this.state.content !== "")) {
      {
        this._CheckNum(this.state.mail);
        console.log("dd");

      }
    }

  }
  _CheckNum(mail) {
    const correctMail =/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    let regPass = new RegExp(correctMail);
    if (!regPass.test(mail)){
      Alert.alert(
          '提示', //提示标题
          "请输入有效的邮箱", //提示内容
          [
            {
              text: '确定'
            }
          ] //按钮集合
      );
    }else {
      Alert.alert(
          '提示', //提示标题
          `您已反馈成功，感谢您的反馈`, //提示内容
          [
            {
              text: '确定'
            }
          ] //按钮集合
      );
      this.props.navigation.goBack();
      this.onLoad();
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor='white'
          />
          <TextInput
              style={styles.textInputStyle}
              placeholder='请输入遇到的问题或建议...'
              clearButtonMode='always'
              underlineColorAndroid='transparent'
              multiline={true}
              onChangeText={(content) => {
                this.setState({content})
              }}
          />
          <View style={styles.wrap}>
            <Text style={styles.text}>QQ邮箱:</Text>
            <TextInput
                style={styles.textInputStyle2}
                placeholder='请填写您的邮箱便于我们联系你'
                clearButtonMode='always'
                underlineColorAndroid='transparent'
                maxLength={22}
                onChangeText={(mail) => {
                  this.setState({mail})
                }}
            />
          </View>

          <TouchableOpacity
              style={styles.button2Style}
              onPress={() => this.revise()}
          >
            <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>提交</Text>
          </TouchableOpacity>

        </View>
    )
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: 'white',
    width: width,
    height: height / 4,
    paddingTop: ScreenUtils.scaleSize(10)
  },
  textInputStyle2: {
    width: width * 0.6,
    height: ScreenUtils.scaleSize(88),
  },
  wrap: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: width,
    height: ScreenUtils.scaleSize(88),
    marginTop: ScreenUtils.scaleSize(20)
  },
  text: {
    width: width * 0.25,
    height: ScreenUtils.scaleSize(88),
    fontSize: ScreenUtils.setSpText(17),
    paddingLeft: ScreenUtils.scaleSize(15),
    paddingTop: ScreenUtils.scaleSize(18),
  },
  button2Style: {
    width: ScreenUtils.scaleSize(690),
    height: ScreenUtils.scaleSize(88),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#FFE059',
    marginTop: ScreenUtils.scaleSize(27),
    marginBottom: ScreenUtils.scaleSize(27),
    alignSelf: 'center',
  },

});
