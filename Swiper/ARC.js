/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View , AppRegistry , Image,ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper';
let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
            <Swiper 
                style={styles.swiperStyle}
                height={200}
                horizontal={true}
                autoplay={true}
                autoplayTimeout={2}
                showsButtons={false}
                showsPagination={true}
                paginationStyle={styles.paginationStyle}
            >
            <ImageBackground style={styles.imageStyle} source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}}>
                <Text>生命有止，精神无止</Text>
            </ImageBackground>
            <ImageBackground style={styles.imageStyle} source={{uri:'http://ww1.sinaimg.cn/large/0077HGE3gy1fqg2kennfqj30go0aft93.jpg'}}>
                <Text>生命有止，精神无止</Text>
            </ImageBackground>
            <ImageBackground style={styles.imageStyle} source={{uri:'http://ww1.sinaimg.cn/large/0077HGE3gy1fqg2m1ygodj30dw09a0tr.jpg'}}>
                <Text>生命有止，精神无止</Text>
            </ImageBackground>
            </Swiper>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        height:200,
    },
    imageStyle:{
        width:width,
        height:200,
        justifyContent:'flex-end',
        alignItems:'center',
        paddingBottom:24
    },
    paginationStyle:{
        backgroundColor:'rgba(0,0,0,0.2)',
        height:24,
        bottom:0

    },
})

