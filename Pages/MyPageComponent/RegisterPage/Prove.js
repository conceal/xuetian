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
    Alert,
} from 'react-native';
import NetUtils from "../../Common/NetUtils";
import * as ScreenUtil from "../../Common/ScreenUtils";
const {width} = Dimensions.get('window');
let url = 'http://47.98.148.58/app/user/verificationCode.do';
export default class Prove extends Component{
    static navigationOptions={
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    constructor(props){
        super(props);
        this.netUtils=new NetUtils();
        this.state={
            time:60,
            inputTexts: new Array(6),
            text:'',
            istrue:1,
            isLoading:true,
            editable:true
        }
    }
    static defaultProps={
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
    _renderInputs() {
        let inputs = [];
        const {inputTexts} = this.state;
        for (let i = 0; i < 6; i++) {
            let input = <TextInput
                key={i}
                underlineColorAndroid="gray"
                editable={false}
                maxLength={1}
                style={styles.textInput}>
                {inputTexts[i]}
                </TextInput>;
            inputs.push(input);
        }
        return inputs;
    }

    textLogin(){
        console.log(this.state.text);
        this.netUtils.fetchNetRepository(url,
            {"VerificationCode":this.state.text},
        )
            .then(result => {
                console.log(result);
                let data = result.code;
                this.setState({
                    istrue:data,
                    isLoading:false
                });
                console.log(data);
                if (data === 0){
                    this.props.navigation.navigate('Invite');
                } else {
                    Alert.alert(
                        '提示', //提示标题
                        "验证码或者网络错误", //提示内容
                        [
                            {
                                text: '确定'
                            }
                        ] //按钮集合
                    );
                }
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            });
    }

    render(){
        const { editable } = this.state;
        const { params } = this.props.navigation.state;
        return(
            <View style={styles.container}>
                <Text style={{paddingTop:15,marginLeft:20,color:'black'}}>验证码已发送至{params.text}</Text>
                <TouchableOpacity
                    style={styles.partOne}
                    onPress={()=>{this.setState({editable:!this.state.editable})}}
                >
                    <View style={styles.partOne}>
                        {editable?<TextInput
                                ref={(ref) => this._input = ref}
                                autoFocus={true}
                                visible={false}
                                style={{height: 1, width: 1}}
                                maxLength={6}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    this.setState({
                                        inputTexts: Array.from(text),
                                        text:text
                                    });
                                    text.length === 6 && this._input.blur();
                                }}
                                onBlur={()=>{
                                    this.textLogin()
                                }}
                            />:
                            <View/>
                        }
                        {this._renderInputs()}
                    </View>
                </TouchableOpacity>
                {this.TextAdd()}

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
    },
    textInput:{
        width: ScreenUtil.scaleSize(95),
    }
});