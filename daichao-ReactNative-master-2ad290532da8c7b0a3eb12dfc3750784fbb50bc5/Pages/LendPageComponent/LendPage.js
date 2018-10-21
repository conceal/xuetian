import React, {Component} from 'react';
import {
    FlatList,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    Modal,
    AsyncStorage,
    TouchableWithoutFeedback,
    DeviceEventEmitter, Platform
} from 'react-native';
import JPushModule from 'jpush-react-native';
import Icon from "react-native-vector-icons/EvilIcons";

import ScrollVertical from "../Common/ScrollVertical";
import TextInputPart from './TextInputPart';
import Swiper from 'react-native-swiper';
import * as ScreenUtils from "../Common/ScreenUtils";
import NetUtils from "../Common/NetUtils";

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
let isIphoneX = Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812;
let url = 'http://47.98.148.58/app/goods/homePage.do';
let Url = 'http://47.98.148.58/app/goods/clickCount.do';
let URL = 'http://47.98.148.58/app/user/checkUserStatusByTkid.do';
let Index = 0;
export default class LendPage extends Component {
    constructor(props) {
        super(props);
        this.utils = new NetUtils;
        this.state = {
            dataArray: [],
            gdsId: "",
            BannerArray: [],
            kuaibaoArray: [],
            ActivityArray: [],
            showFoot: 0,
            Refresh: true,
            length: 0,
            currentPage: 1,
            totalPage: 0,
            isFirst: true,
            visible: false,
            FdataUrl: '',
            FdataPic: '',
            tab1Pic: '',
            tab1Title: '',
            tab2Pic: '',
            tab2Title: '',
            tab3Pic: '',
            tab3Title: '',
            tab4Pic: '',
            tab4Title: '',
            tab5Pic: '',
            tab5Title: '',
            img1: '',
            img2: '',
            url1: '',
            url2: '',
            tab1Id: '',
            tab2Id: '',
            tab3Id: '',
            tab4Id: '',
            tab5Id: '',
        }
    }

    _onClose() {
        this.setState({
            visible: false
        })
    }

