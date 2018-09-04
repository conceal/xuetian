import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    Dimensions,
    StatusBar
} from 'react-native';

import * as ScreenUtils from "../../Common/ScreenUtils";
let width=Dimensions.get('window').width;

export default class MyWeChat extends Component{
    static navigationOptions={
        headerTitle: '微信公众号',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight:(
            <View/>
        ),
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <View style={styles.wrap}>
                    <Image
                        style={styles.Img}
                        source={require('../../../res/Images/icon2.jpg')}
                    />
                    <View style={styles.row}>
                        <Image
                            style={styles.image}
                            source={require('../../../res/Images/icon.png')}
                        />
                        <View style={styles.textStyle}>
                            <Text style={styles.header}>米米信</Text>
                            <Text style={styles.content}>专业解决贷款申请、个人征信问题与您的资金问题。</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F3F4F6',
        justifyContent:'center',
        alignItems:'center',
    },
    wrap:{
        width:0.86*width,
        borderWidth:1,
        borderColor:'gray',
    },
    Img:{
        width:0.85*width,
        height:0.85*width,
        resizeMode:'cover'
    },
    row:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        width:0.85*width,
        height:ScreenUtils.scaleSize(150),
        backgroundColor:'#DEDEDE'
    },
    image:{
        width: ScreenUtils.scaleSize(80),
        height: ScreenUtils.scaleSize(80),
        borderRadius: ScreenUtils.scaleSize(80 / 2),
    },
    textStyle:{

    },
    header:{
        fontSize:ScreenUtils.setSpText(16),
        color:'black'
    },
    content:{
        fontSize:ScreenUtils.setSpText(11),
        color:'black'
    }

});
