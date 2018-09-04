import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    TextInput,
    Picker,
    Dimensions, StatusBar
} from 'react-native';
import NetUtils from "../../Common/NetUtils";
import * as ScreenUtils from "../../Common/ScreenUtils";
const {width} = Dimensions.get('window');
let url = 'http://tsmsy.natapp1.cc/app/user/enrollTel.do';
export default class Change_TelChange extends Component{
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
        this.props.navigation.navigate('Change_TelProve',{text:this.state.text},{click:this.state.click});
    }
    textLogin(){
        this.netUtils.fetchNetRepository(url,
            {"telNumber":this.state.text},
        )
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
                        itemStyle={{height:50,}}
                    >
                        <Picker.Item label='+86' value={'移动'} style={{fontSize:5}}/>
                        <Picker.Item label='+10' value={'联通'} style={{fontSize:5}}/>
                        <Picker.Item label='+00' value={'电信'} style={{fontSize:5}}/>
                    </Picker>
                    <TextInput
                        placeholder={'手机号'}
                        maxLength={11}
                        style={{width:width-50, height: 50, backgroundColor:'white'}}
                        underlineColorAndroid={'transparent'}
                        keyboardType={'numeric'}
                        onChangeText={(text)=>this.setState({text:text,click:true})}
                    />
                </View>
                <TouchableOpacity
                    onPress={()=>{
                        this.Send();
                        this.textLogin()

                    }}
                    style={styles.touch}
                >
                    <Text style={{fontSize:19,color:'black'}}>下一步</Text>
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
        height: 50,
    },
    picker:{
        width:80,
        height: 50,
        justifyContent:'center',
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
