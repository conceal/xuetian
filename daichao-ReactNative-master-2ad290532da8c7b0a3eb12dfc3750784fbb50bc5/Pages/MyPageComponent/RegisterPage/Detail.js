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
    StatusBar,
    Alert
} from 'react-native';
import NetUtils from "../../Common/NetUtils";
import JPushModule from "jpush-react-native/index";
const {width} = Dimensions.get('window');
let url = 'http://47.98.148.58/app/user/enrollInfo.do';
let URL = 'http://47.98.148.58/app/user/setRegistrationId.do';
export default class Detail extends Component{
    constructor(props){
        super(props);
        this.netUtils=new NetUtils();
        this.state={
            nickName:'',
            password:0,
            Fpassword:0
        }
    }
    static navigationOptions={
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    componentDidMount(){
        JPushModule.initPush();
        JPushModule.getRegistrationID((registrationId) => {
            this.netUtils.fetchNetRepository(URL,
                {"registrationId":registrationId});
        });
    }

    textLogin(){
        this.netUtils.fetchNetRepository(url,
            {"userName":this.state.nickName,"password":this.state.password},
        )
            .then(result => {
                if(result.code === 0){
                    Alert.alert(
                        '提示', //提示标题
                        '注册成功', //提示内容
                        [
                            {
                                text: '确定'
                            }
                        ] //按钮集合
                    );
                    this.props.navigation.navigate('Second');
                }
                if (result.code === 1){
                    Alert.alert(
                        '提示', //提示标题
                        '用户已存在，请勿重复注册', //提示内容
                        [
                            {
                                text: '确定'
                            }
                        ] //按钮集合
                    );
                    this.props.navigation.navigate('Second');
                }
            })
    }
    _CheckNum(Password) {
        const correctPass =/^[a-zA-Z0-9]{6,21}$/;
        let regPass = new RegExp(correctPass);
        if (!regPass.test(Password)){
            Alert.alert(
                '提示', //提示标题
                "请输入正确的密码", //提示内容
                [
                    {
                        text: '确定'
                    }
                ] //按钮集合
            );
        }else {
            this.textLogin()
        }
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
                        maxLength={10}
                        onChangeText={(nickName)=>{this.setState({nickName})}}
                    />
                    <TextInput
                        placeholder={'密码'}
                        style={{width:width,backgroundColor:'white',marginBottom:2,height:45}}
                        underlineColorAndroid={'transparent'}
                        keyboardType={'default'}
                        secureTextEntry={true}
                        onChangeText={(Fpassword)=>{this.setState({Fpassword})}}
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
                        if (this.state.password === 0){
                            Alert.alert(
                                '提示', //提示标题
                                "请输入密码", //提示内容
                                [
                                    {
                                        text: '确定'
                                    }
                                ] //按钮集合
                            );

                        }else if ((this.state.Fpassword === this.state.password)&&(this.state.Fpassword!==0&&this.state.password!==0)) {
                            let str = this.state.password;
                            let Str = str.replace(/\"/g,"");
                            this._CheckNum(Str);
                        }else {
                            Alert.alert(
                                '提示', //提示标题
                                "请确认两次密码输入一致", //提示内容
                                [
                                    {
                                        text: '确定'
                                    }
                                ] //按钮集合
                            );
                        }
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
                        <Text style={{color:'blue'}}>《米米来用户协议》</Text>
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