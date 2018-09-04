import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    StatusBar,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";

let width =Dimensions.get('window').width;
let height =Dimensions.get('window').height;
export default class Message extends Component{
    constructor(props){
        super(props);
        this.state={
            content:null,
            mail:null
        }
    }
    static navigationOptions={
        headerTitle: '意见反馈',
        headerTitleStyle:{
            flex:1,
            textAlign: 'center'
        },
        headerRight:(
            <View/>
        ),
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    revise(){
        if(this.state.content === null){
            alert('请输入反馈信息')
        }else {
            if (this.state.mail === null){
                alert('请输入您的邮箱')
            } else {
                alert('您已反馈成功，感谢您的反馈')
            }
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder='请输入遇到的问题或建议...'
                    clearButtonMode='always'
                    underlineColorAndroid='transparent'
                    multiline={true}
                    onChangeText={(content) => {this.setState({content})}}
                />
                <View style={styles.wrap}>
                    <Text style={styles.text}>QQ邮箱:</Text>
                    <TextInput
                        style={styles.textInputStyle2}
                        placeholder='选填，便于我们联系你'
                        clearButtonMode='always'
                        underlineColorAndroid='transparent'
                        maxLength={11}
                        onChangeText={(mail) => {this.setState({mail})}}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button2Style}
                    onPress={() => this.revise()}
                >
                    <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>提交</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles=StyleSheet.create({
    textInputStyle:{
        backgroundColor:'white',
        width:width,
        height:height/4,
        paddingTop:ScreenUtils.scaleSize(10)
    },
    textInputStyle2:{
        width:width*0.6,
        height: ScreenUtils.scaleSize(88),
        paddingTop:ScreenUtils.scaleSize(18),
    },
    wrap:{
        flexDirection:'row',
        backgroundColor:'white',
        width:width,
        height: ScreenUtils.scaleSize(88),
        marginTop:ScreenUtils.scaleSize(20)
    },
    text:{
        width:width*0.25,
        height: ScreenUtils.scaleSize(88),
        fontSize:ScreenUtils.setSpText(17),
        paddingLeft:ScreenUtils.scaleSize(15),
        paddingTop:ScreenUtils.scaleSize(18),
    },
    button2Style: {
        width: ScreenUtils.scaleSize(690),
        height: ScreenUtils.scaleSize(88),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:6,
        backgroundColor: '#FFE059',
        marginTop: ScreenUtils.scaleSize(27),
        marginBottom: ScreenUtils.scaleSize(27),
        alignSelf: 'center',
    },

});