import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  DeviceEventEmitter,
  AsyncStorage,
  Alert,
  Linking,
  Dimensions,
  Platform,
} from 'react-native';
import * as ScreenUtils from "../Common/ScreenUtils";
import NetUtils from "../Common/NetUtils";
import CookieManager from 'react-native-cookies';

let isIphoneX = Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812;
let {width} = Dimensions.get('window');
let url = 'http://47.98.148.58/app/user/showUserInfo.do';
let URL = 'http://47.98.148.58/app/user/logoff.do';
let Url = "http://47.98.148.58/app/user/versionCheckAndUpd.do";
let URl = "http://47.98.148.58/dc/dcweb/apkDownLoad.html";
export default class MyPage extends Component {

  constructor(props) {
    super(props);
    this.netUtils = new NetUtils;
    this.state = {
      login: true,
      data: "",
      inviteNum: '',
      myAward: '',
      picUrl: 'icon',
      tel: 6324,
      userName: '',
      callback: 0,
    }
  }


  onLoad() {
    this.netUtils.fetchNetRepository(url)
        .then(result => {
          console.log(result);
          this.setState({
            inviteNum: result.data.invitationCode,
            myAward: result.data.myAward,
            login: result.data.state,
            picUrl: result.data.picUrl,
            tel: result.data.tel,
            userName: result.data.userName,
            intro:result.data.intro
          });
        })
        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }

  componentDidMount() {
    this.changePic = DeviceEventEmitter.addListener('ChangePic', (value) => {
      //这里面是要调用的方法，比如：刷新
      //value:是下面页面在 通知 时 ，所传递过来的参数
      this.onLoad();
      console.log("执行了ChangePic")
    });
    this.loginSuccess = DeviceEventEmitter.addListener('LoginSuccess', (value) => {
      //这里面是要调用的方法，比如：刷新
      //value:是下面页面在 通知 时 ，所传递过来的参数
      this.onLoad();
    });
    this.notice = DeviceEventEmitter.addListener('NoticeName', (value) => {
      //这里面是要调用的方法，比如：刷新
      //value:是下面页面在 通知 时 ，所传递过来的参数
      this.onLoad();
      console.log("执行了NoticeName")
    });
    this.onLoad()
  }
  componentWillUnmount(){
    this.changePic.remove();
    this.loginSuccess.remove();
    this.notice.remove();
  }


  titleCheck() {
    if (this.state.login) {
      return (
          <View style={styles.row1Style}>
            <Text style={styles.MeStyle}>我的</Text>
            <TouchableOpacity
                style={{width: ScreenUtils.scaleSize(94), height: ScreenUtils.scaleSize(40)}}
                onPress={() => this.props.navigation.navigate('Setting')}
            >
              <Text style={styles.settingStyle}>设置</Text>
            </TouchableOpacity>
          </View>
      );
    } else {
      return (
          <View style={styles.row1Style}>
            <Text style={styles.Me2Style}>我的</Text>
          </View>
      );
    }
  }

  logOut() {
    this.netUtils.fetchNetRepository(URL)
        .then(result => {
          console.log(result);
          let isTrue = result.code;
          this.setState({
            login: result.data.status,
          });
          if (isTrue === 0) {
            this.delData();
            this.clearCookie()
          }
        })
        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }

  clearCookie() {
    CookieManager.clearAll()
        .then((res) => {
          console.log('CookieManager.clearAll =>', res);
        });
  }

