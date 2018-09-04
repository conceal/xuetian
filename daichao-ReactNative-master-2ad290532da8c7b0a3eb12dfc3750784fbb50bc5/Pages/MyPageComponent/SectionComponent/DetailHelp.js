import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    Dimensions,
    StatusBar
} from 'react-native';
import Data from "../../../res/json/MyQuestionAnswer";
import * as ScreenUtils from "../../Common/ScreenUtils";
let width=Dimensions.get('window').width;

export default class Message extends Component{
    static navigationOptions =  ({ navigation }) =>({
        title: navigation.state.params.title,
        headerTitleStyle:{
            flex:1,
            textAlign: 'center',
        },
        headerRight:(
            <View>

            </View>
        ),
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    });
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <View style={styles.wrap}>
                    <Text style={styles.title}>{Data[0].title}</Text>
                    <View style={{backgroundColor:'gray',height:1,width:0.9*width,justifyContent:'center',alignSelf:'center'}}></View>
                </View>
                <Text style={styles.content}>{Data[0].content}</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    title:{
        fontSize:ScreenUtils.setSpText(22),
        color:'black',
        marginLeft:0.05*width
    },
    content:{
        fontSize:ScreenUtils.setSpText(18),
        marginLeft:0.05*width,
        marginRight:0.05*width,
        marginTop:ScreenUtils.scaleSize(40)
    },
    wrap:{
        width:width,
        height:ScreenUtils.scaleSize(80),
        paddingTop:ScreenUtils.scaleSize(25),
        paddingBottom:ScreenUtils.scaleSize(25)
    }
});