    setModalVisible(visible) {
        this.setState({
            visible: visible
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#FFE059"
                />
                {
                    Platform.OS === 'ios' ?
                        <View style={{height: Platform.OS === 'ios' ? (isIphoneX ? 40 : 20) : 0, backgroundColor: '#FFE059'}}>
                        </View> : null
                }
                <TextInputPart {...this.props}/>
                <View style={styles.container2}>
                    <Swiper
                        loop={true}
                        autoplay={true}
                        autoplayTimeout={3}
                        horizontal={true}
                        paginationStyle={{bottom: ScreenUtils.scaleSize(7)}}
                        dotStyle={{
                            backgroundColor: '#E1E1E1',
                            width: ScreenUtils.scaleSize(14),
                            height: ScreenUtils.scaleSize(14)
                        }}
                        activeDotStyle={{
                            backgroundColor: '#F6D574',
                            width: ScreenUtils.scaleSize(14),
                            height: ScreenUtils.scaleSize(14)
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => this.props.navigation.navigate('WebPage', {url: this.state.url1, ...this.props})}
                        >
                            <Image resizemode={'contain'} style={styles.image} source={{uri: this.state.img1}}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => this.props.navigation.navigate('WebPage', {url: this.state.url2, ...this.props})}
                        >
                            <Image resizemode={'contain'} style={styles.image} source={{uri: this.state.img2}}/>
                        </TouchableWithoutFeedback>
                    </Swiper>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            this.props.navigation.navigate('new', {
                                tab1Id: this.state.tab1Id,
                                tab: 'tb_new',
                                title: this.state.tab1Title
                            });
                        }}
                    >
                        <Image style={styles.image1} source={{uri: this.state.tab1Pic}}/>
                        <Text style={styles.tab1}>{this.state.tab1Title}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            this.props.navigation.navigate('black', {
                                tab2Id: this.state.tab2Id,
                                tab: 'tb_black',
                                title: this.state.tab2Title
                            })
                        }}
                    >
                        <Image style={styles.image2} source={{uri: this.state.tab2Pic}}/>
                        <Text style={styles.tab2}>{this.state.tab2Title}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            this.props.navigation.navigate('long', {
                                tab3Id: this.state.tab3Id,
                                tab: 'tb_long',
                                title: this.state.tab3Title
                            })
                        }}
                    >
                        <Image style={styles.image3} source={{uri: this.state.tab3Pic}}/>
                        <Text style={styles.tab3}>{this.state.tab3Title}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            this.props.navigation.navigate('high', {
                                tab4Id: this.state.tab4Id,
                                tab: 'tb_high',
                                title: this.state.tab4Title
                            })
                        }}
                    >
                        <Image style={styles.image4} source={{uri: this.state.tab4Pic}}/>
                        <Text style={styles.tab4}>{this.state.tab4Title}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                            this.props.navigation.navigate('low', {
                                tab5Id: this.state.tab5Id,
                                tab: 'tb_low',
                                title: this.state.tab5Title
                            })
                        }}
                    >
                        <Image style={styles.image5} source={{uri: this.state.tab5Pic}}/>
                        <Text style={styles.tab5}>{this.state.tab5Title}</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={this.state.visible}
                    animationType='slide'
                    transparent={true}
                    onRequestClose={() => this.setModalVisible(false)}>
                    <View style={styles.modalStyle}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('WebPage', {url: this.state.FdataUrl, ...this.props})}
                        >
                            <Image
                                source={{uri: this.state.FdataPic}}
                                style={{height: ScreenUtils.scaleSize(500), width: ScreenUtils.scaleSize(500)}}
                            />
                        </TouchableOpacity>
                        <Text>|</Text>
                        <TouchableOpacity onPress={() => this._onClose()}>
                            <Icon name="close-o" size={40} color={'#FFE059'}/>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <FlatList
                    ref={(flatList) => this._flatList = flatList}
                    renderItem={this.ViewList}
                    data={this.state.dataArray}
                    ListFooterComponent={this._renderFooter.bind(this)}
                    onEndReached={() => this._onEndReached()}
                    onEndReachedThreshold={0.1}
                    ListHeaderComponent={this._header}
                    refreshing={this.state.Refresh}
                    keyExtractor={this._keyExtractor}
                    onScrollBeginDrag={() => {
                        this.canAction = true;
                    }}
                    onScrollEndDrag={() => {
                        this.canAction = false;
                    }}
                    onMomentumScrollBegin={() => {
                        this.canAction = true;
                    }}
                    onMomentumScrollEnd={() => {
                        this.canAction = false;
                    }}
                />
            </View>
        )
    }

    _keyExtractor = (item, index) => index.toString();

    componentDidMount() {
        this._onload();
        this.onLoad(this.state.currentPage);
        JPushModule.initPush();
        JPushModule.addGetRegistrationIdListener((registrationId) => {
        });
        JPushModule.addReceiveOpenNotificationListener(() => {
            this.props.navigation.navigate('Fourth');
        });
        this.change = DeviceEventEmitter.addListener('Change', (value) => {
            //这里面是要调用的方法，比如：刷新
            //value:是下面页面在通知时 ，所传递过来的参数
            this._flatList.scrollToIndex({viewPosition: 0, index: 0});
            this.onLoad(1);
        });
    }

    componentWillUnmount() {
        this.change.remove();
    }

    _onload() {
        AsyncStorage.getItem('login', (error, result) => {
            this.utils.fetchNetRepository(URL, {"tkid": result});
        });
    }


    onLoad(Page) {
        this.utils.fetchNetRepository(url,
            {"pageNo": Page})
            .then(result => {
                let data = result.data.commodityList;

                let length = result.data.total;
                let page = parseInt(length / 10) + 1;
                let datas = [];
                let i = 0;
                data.map(function (item) {
                    datas.push({
                        key: i,
                        value: item,
                    });
                    i++;
                });
                let foot = 0;
                if (Page >= page) {
                    foot = 1
                }
                if (Page === 1) {
                    this.setState({
                        dataArray: datas,
                        length: length,
                        totalPage: page,
                        showFoot: foot,
                        currentPage: Page,
                        FdataUrl: result.data.fwlist.fw_url,
                        FdataPic: result.data.fwlist.fw_pic,
                    })
                } else {
                    this.setState({
                        dataArray: this.state.dataArray.concat(datas),
                        length: length,
                        totalPage: page,
                        showFoot: foot,
                        FdataUrl: result.data.fwlist.fw_url,
                        FdataPic: result.data.fwlist.fw_pic,
                        currentPage: Page
                    });
                }
                if (Page % 2 === 0) {
                    this.setModalVisible(true);
                }
                data = null;
                datas = null;
                if (this.state.isFirst === true) {
                    let ActivityData = result.data.activity;
                    let banner = result.data.Banner;
                    let kuaibaodata = result.data.mimiBulletin;
                    this.setState({
                        ActivityArray: ActivityData,
                        isFirst: false,
                        img1: banner[0].BannerImg,
                        img2: banner[1].BannerImg,
                        url1: banner[0].BannerUrl,
                        url2: banner[1].BannerUrl,
                        kuaibaoArray: kuaibaodata,
                        tab1Pic: result.data.Tab[0].TabInco,
                        tab1Title: result.data.Tab[0].TabName,
                        tab1Id: result.data.Tab[0].TabId,
                        tab2Pic: result.data.Tab[1].TabInco,
                        tab2Title: result.data.Tab[1].TabName,
                        tab2Id: result.data.Tab[1].TabId,
                        tab3Pic: result.data.Tab[2].TabInco,
                        tab3Title: result.data.Tab[2].TabName,
                        tab3Id: result.data.Tab[2].TabId,
                        tab4Pic: result.data.Tab[3].TabInco,
                        tab4Title: result.data.Tab[3].TabName,
                        tab4Id: result.data.Tab[3].TabId,
                        tab5Pic: result.data.Tab[4].TabInco,
                        tab5Title: result.data.Tab[4].TabName,
                        tab5Id: result.data.Tab[4].TabId,
                    });

                }

            })

            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }

    _onEndReached() {
        if (!this.canAction) return;
        if (this.state.showFoot !== 0) {
            return;
        }
        if ((this.state.currentPage !== 1) && (this.state.currentPage >= this.state.totalPage)) {
            return;
        } else {
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
        this.setState({showFoot: 2});
        this.onLoad(this.state.currentPage + 1);

    }

    _kuaibao() {
        let dataArray = this.state.kuaibaoArray;
        let Activity = this.state.ActivityArray;
        return <View style={styles.crow}>
            <TouchableOpacity
                style={styles.rowStyle}
                onPress={() => {
                    this.props.navigation.navigate('WebPage', {url: dataArray[Index].url, ...this.props,})
                }}
            >
                <View style={styles.rightStyle}>
                    <Image style={{
                        marginTop: ScreenUtils.scaleSize(7),
                        width: ScreenUtils.scaleSize(122),
                        height: ScreenUtils.scaleSize(30)
                    }} source={require('../../res/Images/米米快报.png')}/>
                    <Text style={{
                        paddingLeft:ScreenUtils.scaleSize(8),
                        width:ScreenUtils.scaleSize(70),
                        color: 'red',
                        marginTop: ScreenUtils.scaleSize(3),
                        fontSize: ScreenUtils.setSpText(14)
                    }}>恭喜</Text>
                    <View style={{marginLeft: ScreenUtils.scaleSize(3), flexDirection: 'row', flex: 1}}>
                        {this.scroll()}
                    </View>
                    <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('WebPage', {url: Activity.activityUrl, ...this.props})
                }}
            >
                <Image style={{
                    width: ScreenUtils.scaleSize(662.4),
                    height: ScreenUtils.scaleSize(141),
                    marginBottom: ScreenUtils.scaleSize(11)
                }} source={{uri: Activity.activityImg}}/>
            </TouchableOpacity>
        </View>
    }

    scroll() {
        let array = [{content: ""}];
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
                    Index = index;
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

    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{height: 30, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5,}}> 没有更多数据了 </Text>
                </View>
            );
        }
        else if (this.state.showFoot === 2) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator/>
                    <Text>Loading...</Text>
                </View>
            );
        } else if (this.state.showFoot === 0) {
            return (
                <View style={styles.footer}>
                    <Text/>
                </View>
            );
        }
    }

    _header = () => {
        return <View style={{paddingBottom: ScreenUtils.scaleSize(10)}}>
            {this._kuaibao()}
        </View>
    };

    onPush(id) {
        this.utils.fetchNetRepository(Url,
            {"tabId": "0", "gdsId": id},
        )
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }

    CheckTab1 = ({item}) => {
        if (item.value.commodityTagFirst[0] === "" || item.value.commodityTagFirst[0] === null) {
            return <View/>
        } else {
            return <View style={{
                borderRadius: 2,
                marginLeft: ScreenUtils.scaleSize(13),
                marginTop: 4,
                justifyContent: 'center',
                alignItems: 'center',
                height: ScreenUtils.scaleSize(38),
                width: ScreenUtils.scaleSize(96),
                backgroundColor: '#F0F2F4'
            }}>
                <Text style={{fontSize: ScreenUtils.setSpText(13)}}>{item.value.commodityTagFirst[0]}</Text>
            </View>
        }
    };
    CheckTab2 = ({item}) => {
        if (item.value.commodityTagFirst.length === 2) {
            return <View style={{
                borderRadius: 2,
                marginLeft: ScreenUtils.scaleSize(12.5),
                marginTop: 4,
                justifyContent: 'center',
                alignItems: 'center',
                height: ScreenUtils.scaleSize(38),
                width: ScreenUtils.scaleSize(96),
                backgroundColor: '#F0F2F4'
            }}>
                <Text
                    style={{fontSize: ScreenUtils.setSpText(13)}}>{item.value.commodityTagFirst[1]}</Text>
            </View>
        } else {
            return <View/>
        }
    };


    Checkdk = ({item}) => {
        if (item.value.commodityTagSecond === "" || item.value.commodityTagSecond === null) {
            return <View/>
        } else {
            return <View style={styles.touch}>
                <Text style={{
                    color: '#F36B36',
                    fontSize: ScreenUtils.setSpText(13.5)
                }}>{item.value.commodityTagSecond}</Text>
            </View>
        }
    };


    ViewList = ({item}) => {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: ScreenUtils.scaleSize(16)}}>
                <TouchableOpacity
                    onPress={() => {
                        this.onPush(item.value.commodityId);
                        this.props.navigation.navigate('WebPage', {url: item.value.commodityUrl, ...this.props})
                    }}
                >
                    <View style={styles.wrap}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={{uri: item.value.commodityInco}}
                                   style={styles.icon}
                            />
                            <View style={styles.two}>
                                <View style={{flexDirection: 'row'}}>

                                    <Text style={{
                                        color: 'black',
                                        fontSize: ScreenUtils.setSpText(15.5),
                                        paddingBottom: 7
                                    }}>{item.value.commodityName}</Text>

                                    {this.CheckTab1({item})}
                                    {this.CheckTab2({item})}
                                    {this.Checkdk({item})}

                                </View>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{width: width * 0.75, fontSize: ScreenUtils.setSpText(14.5)}}
                                >{item.value.commodityText}</Text>
                            </View>

                        </View>
                        <Image
                            style={styles.ahead}
                            source={require('../../res/Images/ahead.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6'
    },
    imageStyle: {
        width: 40,
        height: 40
    },
    row: {
        height: ScreenUtils.scaleSize(177),
        width: ScreenUtils.scaleSize(730),
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: ScreenUtils.scaleSize(21),
        marginLeft: ScreenUtils.scaleSize(10),
        marginRight: ScreenUtils.scaleSize(10),
    },
    crow: {
        height: ScreenUtils.scaleSize(240),
        width: ScreenUtils.scaleSize(730),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    sectext: {
        color: 'red'
    },
    two: {
        justifyContent: 'center',
        paddingLeft: 5
    },
    wrap: {
        height: 80,
        width: width - 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,

    },
    touch: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: 55,
        height: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#F36B36',
        marginTop: 5,
        right: 0,
        position: 'absolute'
    },
    rowStyle: {
        width: width - 30,
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 27,
        marginBottom: 2,
    },
    rightStyle: {
        height: ScreenUtils.scaleSize(52),
        width: width * 0.92,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#F3F4F6',
        paddingTop: ScreenUtils.scaleSize(3),
        marginBottom: ScreenUtils.scaleSize(7)
    },
    modalStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    icon02: {
        height: 27,
        width: 21,
        marginLeft: ScreenUtils.scaleSize(0.1),
    },
    icon: {
        borderRadius: 8,
        height: ScreenUtils.scaleSize(90),
        width: ScreenUtils.scaleSize(90),
        paddingLeft: 5,
        paddingRight: 10,
    },
    tab1: {
        color: '#444444',
        fontSize: ScreenUtils.scaleSize(25.8),
        marginTop: ScreenUtils.scaleSize(16.6),
        alignSelf:"center"
    },
    image1: {
        height: ScreenUtils.scaleSize(75),
        width: ScreenUtils.scaleSize(75),
        alignSelf:"center"
    },
    tab2: {
        color: '#444444',
        fontSize: ScreenUtils.scaleSize(25.8),
        marginTop: ScreenUtils.scaleSize(16.6),
        alignSelf:"center"
    },
    image2: {
        height: ScreenUtils.scaleSize(75),
        width: ScreenUtils.scaleSize(75),
        alignSelf:"center"
    },
    tab3: {
        color: '#444444',
        fontSize: ScreenUtils.scaleSize(25.8),
        marginTop: ScreenUtils.scaleSize(16.6),
        alignSelf:"center"
    },
    image3: {
        height: ScreenUtils.scaleSize(75),
        width: ScreenUtils.scaleSize(75),
        alignSelf:"center"
    },
    tab4: {
        color: '#444444',
        fontSize: ScreenUtils.scaleSize(25.8),
        marginTop: ScreenUtils.scaleSize(16.6),
        alignSelf:"center"
    },
    image4: {
        height: ScreenUtils.scaleSize(75),
        width: ScreenUtils.scaleSize(75),
        alignSelf:"center"
    },
    tab5: {
        color: '#444444',
        fontSize: ScreenUtils.scaleSize(25.8),
        marginTop: ScreenUtils.scaleSize(16.6),
        alignSelf:"center"
    },
    image5: {
        height: ScreenUtils.scaleSize(75),
        width: ScreenUtils.scaleSize(75),
        alignSelf:"center"
    },
    reportText: {
        fontSize: ScreenUtils.setSpText(15),
        marginLeft: ScreenUtils.scaleSize(2),
        width: width * 0.6
    },
    ahead: {
        height: ScreenUtils.scaleSize(45),
        width: ScreenUtils.scaleSize(45),
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        width: ScreenUtils.scaleSize(750),
        height: ScreenUtils.scaleSize(280)
    },
    image: {
        width: Dimensions.width,
        height: ScreenUtils.scaleSize(280)
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
    wrapper: {
        /*marginHorizontal: 5,*/
    },
    bar: {
        height: ScreenUtils.scaleSize(45),
        justifyContent: 'center',
    },
    barText: {
        width: width * 0.6,
        marginLeft: ScreenUtils.scaleSize(2),
        color: '#ff7e00',
        fontSize: ScreenUtils.setSpText(15),
        lineHeight: ScreenUtils.scaleSize(45),
    },
    viewForText: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});