  CheckIn() {
    console.log("登录状态" + this.state.login);
    if (this.state.login) {
      return (
          <View style={{justifyContent: 'center'}}>
            <View style={{
              flexDirection: 'row',
              marginBottom: ScreenUtils.scaleSize(20),
              alignItems: "flex-end"
            }}>
              <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={styles.nameStyle}
              >{this.state.userName}</Text>
              <Text style={{
                fontSize: ScreenUtils.setSpText(18),
                color: '#333333',
                width: ScreenUtils.scaleSize(350)
              }}>{this.state.tel}</Text>
            </View>
            <Text style={{fontSize: ScreenUtils.setSpText(16)}}>极简借贷 轻松解决燃眉之急</Text>
          </View>
      );
    }
    else {
      return (
          <View style={{
            justifyContent: 'center',
            paddingTop: ScreenUtils.scaleSize(35),
            paddingRight: ScreenUtils.scaleSize(80)
          }}>
            <Text style={{fontSize: ScreenUtils.setSpText(16)}}>极简借贷 轻松解决燃眉之急</Text>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.props.navigation.navigate('Second')}
            >
              <Text style={{fontSize: ScreenUtils.setSpText(16), color: 'black'}}>登陆/注册</Text>
            </TouchableOpacity>
          </View>
      );
    }
  }

  delData() {
    AsyncStorage.removeItem('login');
  }

  CheckExit() {
    if (this.state.login) {
      return (
          <TouchableOpacity
              style={styles.button2Style}
              onPress={() => {

                this.props.navigation.navigate('Second');
                this.logOut()
              }}
          >
            <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>完全退出</Text>
          </TouchableOpacity>
      )
    }
    else {
      return <View/>
    }
  }

  CheckCode() {
    if (this.state.login) {
      return (
          <TouchableOpacity style={styles.rowStyle}>
            <View style={styles.leftStyle}>
              <Image source={require('../../res/Images/yaoqingma.png')} style={styles.icon05}/>
            </View>
            <View style={styles.rightStyle}>
              <Text style={styles.listFont}>我的邀请码</Text>
              <View style={{
                height: ScreenUtils.scaleSize(80),
                paddingTop: ScreenUtils.scaleSize(16),
                width: ScreenUtils.scaleSize(160),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <Text style={styles.icon02t}>{this.state.inviteNum}</Text>
              </View>
            </View>
          </TouchableOpacity>
      )
    } else {
      return (
          <TouchableOpacity style={styles.rowStyle}>
            <View style={styles.leftStyle}>
              <Image source={require('../../res/Images/yaoqingma.png')} style={styles.icon05}/>
            </View>
            <View style={styles.rightStyle}>
              <Text style={styles.listFont}>我的邀请码</Text>
              <View style={{
                height: ScreenUtils.scaleSize(80),
                paddingTop: ScreenUtils.scaleSize(16),
                width: ScreenUtils.scaleSize(160),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
              </View>
            </View>
          </TouchableOpacity>
      )
    }
  }

  CheckInvite() {
    if (this.state.login) {
      return (
          <TouchableOpacity
              style={styles.rowStyle}
              onPress={() => this.props.navigation.navigate('MyInvite')}
          >
            <View style={styles.leftStyle}>
              <Image source={require('../../res/Images/wodeyaoqing.png')} style={styles.icon03}/>
            </View>
            <View style={styles.rightStyle}>
              <Text style={styles.listFont}>我的邀请</Text>
              <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
            </View>
          </TouchableOpacity>
      );
    } else {
      return (
          <TouchableOpacity
              style={styles.rowStyle}
              onPress={() => this.props.navigation.navigate('Second')}
          >
            <View style={styles.leftStyle}>
              <Image source={require('../../res/Images/wodeyaoqing.png')} style={styles.icon03}/>
            </View>
            <View style={styles.rightStyle}>
              <Text style={styles.listFont}>我的邀请</Text>
              <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
            </View>
          </TouchableOpacity>
      )
    }
  }

  CheckAward() {
    if (this.state.login) {
      return (
          <TouchableOpacity
              style={styles.rowStyle}
              onPress={() => this.props.navigation.navigate('MyEarn')}
          >
            <View style={styles.leftStyle}>
              <Image source={require('../../res/Images/wodejiangli.png')} style={styles.icon01}/>
            </View>
            <View style={styles.rightStyle}>
              <Text style={styles.listFont}>我的奖励</Text>
              <View style={{
                height: ScreenUtils.scaleSize(80),
                paddingTop: ScreenUtils.scaleSize(16),
                paddingLeft: ScreenUtils.scaleSize(12),
                width: ScreenUtils.scaleSize(230),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={styles.icon02t}>{this.state.myAward}元</Text>
                <Image source={require('../../res/Images/ahead.png')} style={styles.icon002}/>
              </View>
            </View>
          </TouchableOpacity>
      )
    } else {
      return (
          <TouchableOpacity
              style={styles.rowStyle}
              onPress={() => this.props.navigation.navigate('Second')}
          >
            <View style={styles.leftStyle}>
              <Image source={require('../../res/Images/wodejiangli.png')} style={styles.icon01}/>
            </View>
            <View style={styles.rightStyle}>
              <Text style={styles.listFont}>我的奖励</Text>
              <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
            </View>
          </TouchableOpacity>
      )
    }
  }

  CheckLeave() {
    if (this.state.login) {
      return (
          <TouchableOpacity
              style={styles.rowStyle}
              onPress={() => this.props.navigation.navigate('Leave',)}
          >
            <View style={styles.leftStyle}>
              <Image source={require('../../res/Images/liuyan.png')} style={styles.icon01}/>
            </View>
            <View style={styles.rightStyle}>
              <Text style={styles.listFont}>给我留言</Text>
              <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
            </View>
          </TouchableOpacity>
      )
    } else {
      return (
          <TouchableOpacity
              style={styles.rowStyle}
              onPress={() => this.props.navigation.navigate('Second')}
          >
            <View style={styles.leftStyle}>
              <Image source={require('../../res/Images/liuyan.png')} style={styles.icon01}/>
            </View>
            <View style={styles.rightStyle}>
              <Text style={styles.listFont}>给我留言</Text>
              <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
            </View>
          </TouchableOpacity>
      )
    }
  }

  CheckPic() {
    if (this.state.login) {
      return <View style={{justifyContent: 'center', paddingLeft: ScreenUtils.scaleSize(30)}}>
        <Image source={{uri: this.state.picUrl}} style={styles.imageStyle}/>
      </View>
    } else {
      return <View style={{justifyContent: 'center', paddingLeft: ScreenUtils.scaleSize(30)}}>
        <Image source={require('../../res/Images/icon.png')} style={styles.imageStyle}/>
      </View>
    }
  }

  Refresh() {
    this.netUtils.fetchNetRepository(Url,
        {"version": "1.0.0"},
    )
        .then(result => {
          console.log(result);
          if (result.code === 1) {
            Alert.alert(
                '提示', //提示标题
                '已经是最新版本', //提示内容
                [
                  {
                    text: '确定'
                  }
                ] //按钮集合
            );
          }
          if (result.code === 0) {
            Linking.canOpenURL(URl)
                .then(supported => {
                  if (supported) {
                    Linking.openURL(URl);
                  } else {
                    console.log('无法打开该链接:' + URl);
                  }
                });

            Alert.alert(
                '提示', //提示标题
                '存在新版本，请更新', //提示内容
                [
                  {
                    text: '确定'
                  }
                ] //按钮集合
            );
          }
        })
  }

  _header = () => {
    return <View style={styles.container}>

      <View style={styles.row2Style}>
        <View>
          <View style={styles.TopStyle}></View>
          <View style={styles.BottomStyle}></View>
        </View>
        <View style={styles.centerStyle}>
          {this.CheckPic()}
          {this.CheckIn()}
        </View>
        <View>
          <View style={styles.TopStyle}></View>
          <View style={styles.BottomStyle}></View>
        </View>
      </View>
      <View style={styles.row3Style}></View>

      <View>
        {this.CheckInvite()}
        {this.CheckCode()}
        {this.CheckAward()}
        <TouchableOpacity
            style={styles.row5Style}
            onPress={() => this.props.navigation.navigate('MyHelp')}
        >
          <View style={styles.leftStyle}>
            <Image source={require('../../res/Images/bangzhu.png')} style={styles.icon01}/>
          </View>
          <View style={styles.rightStyle}>
            <Text style={styles.listFont}>常见帮助</Text>
            <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.rowStyle}
            onPress={() => this.props.navigation.navigate('MyWeChat')}
        >
          <View style={styles.leftStyle}>
            <Image source={require('../../res/Images/weixingongzhonghao.png')} style={styles.icon04}/>
          </View>
          <View style={styles.rightStyle}>
            <Text style={styles.listFont}>微信公众号</Text>
            <View style={{
              height: ScreenUtils.scaleSize(80),
              paddingTop: ScreenUtils.scaleSize(16),
              paddingLeft: ScreenUtils.scaleSize(12),
              width: ScreenUtils.scaleSize(160),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={styles.icon02t}>米米信</Text>
              <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.rowStyle}
            onPress={() => this.Refresh()}
        >
          <View style={styles.leftStyle}>
            <Image source={require('../../res/Images/shengji.png')} style={styles.icon01}/>
          </View>
          <View style={styles.rightStyle}>
            <Text style={styles.listFont}>版本升级</Text>
            <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
          </View>
        </TouchableOpacity>
        {this.CheckLeave()}
        <TouchableOpacity
            style={styles.rowStyle}
            onPress={() => this.props.navigation.navigate('AboutUs')}
        >
          <View style={styles.leftStyle}>
            <Image source={require('../../res/Images/guanyu.png')} style={styles.icon01}/>
          </View>
          <View style={styles.rightStyle}>
            <Text style={styles.listFont}>关于我们</Text>
            <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
          </View>
        </TouchableOpacity>
        {this.CheckExit()}
      </View>
    </View>
  };

  render() {
    return (
        <View style={styles.container}>
          {
            Platform.OS === 'ios' ?
                <View style={{height: Platform.OS === 'ios' ? (isIphoneX ? 40 : 20) : 0, backgroundColor: '#FFE059'}}>
                </View> : null
          }
          {this.titleCheck()}
          <FlatList
              extraData={this.state}
              ListHeaderComponent={this._header}
              keyExtractor={(item, index) => index}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F3F4F6'
      },
      row1Style: {
        height: ScreenUtils.scaleSize(80),
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFE059',
        alignItems: 'center'
      },
      MeStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1,
        height: ScreenUtils.scaleSize(60),
        fontSize: ScreenUtils.setSpText(22),
        color: '#4A4A4A',
        paddingLeft: ScreenUtils.scaleSize(100)
      },
      Me2Style: {
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1,
        height: ScreenUtils.scaleSize(60),
        fontSize: ScreenUtils.setSpText(22),
        color: '#4A4A4A',
      },
      settingStyle: {
        width: ScreenUtils.scaleSize(120),
        height: ScreenUtils.scaleSize(40),
        fontSize: ScreenUtils.setSpText(18)
      },
      row2Style: {
        flexDirection: 'row',
      },
      TopStyle: {
        backgroundColor: '#FFE059',
        width: width * 0.03,
        height: ScreenUtils.scaleSize(92.5),
      },
      centerStyle: {
        height: ScreenUtils.scaleSize(222),
        width: width * 0.94,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        elevation: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
      },
      BottomStyle: {
        backgroundColor: 'white',
        width: width * 0.03,
        height: ScreenUtils.scaleSize(129.5),
      },
      imageStyle: {
        width: ScreenUtils.scaleSize(140),
        height: ScreenUtils.scaleSize(140),
        borderRadius: ScreenUtils.scaleSize(140 / 2),
      },
      nameStyle: {
        fontSize: ScreenUtils.setSpText(19),
        fontWeight: '600',
        color: '#333333',
        width: ScreenUtils.scaleSize(150)
      },
      row3Style: {
        height: 25,
        backgroundColor: 'white',
      },
      buttonStyle: {
        width: width * 0.45,
        height: ScreenUtils.scaleSize(80),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE059',
        borderRadius: width * 0.05,
        marginTop: ScreenUtils.scaleSize(27),
        marginBottom: ScreenUtils.scaleSize(27),
        alignSelf: 'center',
      },
      button2Style: {
        width: ScreenUtils.scaleSize(690),
        height: ScreenUtils.scaleSize(88),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE059',
        marginTop: ScreenUtils.scaleSize(27),
        marginBottom: ScreenUtils.scaleSize(27),
        alignSelf: 'center',
      },
      rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: ScreenUtils.scaleSize(88),
        marginBottom: ScreenUtils.scaleSize(3),
      },
      row5Style: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: ScreenUtils.scaleSize(75),
        marginBottom: ScreenUtils.scaleSize(20),
      },
      row51Style: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: ScreenUtils.scaleSize(75),
      },

      leftStyle: {
        width: ScreenUtils.scaleSize(72),
        paddingLeft: ScreenUtils.scaleSize(12),
        alignItems: 'center',
      },
      icon01: {
        height: ScreenUtils.scaleSize(40),
        width: ScreenUtils.scaleSize(40),
      },
      icon03: {
        height: ScreenUtils.scaleSize(28),
        width: ScreenUtils.scaleSize(36),
      },
      icon02: {
        height: ScreenUtils.scaleSize(60),
        width: ScreenUtils.scaleSize(60),
      },
      icon002: {
        position: 'absolute',
        top: ScreenUtils.scaleSize(16),
        right: ScreenUtils.scaleSize(2),
        height: ScreenUtils.scaleSize(60),
        width: ScreenUtils.scaleSize(60),
      },
      icon02t: {
        fontSize: ScreenUtils.setSpText(17)
      },
      icon04: {
        height: ScreenUtils.scaleSize(35),
        width: ScreenUtils.scaleSize(45),
      },
      icon05: {
        height: ScreenUtils.scaleSize(40),
        width: ScreenUtils.scaleSize(34),
      },
      rightStyle: {
        width: ScreenUtils.scaleSize(678),
        flexDirection:
            'row',
        justifyContent:
            'space-between',
        paddingLeft: ScreenUtils.scaleSize(5),
        alignItems: 'center',
      },
      listFont: {
        fontSize: ScreenUtils.setSpText(17)
      }
    })
;


