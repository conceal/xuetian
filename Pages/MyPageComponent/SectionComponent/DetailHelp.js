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
let url = 'http://47.98.148.58/app/user/showHelpDetail.do';

export default class DetailHelp extends Component{
    static navigationOptions =  ({ navigation }) =>({
        title: navigation.state.params.title,
        headerTitleStyle:{
            flex:1,
            textAlign: 'center',
        },
        headerRight:(
            <View/>
        ),
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    });
    constructor(props){
        super(props);
        this.utils = new NetUtils;
        this.state=({
            title:"",
            content:''
        })
    }
    componentDidMount() {
        this.onLoad();
    };
    onLoad() {
        const { params } = this.props.navigation.state;
        console.log(params.title);
        this.utils.fetchNetRepository(url,{"problem":params.title})
            .then(result => {
                console.log(result);
                this.setState({
                    title: result.data.problem,
                    content: result.data.answer
                });
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
                    <Text style={styles.title}>{this.state.title}</Text>
                    <View style={{backgroundColor:'gray',height:1,width:0.9*width,justifyContent:'center',alignSelf:'center'}}></View>
                </View>
                <Text style={styles.content}>{this.state.content}</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    title:{
        fontSize:ScreenUtils.setSpText(22),
        color:'black',
        marginLeft:0.05*width
    },
    content:{
        fontSize:ScreenUtils.setSpText(18),
        marginLeft:0.05*width,
        marginRight:0.05*width,
        marginTop:ScreenUtils.scaleSize(40)
    },
    wrap:{
        width:width,
        height:ScreenUtils.scaleSize(80),
        paddingTop:ScreenUtils.scaleSize(25),
        paddingBottom:ScreenUtils.scaleSize(25)
    }
});