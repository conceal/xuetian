import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    Dimensions,
    StatusBar
} from 'react-native';

import * as ScreenUtils from "../../Common/ScreenUtils";
import NetUtils from "../../Common/NetUtils";
let width=Dimensions.get('window').width;
let url ='http://47.98.148.58/app/user/weChatOfficialAccount.do';
let URL ='http://47.98.148.58/app/dcPublic/checkInfoChange.do';
export default class MyWeChat extends Component{
    static navigationOptions={
        headerTitle: '微信公众号',
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
    constructor(props){
        super(props);
        this.netUtils = new NetUtils;
        this.state=({
            img:'',
            title:'',
            description:''
        })
    }
    componentDidMount() {
        this.onLoad();
        this.onload();
    }

    onLoad() {
        this.netUtils.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    img:result.dev
                })
            })

            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }
    onload() {
        this.netUtils.fetchNetRepository(URL)
            .then(result => {
                this.setState({
                    description:result.data.my_wx2,
                    title:result.data.my_wx1
                })
            })

            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <View style={styles.wrap}>
                    <Image
                        style={styles.Img}
                        source={{uri:this.state.img}}
                    />
                    <View style={styles.row}>
                        <Image
                            style={styles.image}
                            source={require('../../../res/Images/icon.png')}
                        />
                        <View style={styles.textStyle}>
                            <Text style={styles.header}>{this.state.title}</Text>
                            <Text style={styles.content}>{this.state.description}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F3F4F6',
        justifyContent:'center',
        alignItems:'center',
    },
    wrap:{
        width:0.86*width,
        borderWidth:1,
        borderColor:'gray',
    },
    Img:{
        width:0.85*width,
        height:0.85*width,
        resizeMode:'cover'
    },
    row:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        width:0.853*width,
        height:ScreenUtils.scaleSize(150),
        backgroundColor:'#DEDEDE'
    },
    image:{
        width: ScreenUtils.scaleSize(80),
        height: ScreenUtils.scaleSize(80),
        borderRadius: ScreenUtils.scaleSize(80 / 2),
    },
    textStyle:{

    },
    header:{
        fontSize:ScreenUtils.setSpText(16),
        color:'black'
    },
    content:{
        fontSize:ScreenUtils.setSpText(12),
        color:'black'
    }

});