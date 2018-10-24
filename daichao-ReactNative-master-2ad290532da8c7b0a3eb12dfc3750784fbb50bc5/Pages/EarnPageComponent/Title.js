import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
    TouchableOpacity, DeviceEventEmitter
} from 'react-native';
import * as ScreenUtils from "../Common/ScreenUtils";

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');

export default class Title extends Component{
    constructor(props){
        super(props);
        this.state={
            title:''
        }
    }
    componentDidMount() {
        this.changePic = DeviceEventEmitter.addListener('title', (value) => {
            //这里面是要调用的方法，比如：刷新
            //value:是下面页面在 通知 时 ，所传递过来的参数
            this.setState({
                title:value
            })
        });
    }
    componentWillUnmount(){
        this.changePic.remove();
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        height: ScreenUtils.scaleSize(80),
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFE059',
        alignItems: 'center'
    },
    title:{
        fontSize:ScreenUtils.setSpText(22),
        color:'#4A4A4A'
    }

});