import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";
import NetUtils from "../../Common/NetUtils";

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');
let url ='http://47.98.148.58/app/dcPublic/checkInfoChange.do';
export default class AboutUs extends Component {
    static navigationOptions = {
        headerTitle: '关于我们',
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center'
        },
        headerRight: (
            <View/>
        ),
        headerStyle: {
            marginTop: StatusBar.currentHeight
        }
    };
    constructor(props){
        super(props);
        this.netUtils = new NetUtils;
        this.state={
            description:''
        }
    }
    onLoad() {
        this.netUtils.fetchNetRepository(url)
            .then(result => {
                console.log(result);
                this.setState({
                    description:result.data.my_we
                })
            })

            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }
    componentDidMount() {
        this.onLoad();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <View style={{
                    marginTop: ScreenUtils.scaleSize(200),
                    paddingBottom: ScreenUtils.scaleSize(30),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image style={styles.image} source={require('../../../res/Images/icon.png')}/>
                    <Text style={{marginTop: ScreenUtils.scaleSize(50), fontSize: ScreenUtils.setSpText(22)}}>{this.state.description}</Text>
                    <Text style={{marginTop: ScreenUtils.scaleSize(50), fontSize: ScreenUtils.setSpText(18)}}>Version
                        1.0.0</Text>
                </View>
                <View style={{
                    width: width,
                    alignItems: 'center',
                    bottom:0,
                    position:'absolute'
                }}>
                    <Text style={{fontSize: ScreenUtils.setSpText(18)}}>版权所有</Text>
                    <Text style={{fontSize: ScreenUtils.setSpText(16)}}>Copyright @ 2018-2019 MML Rights Reserved</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    image: {
        height: ScreenUtils.scaleSize(160),
        width: ScreenUtils.scaleSize(160),
    }

});