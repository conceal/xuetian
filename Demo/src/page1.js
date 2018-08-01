import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
export default class Page1 extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.partOne}>
                    <Text style={{paddingLeft:20,color:'red'}}>1.输入手机号</Text>
                    <Text> > </Text>
                    <Text style={{color:'black'}}>2.输入验证码</Text>
                    <Text> > </Text>
                    <Text>3.设置密码</Text>
                </View>
                <TextInput
                    placeholder={'请输入手机号'}
                    maxLength={11}
                    placeholderTextColor={'#DBDBDB'}
                />
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Page2')}
                                  style={styles.btn}
                >
                    <Text style={{color:'white'}}>获取验证码</Text>
                </TouchableOpacity>
            </View>
        );

    }
}
const styles=StyleSheet.create({
    container:{

    },
    partOne:{
          flexDirection:'row',
        justifyContent:'center',
        paddingTop:10,
        paddingBottom:10,
        alignItems:'center'
    },
    btn:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        height:40,
        paddingTop:10
    }
})