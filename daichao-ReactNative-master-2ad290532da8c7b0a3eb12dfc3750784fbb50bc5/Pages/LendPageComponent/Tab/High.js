import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    FlatList,
    Dimensions,
    StatusBar
} from 'react-native';
/*import Data from '../../res/json/DataTest';*/
import * as ScreenUtils from "../../Common/ScreenUtils";
import NetUtils from '../../Common/NetUtils';
import WebPage from "../../WebPage";

let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');
let url = 'http://tsmsy.natapp1.cc/app/goods/classification.do';
let Url = 'http://tsmsy.natapp1.cc/app/goods/clickCount.do';
export default class Low extends Component {
    constructor(props) {
        super(props);
        this.utils = new NetUtils;
        this.state = {
            dataArray: [],
            isLoading: true,
            id: 0,
            img: null
        }
    }


    onLoad() {
        this.utils.fetchNetRepository(url,
            {"tabId": "4"},
        )
            .then(result => {

                let imageurl = result.data.headerImg.headerImg;
                let data = result.data.commodityList;
                console.log(result);
                console.log(data);
                console.log(imageurl);
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
                    img: imageurl
                });
                console.log(this.state.img);
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
        /*this.onPush();*/
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <View style={{height: height - StatusBar.currentHeight, width: width}}>
                    <Image source={{uri: this.state.img}}
                           style={styles.ImageView}
                    />
                    <FlatList
                        renderItem={this.ViewList}
                        data={this.state.dataArray}
                        /*keyExtractor={(item, index) => index}*/
                    />
                </View>

            </View>
        );
    }

    onPush(id) {
        this.utils.fetchNetRepository(Url,
            {"tabId": "4", "gdsId": id},
        )
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }

    ViewList = ({item}) => {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                <TouchableOpacity
                    onPress={() => {
                        this.onPush(item.value.commodityId);
                        console.log(this.state.id);
                        this.props.navigation.navigate('WebPage', {url: item.value.commodityUrl, ...this.props,})
                    }}
                >
                    <View style={styles.wrap}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../../../res/Images/banner4.png')}
                                   style={styles.icon}
                            />
                            <View style={styles.two}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{
                                        color: '#333333',
                                        fontSize: ScreenUtils.setSpText(19),
                                        paddingBottom: 7
                                    }}>{item.value.commodityName}</Text>
                                    <View style={styles.label}>
                                        <Text style={{
                                            fontSize: ScreenUtils.setSpText(11),
                                            color: '#F3713D'
                                        }}>{item.value.commoditytab}</Text>
                                    </View>
                                </View>
                                <Text>{item.value.commodityintro}</Text>
                            </View>
                        </View>
                        <View style={styles.three}>

                            <Image style={{height: ScreenUtils.scaleSize(30), width: ScreenUtils.scaleSize(45),}}
                                   source={require('../../../res/Images/ahead.png')}/>

                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FcFF',
    },
    ImageView: {
        width: width,
        height: ScreenUtils.scaleSize(280),
    },
    label: {
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#F3713D',
        marginLeft: ScreenUtils.scaleSize(28),
        marginTop: 4,
        justifyContent: 'center',
        alignItems: 'center',
        height: ScreenUtils.scaleSize(38),
        width: ScreenUtils.scaleSize(96),
        backgroundColor: '#FFFFFF'
    }, wrap: {
        height: ScreenUtils.scaleSize(150),
        width: ScreenUtils.scaleSize(730),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
    },
    icon: {
        borderRadius: 8,
        height: ScreenUtils.scaleSize(90),
        width: ScreenUtils.scaleSize(90),
    },
    two: {
        justifyContent: 'center',
        //alignItems:'center',
        paddingLeft: 5
    },
    three: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    touch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 25,
    },
});