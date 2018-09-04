import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Picker,
    Dimensions,
    StatusBar
} from 'react-native';
const {width} = Dimensions.get('window');
export default class NewPasswordPage extends Component{
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
        return(
            <View style={styles.First}>
                <View style={styles.container2}>
                    <View style={{justifyContent:'center',
                        alignItems:'center',width:70,backgroundColor:'white'}}>
                        <Text style={styles.old}>新密码</Text>
                    </View>
                    <TextInput
                        placeholder={'输入新密码'}
                        maxLength={11}
                        style={{width:width-70,backgroundColor:'white'}}
                        underlineColorAndroid={'transparent'}
                        keyboardType={'default'}
                    />

                </View>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Second')}
                    style={styles.touch}
                >
                    <Text style={{fontSize:19,color:'black'}}>完 成</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    First:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#F3F4F6'
    },
    container2:{
        flexDirection:'row',
        paddingTop:2,
        paddingBottom:40,
    },
    container1:{
        flexDirection:'row',
        paddingTop:20,
    },
    picker:{
        width:80,
        alignItems:'center',
        backgroundColor:'white',
        color:'gray',
        marginLeft:30
    },
    touch:{
        backgroundColor:'#FFE059',
        borderRadius:5,
        width:width-60,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    },
    old:{
        color:'black',
        fontSize:15
    }
});