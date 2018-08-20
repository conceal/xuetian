import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform, Image, Animated, Easing} from 'react-native';

export default class SimpleAnimated extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fadeInOpacity: new Animated.Value(0),
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    Animated.timing(this.state.fadeInOpacity, {
      toValue:1,
      duration:2000,
      easing:Easing.linear,
    }).start();
  };

  render(){
    return (
        <View style={styles.container}>
          <Animated.View style={[styles.content, {opacity:this.state.fadeInOpacity}]}>
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