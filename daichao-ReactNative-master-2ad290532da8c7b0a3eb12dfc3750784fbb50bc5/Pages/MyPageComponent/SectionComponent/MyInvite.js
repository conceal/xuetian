import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    FlatList,
    Text,
    Dimensions,
    StatusBar
} from 'react-native';
import Data from '../../../res/json/MyInviteData';
import * as ScreenUtils from "../../Common/ScreenUtils";
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default class Message extends Component{
    static navigationOptions={
        headerTitle: '我的邀请',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight:(
            <View>

            </View>
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
                <FlatList
                    renderItem={this.ViewList}
                    data={Data}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
    ViewList=(item)=>{
        return(
            <View style={styles.wholeview}>
                <View style={styles.wrap}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image style={styles.imageStyle} source={require('../../../res/Images/icon.png')}/>
                        <Text style={styles.nameStyle}>{item.item.name}</Text>
                    </View>
                    <Text style={styles.teleStyle}>{item.item.tele}</Text>
                </View>
                <View style={{marginLeft:ScreenUtils.scaleSize(20),backgroundColor:'gray',height:1,width:width}}></View>
            </View>
        );
    };
}

const styles=StyleSheet.create({
    wholeview:{
        flexDirection:'column',
    },
    wrap:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        width:ScreenUtils.scaleSize(749),
        height:0.099*height,
        justifyContent:'space-between'
    },
    container:{
      flex:1
    },
    nameStyle:{
        marginLeft:ScreenUtils.scaleSize(30),
        fontSize:ScreenUtils.setSpText(18),
        color:'black'
    },
    teleStyle:{
        marginRight:ScreenUtils.scaleSize(20),
        fontSize:ScreenUtils.setSpText(15.5),
    },
    imageStyle: {
        marginLeft:ScreenUtils.scaleSize(20),
        width: ScreenUtils.scaleSize(88),
        height: ScreenUtils.scaleSize(88),
        borderRadius: ScreenUtils.scaleSize(88 / 2),
    },

});