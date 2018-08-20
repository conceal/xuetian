import React , {Component} from 'react';
import {View , Dimensions, Image, Text, Slider, TouchableNativeFeedback, TouchableOpacity, Button, StyleSheet, Picker} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation'

const screenWidth = Dimensions.get('window').width;

function formatTime(second) {
  let h = 0, i = 0, s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // 补零
  let zero = function (v) {
    return (v >> 0) < 10 ? "0" + v : v;
  };
  return [zero(h), zero(i), zero(s)].join(":");
}


export default class VideoApp extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rate:1.0,
      videoWidth:screenWidth,
      videoHeight:screenWidth * 9/16,
      showVideoCover:true,      //是否显示视频封面
      showVideoControl:false,    //是否显示视频呢控制组件
      isPlaying:false,           //视频是否正在播放
      currentTime:0,            //视频当前播放时间
      duration:0,               //视频总时长
      isFullScreen:false,       //当前是否全屏显示
      playFromBeginning:false     //是否从头播放
    };
  }

  render(){
    return(
        <View style={styles.container} onLayout={this._onLayout}>
          <View style={{width:this.state.videoWidth, height:this.state.videoHeight, backgroundColor:'#00000'}}>
            <Video
              ref={(ref) => this.videoPlayer = ref}
              source={require('./src/video/video01.mp4')}
              rate={this.state.rate}       //速度
              volume={1.0}    //音量
              muted={false}   //控制音频是否静音
              paused={!this.state.isPlaying}
              resizeMode={'contain'}  //确定当帧与原始视频尺寸不匹配时如何调整视频大小
              playWhenInactive={false} //在通知或控制中心位于视频前面时是否应继续播放媒体
              playInBackground={true}   // //确定应用程序在后台时是否应继续播放媒体。 这允许客户继续收听音频
              ignoreSilentSwitch={'ignore'}  //
              progressUpdateInterval={250.0} // //onProgress事件之间的毫秒延迟
              onLoadStart={this._onLoadStart}
              onLoad={this._onLoaded}
              onProgress={this._onProgressChanged}
              onEnd={this._onPlayEnd}
              onError={this._onPlayError}
              onBuffer={this._onBuffer}
              style={{width:this.state.videoWidth, height:this.state.videoHeight}}
            />
            {
              this.state.showVideoCover ?    //是否显示视频封面
                  <Image
                    style={{
                      position: 'absolute',
                      top:0,
                      left:0,
                      width:this.state.videoWidth,
                      height:this.state.videoHeight,
                    }}
                    resizeMode={'cover'}
                    source={require('./src/image/videoCover.jpeg')}
                  /> : null
            }
            <TouchableNativeFeedback onPress={()=> {this.hideControl()}}>
              <View
                style={{
                  position:'absolute',
                  top:0,
                  left:0,
                  width:this.state.videoWidth,
                  height:this.state.videoHeight,
                  backgroundColor:this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {
                  this.state.isPlaying ? null :
                      <TouchableNativeFeedback onPress={() => {this.onPressPlayButton()}} >
                        <Image
                          style={styles.playButton}
                          source={require('./src/image/icon_control_play.png')}
                        />
                      </TouchableNativeFeedback>
                }
              </View>
            </TouchableNativeFeedback>

            {
                //是否显示视频控件
                this.state.showVideoControl ?
                    <View style={[styles.control , {width:this.state.videoWidth}]}>
                      <TouchableOpacity activeOpacity={0.3} onPress={()=> this.onControlPlayPress()}>
                        <Image
                            style={styles.playControl}
                            source={this.state.isPlaying ? require('./src/image/icon_control_pause.png') : require('./src/image/icon_control_play.png')}
                        />
                      </TouchableOpacity>
                      <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
                      <Slider
                        style={{flex:1}}
                        maximumTrackTintColor={'#999999'}
                        minimumTrackTintColor={'#00c06d'}
                        thumbImage={require('./src/image/icon_control_slider.png')}
                        value={this.state.currentTime}
                        minimumValue={0}
                        maximumValue={this.state.duration}
                        onValueChange={(currentTime) => this.onSliderValueChanged(currentTime)}
                      />
                      <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
                      <TouchableOpacity activeOpacity={0.3} onPress={()=> this.onControlShrinkPress() }>
                        <Image
                          style={styles.shrinkControl}
                          source={this.state.isFullScreen ? require('./src/image/icon_control_shrink_screen.png') : require('./src/image/icon_control_full_screen.png')}
                        />
                      </TouchableOpacity>
                    </View> : null
            }
          </View>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Button title={'开始播放'} onPress={() => {this.playVideo()}}/>
            <Button title={'暂停播放'} onPress={() => {this.pauseVideo()}}/>
              <View style={{backgroundColor:'white', marginTop:10}}>
                <Picker
                    mode={'dropdown'}
                    style={{width:2000}}
                    selectedValue={this.state.rate}
                    onValueChange={(lang) => this.setState({rate:lang})}
                >
                  <Picker.Item label="1" value={1.0}/>
                  <Picker.Item label="1.2" value={1.2} />
                  <Picker.Item label="1.5" value={1.5} />
                  <Picker.Item label="2.0" value={2.0}/>
                </Picker>
              </View>
          </View>

        </View>
    )
  }

  ////----Video组件回调事件-----
  _onLoadStart = ()=> {
    console.log('视频开始加载');
  };

  _onLoaded = (data)=> {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
    });
  };

  _onProgressChanged = (data)=> {
    console.log('视频进度更新');
    if(this.state.isPlaying) {
      this.setState({
        currentTime: data.currentTime,
      })
    }
  };

  _onBuffer = ()=> {
    console.log('视频缓冲中...')
  };

  _onPlayEnd = ()=> {
    console.log('视频播放结束');
    this.videoPlayer.seek(0);
    this.setState({
      currentTime:0,
      isPlaying:true,
      playFromBeginning:true,
    });
  };

  _onPlayError = ()=> {
    console.log('播放视频失败');
  };

  ////----控制点击事件------

  //控制播放器的工具栏的显示和隐藏
  hideControl(){
    if(this.state.showVideoControl){
      this.setState({
        showVideoControl:false,
      })
    }else{
      this.setState(
          {
            showVideoControl:true,
          },
          //5秒后自动隐藏工具栏
          ()=> {
            setTimeout(
                ()=> {
                  this.setState({
                    showVideoControl:false,
                  })
                }, 5000,
            )
          }
      )
    }
  }

  //点击了播放器正中间的播放按钮
  onPressPlayButton(){
    let isPlay = !this.state.isPlaying;
    this.setState({
      isPlaying: isPlay,
      showVideoCover:false,
    });
    if(this.state.playFromBeginning) {
      this.videoPlayer.seek(0);
      this.setState({
        playFromBeginning:false,
      })
    }
  }

  //点击了工具栏上的播放按钮
  onControlPlayPress(){
    this.onPressPlayButton();
  }

  //点击了工具栏上的全屏按钮
  onControlShrinkPress(){
    if(this.state.isFullScreen) {
      Orientation.lockToPortrait();
    }else {
      Orientation.lockToLandscape();
    }
  }

  //进度条的值改变
  onSliderValueChanged(currentTime) {
    this.videoPlayer.seek(currentTime);
    if(this.state.isPlaying) {
      this.setState({
        currentTime: currentTime
      })
    }else{
      this.setState({
        currentTime:currentTime,
        isPlaying:true,
        showVideoCover:false,
      })
    }
  }



  //屏幕旋转是宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
  _onLayout = (event) => {
    //获取View的宽高
    let {width, height} = event.nativeEvent.layout;
    console.log('通过onLayout得到的宽度：' + width);
    console.log('通过onLayout得到的高度：' + height);

    //一般设备横屏下都是宽大于高，这里可以用这个来判断横屏
    let isLandscape = (width) > (height);
    if(isLandscape) {
      this.setState({
        videoWidth:width,
        videoHeight:height,
        isFullScreen:true,
      })
    }else{
      this.setState({
        videoWidth:width,
        videoHeight:width * 9/16,
        isFullScreen:false,
      })
    }
    Orientation.unlockAllOrientations();
  }

  ///---------外部调用事件方法--------

  //播放视频，提供给外部调用
  playVideo(){
    this.setState({
      isPlaying:true,
      showVideoCover:false,
    })
  }

  //暂停播放，提供给外部调用
  pauseVideo(){
    this.setState({
      isPlaying:false,
    })
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f0f0f0',
  },
  playButton: {
    width: 50,
    height: 50,
  },
  playControl:{
    width:24,
    height:24,
    marginLeft:15,
  },
  shrinkControl:{
    width:15,
    height:15,
    marginRight:15,
  },
  time:{
    fontSize:12,
    color:'white',
    marginLeft: 10,
    marginRight: 10,
  },
  control: {
    flexDirection: 'row',
    height: 44,
    alignItems:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
});