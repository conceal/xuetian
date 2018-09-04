import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";
const {width,height} = Dimensions.get('window');
export default class Change_Teltel extends Component{
    static navigationOptions={
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center'
        },
        headerRight: (
            <View/>
        ),
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    render(){
        const { params } = this.props.navigation.state;
        return(
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../../res/Images/Tel.png')}
                />
                <Text style={styles.text}>你的手机号:{params.text}</Text>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Change_TelChange')}
                    style={styles.touch}
                >
                    <Text style={{fontSize:19,color:'black'}}>修改手机号</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F3F4F6',
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        marginTop:ScreenUtils.scaleSize(20),
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        marginTop:ScreenUtils.scaleSize(60),
        fontSize:ScreenUtils.setSpText(18),
        color:'black'
    },
    touch:{
        backgroundColor:'#FFE059',
        borderRadius:5,
        width:width-40,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    },

});