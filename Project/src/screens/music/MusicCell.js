import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Animated, Easing} from 'react-native';
import {DeviceInfo} from '../../config/utils/utils';
import LoveHeart from '../../config/LoveHeart';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MusicCell extends Component{
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.state = {
      isLove: false,
      isPlay: false,
    }
  }

  render() {
    let data = this.props.MusicData;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
        <View style={styles.container}>
          <Text style={styles.titleStyle}>{data.title}</Text>
          <Text style={styles.authorStyle}>{data.author}</Text>
          <View style={{ flex: 1, height: 110, justifyContent: 'center', alignItems: 'center'}}>
            <Video
                source={{uri: data.url}}
                ref={(ref)=> {this.player = ref}}
                rate={1}
                volume={1.0}
                paused={!this.state.isPlay}
                resizeMode='center'
                repeat={true}
                playInBackground={true}
                playWhenInactive={true}
            />
            <Animated.Image
                style={[styles.imgStyle, {transform:[{rotate:spin}]}]}
                source={{uri:data.pic}}
            />
            <TouchableOpacity
                style={{position: 'absolute'}}
                onPress={()=> this.setState({isPlay: !this.state.isPlay})}
            >
              {
                this.state.isPlay ?
                    <View>
                      {this.spin()}
                    <Icon name='pause-circle' size={32} color='#030303' />
                    </View>:
                    <View>
                      {this.spin()}
                    <Icon name='play-circle' size={32} color='#030303' />
                    </View>
              }
            </TouchableOpacity>
          </View>
          <View style={styles.toolStyle}>
            <LoveHeart size={20} loveColor={'#EE2C2C'} disLoveColor={'gray'}/>
            <TouchableOpacity activeOpacity={1} onPress={()=> alert('暂时不能分享')}>
              <Icon name='share' size={20} color='gray'/>
            </TouchableOpacity>
          </View>
        </View>
    )
  }

  spin() {
    this.spinValue.setValue(0);
    if (this.state.isPlay) {
      Animated.timing(
          this.spinValue,
          {
            toValue: 1,
            duration: 6666,
            easing: Easing.linear
          }
      ).start(() => this.spin())
    }else{
      Animated.timing(
          this.spinValue,
          {
            toValue: 1,
            duration: 6666,
            easing: Easing.linear
          }
      ).stop()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    elevation: 3,
    borderRadius: (DeviceInfo.deviceWidth-20)*0.03
  },
  titleStyle: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
  },
  authorStyle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
    marginLeft: 10,
  },
  imgStyle: {
    height: 110,
    width: 110,
    borderRadius: 55,
    alignSelf: 'center',
  },
  toolStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 5,
  }
});
