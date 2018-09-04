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
    Dimensions, StatusBar,
} from 'react-native';
import NetUtils from "../../Common/NetUtils";
const {width} = Dimensions.get('window');
let url = 'http://tsmsy.natapp1.cc/app/user/verificationCode.do';
export default class Change_TelProve extends Component{
    static navigationOptions={
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    constructor(props){
        super(props);
        this.netUtils=new NetUtils();
        this.state={
            time:30,
            text:''
        }
    }
    static  defaultProps={
        duration:1000,
    };
    startTimer(){
        let obj = this;
        this.timer=setInterval(function(){
            if(obj.state.time === 0){
                obj.setState({
                    time:0
                })
            }else{
                obj.setState({
                    time:obj.state.time-1
                })
            }
        },this.props.duration);
    }
    componentDidMount() {
        this.startTimer();
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        this.timer && clearTimeout(this.timer);
    };
    TextAdd(){
        if(this.state.time === 0){
            return <View style={{height:30}}/>
        }else{
            return  <Text style={{marginLeft:20,marginTop:10}}>重新发送{this.state.time}s</Text>
        }
    }
    textLogin(){
        this.netUtils.fetchNetRepository(url,
            {"VerificationCode":this.state.text},
        )
    }
    render(){
        const { params } = this.props.navigation.state;
        return(
            <View style={styles.container}>
                <Text style={{paddingTop:15,marginLeft:20,color:'black'}}>验证码已发送至{params.text}</Text>
                <View style={styles.partOne}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.Input}
                        onChangeText={(text)=>{this.setState({text})}}
                        keyboardType={'numeric'}
                    />

                </View>

                {this.TextAdd()}

                <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('Change_Teltel');
                        this.textLogin()
                    }}
                >
                    <Text style={{marginLeft:220,marginTop:10}}>跳过</Text>
                </TouchableOpacity>


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
        flexDirection:'row',
        justifyContent:'space-around',
        marginLeft:20,
        width:width-40,
    },
    Input:{
        borderBottomColor:'gray',
        borderBottomWidth:1,
        width:width-150
    }
});