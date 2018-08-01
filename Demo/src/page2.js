import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
export default class Page2 extends Component{
    render(){
        return(
                <View style={styles.container}>
                    <View style={styles.partOne}>
                    <Text style={{paddingLeft:20,color:'black'}}>1.输入手机号</Text>
                    <Text> > </Text>
                    <Text style={{color:'red'}}>2.输入验证码</Text>
                    <Text> > </Text>
                    <Text>3.设置密码</Text>
                </View>
                    <View style={styles.partTwo}>
                        <Text style={{fontSize:20,paddingBottom:10,color:'black'}}
                              textAlign={'center'}
                        >输入验证码</Text>
                         <View style={styles.partTwoTwo}>
                             <Text>请输入手机尾号</Text>
                             <Text>1789</Text>
                             <Text>收到的短信验证码</Text>
                         </View>
                    </View>
                    <View style={styles.partThree}>
                        <TextInput
                            placeholder={'        请输入短信中的验证码'}
                            maxLength={11}
                            placeholderTextColor={'#DBDBDB'}
                            underlineColorAndroid={'green'}
                        />
                        <View style={styles.partThreeTwo}>
                            <Text style={{color:'#DBDBDB'}}>收不到验证码？</Text>
                            <Text style={{paddingLeft:15}}>60s倒计时</Text>
                            <TouchableOpacity
                                onPress={()=>{}}
                            >
                                <Text style={{color:'green',paddingLeft:2}}>点击重发</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Page3')}
                                          style={styles.touch}
                        >
                            <Text style={{color:'white'}}>提交验证码</Text>
                        </TouchableOpacity>
                    </View>
                </View>
               );
    }
}
const styles = StyleSheet.create({
    container:{

    },
    partOne:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:10,
        paddingBottom:10,
        alignItems:'center'
    },
    partTwo:{
        justifyContent:'center',
        alignItems:'center',
        paddingTop:30
    },
    partTwoTwo:{
        flexDirection:'row',
        justifyContent:'center'
    },
    partThree:{
        paddingTop:30
    },
    partThreeTwo:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        paddingTop:8,
        paddingBottom:10
    },
    touch:{
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        height:40
    }
})