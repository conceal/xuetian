import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Slider, ActivityIndicator, Modal, Platform, StatusBar} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import {CommonStyle, DeviceInfo, formatTime} from '../../../config/utils/utils';
import {Actions} from 'react-native-router-flux';
import Icon1 from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon4 from "react-native-vector-icons/EvilIcons";
import Icon5 from "react-native-vector-icons/Feather";
import Icon6 from "react-native-vector-icons/Entypo";
import Icon7 from "react-native-vector-icons/MaterialCommunityIcons";

export default class PlayMovie extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.state = {
      rate: 1,
      slideValue: 0.00,
      currentTime: 0.00,
      duration: 0.00,
      paused: false,
      isTouchedScreen: true,
      modalVisible: true,
      isLock: false,
    }
  }

  componentWillMount() {
    const init = Orientation.getInitialOrientation();
    this.setState({
      init,
      orientation: init,
      specificOrientation: init,
    })
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.addOrientation);
    Orientation.addSpecificOrientationListener(this.addSpecificOrientation)
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
    Orientation.removeOrientationListener(this.addOrientation);
    Orientation.removeSpecificOrientationListener(this.addSpecificOrientation);
  }

  addOrientation = orientation => this.setState({ orientation });
  addSpecificOrientation = specificOrientation => this.setState({ specificOrientation });

  render() {
    const {orientation, isLock, paused} = this.state;
    const {url, title} = this.props;
    return (
        <TouchableOpacity
          style={[styles.movieContainer, {height: orientation === 'PORTRAIT' ? 250 : DeviceInfo.deviceWidth+CommonStyle.navStatusBarHeight,
            marginTop: orientation === 'PORTRAIT' ? (Platform.OS === 'ios' ? (DeviceInfo.isIphoneX ? 40 : 20) : 0) : 0,}]}
          onPress={()=> this.setState({isTouchedScreen: !this.state.isTouchedScreen})}
          activeOpacity={1}
        >
          {
            orientation !== 'PORTRAIT' ?
            <StatusBar hidden={true}/> : null
          }
          <Video
            source={{uri:url}}
            ref={(ref)=> {this.player = ref}}
            rate={this.state.rate}
            volume={1.0}
            muted={false}
            paused={this.state.paused}
            resizeMode='center'
            repeat={true}
            playInBackground={true}
            playWhenInactive={false}
            ignoreSilentSwitch='ignore'
            progressUpdateInterval={250.0}
            onLoadStart={(data)=> this.loadStart(data)}
            onLoad={(data)=> this.loaded(data)}
            onProgress={(data)=> this.setTime(data)}
            onEnd={(data)=> this.onEnd(data)}
            onError={(data)=> this.error(data)}
            onBuffer={(data)=> this.onBuffer(data)}
            onTimedMetadata={(data)=> this.onTimedMetadata(data)}
            style={styles.videoPlayerStyle}
          />
          {
            this.state.isTouchedScreen && !isLock ?
                <View style={styles.navContentStyle}>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1,}}>
                      <TouchableOpacity
                        style={{backgroundColor:CommonStyle.clear}}
                        activeOpacity={0.1}
                        onPress={orientation === 'PORTRAIT' ? ()=> Actions.pop() : Orientation.lockToPortrait}
                      >
                        <Icon1 name="ios-arrow-back" size={20} color={CommonStyle.white}/>
                      </TouchableOpacity>
                      <Text style={{backgroundColor:CommonStyle.clear, color:CommonStyle.white, marginLeft: 10,}}>{title}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                      <TouchableOpacity
                        style={styles.navToolBarStyle}
                        onPress={()=> alert('切换电视')}
                      >
                        <Icon2 name="live-tv" size={20} color={CommonStyle.white} />
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={styles.navToolBarStyle}
                      onPress={()=> alert('开启VR')}
                      >
                        <Icon3 name="video-camera" size={20} color={CommonStyle.white}/>
                      </TouchableOpacity>
                      {
                        orientation !== 'PORTRAIT' ?
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                              <TouchableOpacity
                                style={[styles.navToolBarStyle, {borderColor:CommonStyle.white, borderWidth:0.5, padding:3}]}
                                onPress={()=> alert('开启弹幕')}
                              >
                                <Text style={{fontSize:12, color:CommonStyle.white}}>弹</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.navToolBarStyle}
                                onPress={()=> alert('分享！')}
                              >
                                <Icon4 name="share-google" size={20} color={CommonStyle.white}/>
                              </TouchableOpacity>
                              <TouchableOpacity
                                  style={styles.navToolBarStyle}
                                  onPress={()=> alert('下载')}
                              >
                                <Icon5 name="download" size={20} color={CommonStyle.white}/>
                              </TouchableOpacity>
                              <TouchableOpacity
                                  style={styles.navToolBarStyle}
                                  onPress={()=> alert('设置画面')}
                              >
                                <Icon7 name="dots-vertical" size={20} color={CommonStyle.white}/>
                              </TouchableOpacity>
                            </View> : null
                      }
                    </View>
                </View> : <View style={{height: 44, backgroundColor: CommonStyle.black}}/>
          }
          {
            orientation !== 'PORTRAIT' ?
                <TouchableOpacity
                    style={{marginHorizontal: 10, backgroundColor: CommonStyle.clear, width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.setState({isLock: !this.state.isLock})}
                >
                  {
                    !isLock ?
                        <Icon4 name="unlock" size={30} color={CommonStyle.white}/> :
                        <Icon4 name="lock" size={30} color={CommonStyle.white}/>
                  }
                </TouchableOpacity> : null
          }
          {
            this.state.isTouchedScreen && !isLock ?
                <View style={[styles.toolBarStyle, {marginBottom: 0}]}>
                  <TouchableOpacity onPress={()=> this.play()}>
                    {
                      paused ?
                          <Icon6 name="controller-play" size={18} color={CommonStyle.white}/> :
                          <Icon6 name="controller-paus" size={18} color={CommonStyle.white}/>
                    }
                  </TouchableOpacity>
                  <View style={styles.progressStyle}>
                    <Text style={styles.timeStyle}>{formatTime.formatMediaTime(Math.floor(this.state.currentTime))}</Text>
                    <Slider
                      style={styles.slider}
                      value={this.state.slideValue}
                      maximumValue={this.state.duration}
                      maximumTrackTintColor={CommonStyle.themeColor}
                      minimunTrackTintColor={CommonStyle.iconGray}
                      step={1}
                      onValueChange={value=> this.setState({currentTime:value})}
                      onSlidingComplete={value => this.player.seek(value)}
                    />
                    <View style={{flexDirection:'row', justifyContent:'flex-end', width:35}}>
                      <Text style={{color: CommonStyle.white, fontSize: 12}}>{formatTime.formatMediaTime(Math.floor(this.state.duration))}</Text>
                    </View>
                  </View>
                  {
                    orientation === 'PORTRAIT' ?
                        <TouchableOpacity onPress={Orientation.lockToLandscapeLeft}>
                          <Icon7 name='fullscreen' size={20} color={CommonStyle.white}/>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={Orientation.lockToPortrait}>
                          <Icon7 name="fullscreen-exit" size={20} color={CommonStyle.white}/>
                        </TouchableOpacity>
                  }
                </View> : <View style={{height:40}}/>
          }
          {this.renderModal()}
        </TouchableOpacity>
    )
  }

  loadStart = (data)=> {
    console.log('loadStart', data)
  };

  loaded = (duration)=> {
      this.setState({
        duration: duration.duration
      })
  };

  setTime(data) {
    let slideValue = parseInt(this.state.currentTime);
    this.setState({
      slideValue: slideValue,
      currentTime: data.currentTime,
      modalVisible: false,
    })
  };

  onEnd(data) {
    this.player.seek(0);
  };

  error = (error)=> {
    //
    alert(error)
  };

  onBuffer = (data)=> {
    console.log('onBuffer', data)
  };

  onTimedMetadata = (data)=> {
    console.log('onTimedMetadata', data)
  };

  // showMessageBar = (title)=> (msg) => (type) => {
  //   messageBarManager.showAlert({
  //     title:title,
  //     message:msg,
  //     alertTyoe:type;
  //   })
  // }

  play() {
    this.setState({
      paused: !this.state.paused,
    })
  };

  renderModal() {
    return (
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={()=> alert("Modal has been closed")}
        >
         <View style={styles.indicator}>
           <ActivityIndicator
            animating={true}
            style={{height:80}}
            color={CommonStyle.red}
            size="large"
           />
         </View>
        </Modal>
    )
  }
}

const styles = StyleSheet.create({
  movieContainer:{
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: CommonStyle.black,
  },
  videoPlayerStyle:{
    position: 'absolute',
    top:44,
    left:0,
    bottom:0,
    right:0,
  },
  navContentStyle:{
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: CommonStyle.black,
  },
  navToolBarStyle:{
    backgroundColor: CommonStyle.clear,
    marginHorizontal: 5,
  },
  toolBarStyle:{
    backgroundColor:CommonStyle.black,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal: 10,
    marginTop: 10,
    height:30,
  },
  timeStyle: {
    width:35,
    color: CommonStyle.white,
    fontSize: 12,
  },
  slider: {
    flex: 1,
    marginHorizontal: 5,
    height: 20,
  },
  progressStyle: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  indicator: {
    flex: 1,
    marginTop:20,
    alignItems: 'center',
    justifyContent:'center',
  },
});
