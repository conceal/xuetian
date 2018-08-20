import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, Image, Animated, Easing, ScrollView, Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');

export default class AnimatedScrollDemo extends Component {
  // state: {
  //   xOffset: Animated,
  // };

  constructor(props) {
    super(props);
    this.state = {
      xOffset: new Animated.Value(1.0)
    };
  }

  render(){
    return (
        <View style={styles.container}>
          <ScrollView
              horizontal={true}
              showHorizontalScrollIndicator={false}
              style={{width:width, height:height}}
              onScroll={Animated.event(
                  [{nativeEvent:{contentOffset:{x:this.state.xOffset}}}]
              )}
              scrollEventThrottlr={100}
          >
            <Animated.Image
                source={{uri:'http://ww1.sinaimg.cn/large/0077HGE3gy1fu8e6zucsvj30dw0a845w.jpg'} }
                style={{height:height, width:width, opacity:this.state.xOffset.interpolate({
                    inputRange:[0, 375],
                    outputRange:[1.0, 0.0]
                  }),}}
                resizeMode='cover'
            />
            <Image
                source={{uri:'http://ww1.sinaimg.cn/large/0077HGE3gy1fu8eaxt6g1j30go0afgt5.jpg'}}
                style={{height:height, width:width}}
                resizeMode='cover'
            />
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginTop:25,
    flex:1,
  }
});

