import React, {Component} from 'react';
import {StyleSheet, View, Image,Text, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import SplashScreen from "rn-splash-screen"
import Swiper from 'react-native-swiper';
import HomeTabs from './Common/HomeTabs';
let {width, height} = Dimensions.get('window');

export default class GuidePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      isLogin: false,
    }
  }

  componentDidMount() {
    global.setTimeout(()=> {
      this.setState({isLoading: false});
    }, 1000);
  }

  componentDidUpdate() {
    if(!this.state.isLoading){
      SplashScreen.hide();
    }
  }

  render() {
    if(this.state.isLoading)
      return null;

    return (
        <Swiper
            style={styles.container}
            showsButton={true}
            autoplay={false}
            paginationStyle={{bottom:30}}
            loop={false}

        >
          <Image style={styles.image} source={require('../res/images/page1.png')}/>
          <Image style={styles.image} source={require('../res/images/page2.png')}/>
          <ImageBackground style={styles.button} source={require('../res/images/page3.png')}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={()=> this.props.navigation.navigate('HomeTabs')}
                style={styles.touch}
            >
              <Text>立即进入</Text>
            </TouchableOpacity>
          </ImageBackground>
        </Swiper>
    )
    }
}

const styles = StyleSheet.create({
  container:{
  },
  swipe1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: height,
  },
  button: {
    flex: 1,
    width: width,
    height:5,
    alignItems: 'center',
  },
  touch: {
    width: width/2,
    height: 50,
    borderRadius: 10,
    position: 'absolute',
    bottom: 36,
    backgroundColor:'#FFE059',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
