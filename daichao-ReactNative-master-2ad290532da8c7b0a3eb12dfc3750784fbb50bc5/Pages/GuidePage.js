import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Dimensions,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');
export default class GuidePage extends Component{
    render(){
        return(
            <View style={{height:height,width:width}}>
                <Swiper
                    style={styles.wrap}
                    loop={false}
                    autoplay={false}
                    horizontal={true}
                    paginationStyle={{bottom:30}}
                    dotStyle={styles.notactive}
                    activeDotStyle={styles.active}
                >
                    <Image resizemode={'contain'} style={styles.image} source={require('../res/Images/page1.png')}/>
                    <Image resizemode={'contain'} style={styles.image} source={require('../res/Images/page2.png')}/>
                    <ImageBackground
                        style={styles.image}
                        source={require('../res/Images/page3.png')}
                    >
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={()=>this.props.navigation.replace('First')}
                            style={styles.button}
                        >
                            <View>
                                <Text>立即体验</Text>
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>
                </Swiper>
            </View>

        )
    }
}
const styles= StyleSheet.create({
    wrap:{
    },
    image:{
        width:width,
        height:height,
        flex:1,
        flexDirection:'column-reverse',
        alignItems:'center',
        paddingBottom:30
    },
    button:{
        backgroundColor:'#FFE059',
        borderRadius:10,
        width:width/2,
        height:50,
        alignItems:'center',
        justifyContent:'center'
    },
    notactive: {
        backgroundColor:'gray',
        height:10,
        width:10,
        borderRadius:5,
    },
    active: {
        backgroundColor:'#FFE059',
        height:10,
        width:23,
        borderRadius:5,
    },
});
