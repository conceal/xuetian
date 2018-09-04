import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    FlatList,
    Text,
    Dimensions, StatusBar
} from 'react-native';
import Data from '../../res/json/MessageData';
import * as ScreenUtils from "../Common/ScreenUtils";
import NetUtils from "../Common/NetUtils";

let width = Dimensions.get('window').width;

export default class Message extends Component {
    constructor(props){
        super(props);
        this.utils = new NetUtils();
    }
    static navigationOptions = {
        headerTitle: '消息中心',
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
    /*onLoad() {
        this.utils.fetchNetRepository(url,
            {"tabId": "1"},
        )
            .then(result => {

                let imageurl = result.data.headerImg.headerImg;
                let data = result.data.commodityList;
                console.log(result);
                let datas = [];
                let i = 0;
                data.map(function (item) {
                    datas.push({
                        key: i,
                        value: item,
                    })
                    i++;
                });
                this.setState({
                    dataArray: datas,
                    isLoading: false,
                    img:imageurl
                });
                data = null;
                datas = null;
            })

            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }

    componentDidMount() {
        this.onLoad();
    }*/

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <FlatList
                    renderItem={this.ViewList}
                    data={Data}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }

    ViewList = (item) => {
        return (
            <View style={styles.wholeview}>
                <View style={styles.wrap}>
                    <Image source={require('../../res/Images/er-yaoqinggonggao.png')}
                           style={{
                               marginTop: ScreenUtils.scaleSize(20),
                               marginLeft: ScreenUtils.scaleSize(30),
                               width: ScreenUtils.scaleSize(88),
                               height: ScreenUtils.scaleSize(88),
                               paddingBottom: 5
                           }}
                    />
                    <View style={{
                        marginLeft: ScreenUtils.scaleSize(25),
                        marginTop: ScreenUtils.scaleSize(10),
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            marginTop: ScreenUtils.scaleSize(5),
                            width: width - ScreenUtils.scaleSize(146),
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles.title}>{item.item.title}</Text>
                            <Text style={styles.time}>{item.item.time}</Text>
                        </View>
                        <Text style={styles.content}>{item.item.content}</Text>
                    </View>

                </View>

                <View style={{backgroundColor: 'gray', height: 1, width: width}}></View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    wholeview: {
        flexDirection: 'column',
        padding: 6
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    wrap: {
        flexDirection: 'row',
        width: ScreenUtils.scaleSize(749),
        height: ScreenUtils.scaleSize(136),
    },
    item: {
        flexDirection: 'column',
        marginLeft: 9
    },
    title: {
        fontSize: ScreenUtils.setSpText(18),
        color: '#333333'
    },
    content: {
        fontSize: 15,
        marginTop: ScreenUtils.scaleSize(16),
        color: 'gray'
    },
    time: {
        marginRight: ScreenUtils.scaleSize(10),
    }
});