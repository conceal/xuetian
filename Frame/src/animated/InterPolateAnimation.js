import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, Image, Animated, Easing} from 'react-native';

export default class SimpleAnimated extends Component{
  constructor(props) {
    super(props);
    this.state = {
      translateValue: new Animated.Value(1),
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    Animated.spring(this.state.translateValue,
        {
          toValue:0,
          velocity:7,
          tension:-20,
          friction:3,
        }
    ).start();
  };

  render(){
    return (
        <View style={styles.container}>
          <Animated.View style={[styles.content, {transform:[
              {scale: this.state.translateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 3],
                })},
              {translateX: this.state.translateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 300],
                })},
              {rotate: this.state.translateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    '0deg', '720deg'
                  ],
                })},
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