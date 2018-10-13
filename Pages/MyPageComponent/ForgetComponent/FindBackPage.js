import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    TextInput,
    Picker,
    Dimensions,
    StatusBar,
    Alert,
} from 'react-native';
import NetUtils from "../../Common/NetUtils";
const {width} = Dimensions.get('window');
let url = 'http://47.98.148.58/app/user/enrollTelForgetPwd.do';
export default class FindBackPage extends Component{
    constructor(props){
        super(props);
        this.netUtils=new NetUtils();
        this.state={
            text:''
        }
    }
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
    state={
        num:'86',
        text:'',
        click:false
    };
    Send(){
        this.props.navigation.navigate('ProvePage',{text:this.state.text},{click:this.state.click});
    }
    _CheckProve(Num) {
        const correctnum =/^1(3|4|5|7|8)\d{9}$/;
        let regNum = new RegExp(correctnum);
        if (!regNum.test(Num)){
            Alert.alert(
                '提示', //提示标题
                "请输入正确的手机号", //提示内容
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
    textLogin(){
        this.netUtils.fetchNetRepository(url,
            {"telNumber":this.state.text},
        )
            .then(result => {
                console.log(result);
                if(result.code === 0){
                    this.Send();
                }else {
                    Alert.alert(
                        '提示', //提示标题
                        "手机号未注册", //提示内容
                        [
                            {
                                text: '确定'
                            }
                        ] //按钮集合
                    );
                }
            })
    }
    render(){
        return(
            <View style={styles.First}>
                <View style={styles.container}>
                    <Picker
                        selectedValue={this.state.num}
                        onValueChange={(num)=>this.setState({num:num})}
                        style={styles.picker}
                        mode='dropdown'
                    >
                        <Picker.Item label='+86' value={'移动'} style={{fontSize:5}}/>
                        <Picker.Item label='+10' value={'联通'} style={{fontSize:5}}/>
                        <Picker.Item label='+00' value={'电信'} style={{fontSize:5}}/>
                    </Picker>
                    <TextInput
                        placeholder={'手机号'}
                        maxLength={11}
                        style={{width:width-50,backgroundColor:'white'}}
                        underlineColorAndroid={'transparent'}
                        keyboardType={'numeric'}
                        onChangeText={(text)=>this.setState({text:text,click:true})}
                    />
                </View>
                <TouchableOpacity
                    onPress={()=>{
                        if (this.state.text !== null&&this.state.text !== ""){
                            this._CheckProve(parseInt(this.state.text))
                        } else {
                            Alert.alert(
                                '提示', //提示标题
                                "请输入手机号", //提示内容
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
                    <Text style={{fontSize:19,color:'black'}}>获取验证码</Text>
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
    container:{
        flexDirection:'row',
        paddingTop:20,
        paddingBottom:40,
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
});