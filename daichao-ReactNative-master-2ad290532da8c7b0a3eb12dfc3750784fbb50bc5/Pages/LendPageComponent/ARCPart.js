import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import * as ScreenUtils from "../Common/ScreenUtils";
let url = 'http://tsmsy.natapp1.cc/app/goods/homePage.do';


export default class ARCPart extends Component{

    render(){
        return(
            <View style={styles.container}>
                <Swiper
                    style={styles.wrap}
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={3}
                    horizontal={true}
                    paginationStyle={{bottom:ScreenUtils.scaleSize(7)}}
                    dotStyle={{backgroundColor:'#E1E1E1', width:ScreenUtils.scaleSize(14), height:ScreenUtils.scaleSize(14)}}
                    activeDotStyle={{backgroundColor:'#F6D574', width:ScreenUtils.scaleSize(14), height:ScreenUtils.scaleSize(14)}}
                >
                    <Image resizemode={'contain'} style={styles.image} source={require('../../res/Images/banner1.png')}/>
                    <Image resizemode={'contain'} style={styles.image} source={require('../../res/Images/banner2.png')}/>
                </Swiper>
            </View>

        )
    }
}
const styles= StyleSheet.create({
    wrap:{
    },
    container:{
        width:ScreenUtils.scaleSize(750),
        height:ScreenUtils.scaleSize(280)
    },
    image:{
        width:Dimensions.width,
        height:ScreenUtils.scaleSize(280)
    },
});