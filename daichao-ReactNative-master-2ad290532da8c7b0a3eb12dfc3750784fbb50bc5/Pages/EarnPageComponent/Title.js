import React , {Component} from 'react';
import {
    StyleSheet ,
    View ,
    TextInput ,
    Text ,
    Image,
    TouchableOpacity
} from 'react-native';
import * as ScreenUtils from "../Common/ScreenUtils";

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');

export default class Title extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>赚钱</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        paddingLeft:ScreenUtils.scaleSize(30),
        paddingBottom:ScreenUtils.scaleSize(11),
        backgroundColor:'#FFE059',
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontSize:ScreenUtils.setSpText(22),
        color:'#4A4A4A'
    }

});