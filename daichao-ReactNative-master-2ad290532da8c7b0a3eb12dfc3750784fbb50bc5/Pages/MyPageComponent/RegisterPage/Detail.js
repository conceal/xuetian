import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Picker,
    Dimensions, StatusBar
} from 'react-native';
import NetUtils from "../../Common/NetUtils";
const {width} = Dimensions.get('window');
let url = 'http://tsmsy.natapp1.cc/app/user/enrollInfo.do';
export default class Send extends Component{
    constructor(props){
        super(props);
        this.netUtils=new NetUtils();
        this.state={
            nickName:'',
            password:0
        }
    }
    static navigationOptions={
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    textLogin(){
        this.netUtils.fetchNetRepository(url,
            {"userName":this.state.nickName,"password":this.state.password},
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.partOne}>
                    <Image source={require('../../../res/Images/icon.png')}
                           style={{width:90,height:90,borderRadius:45,marginBottom:20,marginTop:15}}
                    />
                </View>
                <View style={styles.partTwo}>
                    <TextInput
                        placeholder={'昵称'}
                        style={{width:width,backgroundColor:'white',marginBottom:2,height:45}}
                        underlineColorAndroid={'transparent'}
                        keyboardType={'default'}
                        onChangeText={(nickName)=>{this.setState({nickName})}}
                    />
                    <TextInput
                        placeholder={'密码'}
                        style={{width:width,backgroundColor:'white',marginBottom:2,height:45}}
                        underlineColorAndroid={'transparent'}
                        keyboardType={'default'}
                        secureTextEntry={true}
                    />
                    <TextInput
                        placeholder={'确认密码'}
                        style={{width:width,backgroundColor:'white',marginBottom:2,height:45}}
                        underlineColorAndroid={'transparent'}
                        keyboardType={'default'}
                        secureTextEntry={true}
                        onChangeText={(password)=>{this.setState({password})}}
                    />
                </View>

                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Second');
                        this.textLogin()
                    }}
                    style={styles.touch}
                >
                    <Text style={{alignSelf:'center',fontSize:19,color:'black'}}>完成</Text>
                </TouchableOpacity>

                <View style={styles.partThree}>
                    <Text>点击完成，表示你已同意</Text>
                    <TouchableOpacity
                        onPress={()=>{}}
                    >
                        <Text style={{color:'blue'}}>《米米贷用户协议》</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F3F4F6'
    },
    partOne:{
        paddingTop:10,
        justifyContent:'center',
        alignItems:'center'
    },
    partTwo:{
        marginTop:40,
        paddingTop:5
    },
    touch:{
        backgroundColor:'#FFE059',
        borderRadius:5,
        width:width-60,
        height:50,
        alignSelf:'center',
        justifyContent:'center',
        marginTop:20
    },
    partThree:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:5
    }
});