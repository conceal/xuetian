import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback, DeviceEventEmitter, Platform,
} from 'react-native';

import Title from './Title';
import * as ScreenUtils from "../Common/ScreenUtils";
import UShare from '../Common/share/share';
import SharePlatform from '../Common/share/SharePlatform';
import NetUtils from "../Common/NetUtils";
import ScrollVertical from "../Common/ScrollVertical";
let {width, height} = Dimensions.get('window');
let isIphoneX = (Platform.OS === 'ios' && (Number(((height/width)+"").substr(0,4)) * 100) === 216);
let url = 'http://47.98.148.58/app/goods/makeMoney.do';
export default class EarnPage extends Component {
    constructor(props) {
        super(props);
        this.utils = new NetUtils;
        this.state = {
            result: '',
            visible: false,
            kuaibaoArray: [],
            image: '',
            url:'',
            title:"",
            description1:'',
            description2:"",
            description3:'',
            share12:''
        }
    }

    componentDidMount() {
        this.onLoad();
    }

    setModalVisible(visible) {
        this.setState({
            visible: visible
        })
    }

    _onClose() {
        this.setState({
            visible: false
        })
    }

    onLoad() {
        this.utils.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    image: result.data.headerImge.headerImg,
                    kuaibaoArray: result.data.mimiBulletin,
                    url:result.data.headerImge.banner_url,
                    description1:result.data.words.sec_word1,
                    description2:result.data.words.sec_word2,
                    description3:result.data.words.sec_word3,
                    title:result.data.words.sec_word4,
                    share12:result.data.words.share1
                });
                DeviceEventEmitter.emit('title',this.state.title);
            })

            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }

    scroll() {
        let array = [{content: ''}];
        let dataArray = this.state.kuaibaoArray;
        if (dataArray && dataArray.length > 0) {
            array = [];
            for (let item of dataArray) {
                array.push({content: item.text});
            }
        }
        if (array[0].content !== "" && array.length >= 1) {
            return <ScrollVertical
                onChange={(index => {
                    this.index = index;
                })}
                enableAnimation={true}
                data={array}
                delay={2500}
                duration={1000}
                scrollHeight={ScreenUtils.scaleSize(45)}
                scrollStyle={{alignItems: 'flex-start'}}
                textStyle={{color: 'black', fontSize: ScreenUtils.setSpText(13)}}/>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    Platform.OS === 'ios' ?
                        <View style={{height: Platform.OS === 'ios' ? (isIphoneX ? 40 : 20) : 0, backgroundColor: '#FFE059'}}>
                        </View> : null
                }
                <Title{...this.props}/>
                <FlatList
                    ListHeaderComponent={this._header}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }


    _qqshare() {
        UShare.share(
            '米米来',
            this.state.share12,
            'http://mimilike.cn/dc/dcweb/apkDownLoad.html',
            'http://47.98.148.58/imgUpload/defaultImg/icon.png',
            SharePlatform.QQ,
            (message) => {
                // message: 分享成功、分享失败、取消分享
            });
    }

    _qqzoneshare() {
        UShare.share(
            '米米来',
            this.state.share12,
            'http://mimilike.cn/dc/dcweb/apkDownLoad.html',
            'http://47.98.148.58/imgUpload/defaultImg/icon.png',
            SharePlatform.QQZONE,
            (message) => {
                // message: 分享成功、分享失败、取消分享
            });
    }

    _wechatzoneShare(){
        UShare.share(
            '米米来',
            this.state.share12,
            'http://mimilike.cn/dc/dcweb/apkDownLoad.html',
            'http://47.98.148.58/imgUpload/defaultImg/icon.png',
            SharePlatform.WECHATMOMENT,
            (message) => {
                // message: 分享成功、分享失败、取消分享
            });
    }
    _wechatShare(){
        UShare.share(
            '米米来',
            this.state.share12,
            'http://mimilike.cn/dc/dcweb/apkDownLoad.html',
            'http://47.98.148.58/imgUpload/defaultImg/icon.png',
            SharePlatform.WECHAT,
            (message) => {
                // message: 分享成功、分享失败、取消分享
            });
    }


    _header = () => {
        return <View style={styles.container2}>
            <TouchableWithoutFeedback
                onPress={()=>this.props.navigation.navigate('WebPage', {url: this.state.url, ...this.props})}
            >
                <Image resizemode={'contain'} style={styles.image} source={{uri: this.state.image}}/>
            </TouchableWithoutFeedback>
            <View style={styles.crow}>
                <TouchableWithoutFeedback
                    style={styles.rowStyle}
                >
                    <View style={styles.rowStyle}>
                        <Image style={{width: ScreenUtils.scaleSize(122),
                            marginLeft:ScreenUtils.scaleSize(8),
                            height: ScreenUtils.scaleSize(30)}}
                               source={require('../../res/Images/米米快报.png')}/>
                        <View style={styles.rightStyle}>
                            <Text style={{
                                color: 'red',
                                fontSize: ScreenUtils.setSpText(15)
                            }}>恭喜</Text>
                            {this.scroll()}
                            <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.wrap}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.text1Style}>{this.state.description1}</Text>
                </View>
                <View style={styles.row2Style}>
                    <Text style={styles.text1Style}>{this.state.description2}</Text>
                    <Text style={styles.redTextStyle}>{this.state.description3}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Image source={require('../../res/Images/yaoqinghaoyou.png')} style={styles.imageStyle}/>
                </View>
                <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={()=>this.props.navigation.navigate('RewardRules')}
                >
                    <Text style={styles.buttonTextStyle}>点击查看奖励规则 ></Text>
                </TouchableOpacity>
                <View style={{alignItems: 'center', marginTop: ScreenUtils.scaleSize(27)}}>
                    <Text style={styles.text1Style}>立即注册 -> 邀请好友 -> 领奖啦</Text>
                </View>
                <View style={styles.textStyle}>
                    <Text style={{
                        fontSize: ScreenUtils.setSpText(17),
                        color: '#E5E5E5'
                    }}>-----------马上邀请好友得奖励-----------</Text>
                </View>
                <View style={styles.otherImageStyle}>
                    <TouchableOpacity
                        onPress={() => this._wechatShare()}
                    >
                        <Image source={require('../../res/Images/weixin.png')} style={styles.iconStyle}/>
                        <View style={{alignItems: 'center'}}>
                            <Text>微信</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._wechatzoneShare()}
                    >
                        <Image source={require('../../res/Images/pengyouquan.png')} style={styles.iconStyle}/>
                        <View style={{alignItems: 'center'}}>
                            <Text>朋友圈</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._qqshare()}
                    >
                        <Image source={require('../../res/Images/QQ.png')} style={styles.iconStyle}/>
                        <View style={{alignItems: 'center'}}>
                            <Text>QQ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this._qqzoneshare()}
                    >
                        <Image source={require('../../res/Images/qqkongjian.png')} style={styles.iconStyle}/>
                        <View style={{alignItems: 'center'}}>
                            <Text>QQ空间</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6'
    },
    container2: {
        backgroundColor: '#F3F4F6'
    },
    text: {
        flexDirection: 'column',
        height: 40,
        marginTop: 6
    },
    picandtxt: {
        flexDirection: 'row',
    },
    smallimage: {
        height: 16,
        width: 16
    },
    invite: {
        flexDirection: 'row',
    },
    image: {
        width: ScreenUtils.scaleSize(750),
        height: ScreenUtils.scaleSize(280)
    },
    crow: {
        height: ScreenUtils.scaleSize(70),
        width: ScreenUtils.scaleSize(730),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    rowStyle: {
        height: ScreenUtils.scaleSize(70),
        width: ScreenUtils.scaleSize(730),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: ScreenUtils.scaleSize(16),
        marginBottom: ScreenUtils.scaleSize(20),
    },
    rightStyle: {
        flex: 1,
        height: ScreenUtils.scaleSize(70),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: ScreenUtils.scaleSize(10),
        paddingLeft: ScreenUtils.scaleSize(8),
    },
    icon02: {
        height: ScreenUtils.scaleSize(50),
        width: ScreenUtils.scaleSize(56),
        marginBottom: ScreenUtils.scaleSize(25),
        marginLeft: ScreenUtils.scaleSize(20)
    },
    icon002: {
        height: 27,
        width: 21,
        marginLeft: ScreenUtils.scaleSize(0.1),
    },
    wrap: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        /*height:ScreenUtils.scaleSize(770),*/
        borderRadius: ScreenUtils.scaleSize(16),
        marginTop: ScreenUtils.scaleSize(27),
        marginLeft: ScreenUtils.scaleSize(10),
        marginRight: ScreenUtils.scaleSize(10),
    },
    text1Style: {
        fontSize: ScreenUtils.setSpText(16),
        fontWeight: 'bold',
        color: '#333333'
    },
    redTextStyle: {
        fontSize: ScreenUtils.setSpText(18),
        fontWeight: 'bold',
        color: '#F15A1D'
    },
    row2Style: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonTextStyle: {
        marginTop: ScreenUtils.scaleSize(15),
        fontSize: ScreenUtils.setSpText(16),
        fontWeight: 'bold',
        color: 'orange'
    },
    otherImageStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: ScreenUtils.scaleSize(10),
    },
    imageStyle: {
        height: ScreenUtils.scaleSize(276),
        width: ScreenUtils.scaleSize(370),
        marginTop: ScreenUtils.scaleSize(15),
        marginBottom: ScreenUtils.scaleSize(20),
    },
    iconStyle: {
        width: ScreenUtils.scaleSize(100),
        height: ScreenUtils.scaleSize(100),
        borderRadius: ScreenUtils.scaleSize(53),
    },
    textStyle: {
        alignItems: 'center',
        marginTop: ScreenUtils.scaleSize(33),
        marginBottom: ScreenUtils.scaleSize(10),
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    reportText: {
        fontSize: ScreenUtils.setSpText(15),
        paddingLeft: ScreenUtils.scaleSize(6),
        width: width * 0.6,
    },
    ModalImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        width: ScreenUtils.scaleSize(40),
        height: ScreenUtils.scaleSize(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    textInput: {
        height: 40,
        width: width * 0.9,
        borderRadius: 14,
        backgroundColor: 'white'
    },
    buttonStyle: {
        marginTop: 20,
        height: 40,
        width: width * 0.9,
        borderRadius: 14,
        backgroundColor: '#C6E2FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 12,
        color: 'white',
    }
});