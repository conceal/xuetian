import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, Image, Animated, Easing, PanResponder} from 'react-native';

export default class AnimatedGestureDemo extends Component {
  state:{
    trans:AnimatedValueXY,
  };

  PanResponder:PanResponder;

  constructor(props) {
    super(props);
    this.state = {
      trans: new Animated.ValueXY(),
    };
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: ()=> true,
      onPanResponderMove: Animated.event(
          [null, {dx:this.state.trans.x, dy:this.state.trans.y}]
      ),
      onPanResponderRelease: ()=> {
        Animated.spring(this.state.trans, {toValue:{x:0, y:0}}).start();
      },
      onPanResponderTerminate: ()=> {
        Animated.spring(this.state.trans, {toValue: {x:0, y:0}}).start();
      },
    });
  }

  render(){
    return (
        <View style={styles.container}>
          <Animated.View
            style={{
              width:80,
              height:80,
              borderRadius:40,
              backgroundColor:'blue',
              transform: [
                {translateX:this.state.trans.x},
                {translateY:this.state.trans.y},
              ],
            }}
            {...this.PanResponder.panHandlers}
          >
          </Animated.View>
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