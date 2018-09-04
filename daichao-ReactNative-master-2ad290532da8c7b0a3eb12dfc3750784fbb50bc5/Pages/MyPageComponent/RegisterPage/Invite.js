import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Picker,
    FlatList,
    Dimensions, StatusBar
} from 'react-native';
const {width} = Dimensions.get('window');
export default class Invite extends Component{
    static navigationOptions={
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    render(){
        return(
            <View style={styles.wrap}>
                <TextInput
                    placeholder={'输入邀请码'}
                    style={{width:width,backgroundColor:'white',marginTop:10,fontSize:15,height:55}}
                    underlineColorAndroid={'transparent'}
                    keyboardType={'numeric'}
                />
                <Text style={{marginLeft:10,marginTop:8,fontSize:15}}>在好友分享链接中找到他的邀请码</Text>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('Detail')}
                        style={styles.touch}
                    >
                        <Text style={{fontSize:19,color:'black'}}>跳过</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('Detail')}
                        style={styles.touch}
                    >
                        <Text style={{fontSize:19,color:'black'}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    touch:{
        backgroundColor:'#FFE059',
        borderRadius:5,
        width:(width-60)/2,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20
    },
    wrap:{
        flex:1,
        backgroundColor:'#F3F4F6'
    }
});