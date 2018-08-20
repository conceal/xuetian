import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, Image, Animated, Easing} from 'react-native';

export default class SimpleAnimated extends Component{
  constructor(props) {
    super(props);
    this.state = {
      translateValue: new Animated.ValueXY({x:0, y:0}),
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.state.translateValue.setValue({x:0, y:0});
    Animated.decay( //以一个初始速度开始并且逐渐减慢停止。 S=vt-（at^2）/2   v=v - at
      this.state.translateValue,
        {
          velocity:7,
          deceleration:0.1,
        }
    ).start();
  };

  render(){
    return (
        <View style={styles.container}>
          <Animated.View style={[styles.content, {transform:[
              {translateX:this.state.translateValue.x},
              {translateY:this.state.translateValue.y},
            ]}]}>
            <Text style={[{textAlign:'center'}]}>Hello World!</Text>
          </Animated.View>
          <TouchableOpacity style={styles.content} onPress={this.onPress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Press me!</Text>
            </View>
          </TouchableOpacity>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    marginTop:25,
    flex:1,
  },
  content:{
    backgroundColor:'rgba(200, 230, 255, 0.8)',
    marginBottom:10,
    justifyContent:'center',
    alignSelf:'center',
  },
  button:Platform.select({
    ios:{},
    android:{
      elevation:4,
      backgroundColor: '#2196F3',
      borderRadius:2,
      width:100,
      height:30,
    },
    justifyContent: 'center',
    alignSelf:'center',
  }),
  buttonText:{
    alignSelf:'center',
  }
});