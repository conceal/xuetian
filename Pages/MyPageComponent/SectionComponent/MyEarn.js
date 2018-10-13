import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    FlatList,
    StatusBar, Alert
} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";

let URL = 'http://47.98.148.58/app/user/myReward.do';
let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
import NetUtils from "../../Common/NetUtils";

export default class MyEarn extends Component {
    static navigationOptions = {
        headerTitle: '我的奖励',
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

    constructor(props) {
        super(props);
        this.netutils = new NetUtils;
        this.state = {
            rewardData:[],
            detail:[]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <View style={styles.row1Style}>
                </View>
                {this.money()}
                {this.detail()}
            </View>
        )
    };
    onLoad(){
        this.netutils.fetchNetRepository(URL)
            .then(result => {
                console.log(result);
                let data = result.data.bounties;
                if (data.length ===0){
                    Alert.alert(
                        '提示', //提示标题
                        '暂无奖励，请再接再厉', //提示内容
                        [
                            {
                                text: '确定'
                            }
                        ] //按钮集合
                    );
                }
                let datas = [];
                let i = 0;
                data.map(function (item) {
                    datas.push({
                        key: i,
                        value: item,
                    });
                    i++;
                });

                let Data = result.data.rewardDetails;
                let Datas = [];
                let j = 0;
                Data.map(function (item) {
                    Datas.push({
                        Key: j,
                        Value: item,
                    });
                    i++;
                });
                this.setState({
                    detail:Datas,
                    rewardData:datas,
                });

                data = null;
                datas = null;

                Data = null;
                Datas = null;
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error),
                })
            })
    }

    componentDidMount() {
        this.onLoad();
    };

    _keyExtractor = (item, index) => index.toString();

    _header() {
        return <View style={{
            paddingTop: ScreenUtils.scaleSize(25),
            paddingLeft: ScreenUtils.scaleSize(25),
            backgroundColor: 'white'
        }}>
            <Text style={{fontSize: ScreenUtils.setSpText(18)}}>奖励金</Text>
        </View>

    }

    detail() {
        return <View style={{marginLeft: width * 0.03, marginRight: width * 0.03, flex: 1, width: width * 0.95}}>
            <View style={{
                paddingTop: ScreenUtils.scaleSize(25),
                paddingLeft: ScreenUtils.scaleSize(25),
                backgroundColor: 'white'
            }}>
                <Text style={{fontSize: ScreenUtils.setSpText(18)}}>奖励明细</Text>
            </View>

            <FlatList
                data={this.state.detail}
                renderItem={this.DetailList}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={this.renderSeparator}
            />
        </View>
    }

    money = () => {
        return <View style={styles.container1}>

            <View style={styles.row2Style}>
                <View>
                    <View style={styles.TopStyle}>
                    </View>
                    <View style={styles.BottomStyle}>
                    </View>
                </View>
                <View style={{width: width * 0.95}}>
                    {this._header()}

                    <FlatList
                        data={this.state.rewardData}
                        renderItem={this.MoneyList}
                        keyExtractor={this._keyExtractor}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>

                <View>
                    <View style={styles.TopStyle}>
                    </View>
                    <View style={styles.BottomStyle}>
                    </View>
                </View>
            </View>

        </View>
    };
    renderSeparator = () => {
        return (
            <View style={{height: 1, backgroundColor: "#CED0CE"}}/>
        );
    };
    DetailList = ({item}) => {
        return (
            <View style={{padding: ScreenUtils.scaleSize(25), backgroundColor: 'white', flexDirection: 'row'}}>
                <Image
                    style={styles.DetailImage}
                    source={{uri:item.Value.path}}
                />
                <View style={{paddingLeft: ScreenUtils.scaleSize(15)}}>
                    <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>{item.Value.nickName}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: ScreenUtils.setSpText(14)}}>{item.Value.addTime} | </Text>
                        <Text style={{fontSize: ScreenUtils.setSpText(14)}}>{item.Value.msg1} | </Text>
                        <Text style={{fontSize: ScreenUtils.setSpText(14)}}>{item.Value.ms2}</Text>
                    </View>
                </View>
            </View>

        );
    };


    MoneyList = ({item}) => {
        return (
            <View style={{padding: ScreenUtils.scaleSize(25), backgroundColor: 'white', flexDirection: 'row'}}>
                <Image
                    style={styles.image}
                    source={{uri:item.value.path}}
                />
                <View style={{paddingLeft: ScreenUtils.scaleSize(15)}}>
                    <Text style={{fontSize: ScreenUtils.setSpText(18), color: 'black'}}>{item.value.rdName}</Text>
                    <Text style={{fontSize: ScreenUtils.setSpText(15)}}>使用密码 {item.value.rewardCode}</Text>
                    <Text style={{fontSize: ScreenUtils.setSpText(15)}}>发放时间 {item.value.addTime}</Text>
                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6'
    },
    container1: {
        backgroundColor:'#F3F4F6',
        height:"42%"
    },
    row1Style: {
        height: ScreenUtils.scaleSize(80),
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFE059',
        alignItems: 'center'
    },
    MeStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 1,
        height: ScreenUtils.scaleSize(60),
        fontSize: ScreenUtils.setSpText(22),
        color: '#4A4A4A',
        paddingLeft: ScreenUtils.scaleSize(100)
    },
    settingStyle: {
        width: ScreenUtils.scaleSize(120),
        height: ScreenUtils.scaleSize(40),
        fontSize: ScreenUtils.setSpText(18)
    },
    row2Style: {
        flexDirection: 'row',
        height: ScreenUtils.scaleSize(435),
        width: width * 0.95,

    },
    TopStyle: {
        backgroundColor: '#FFE059',
        width: width * 0.03,
        height: ScreenUtils.scaleSize(92.5),
    },
    centerStyle: {
        height: ScreenUtils.scaleSize(222),
        width: width * 0.94,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        elevation: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
    },
    BottomStyle: {
        backgroundColor: '#F3F4F6',
        width: width * 0.03,
        height: ScreenUtils.scaleSize(129.5),
    },
    imageStyle: {
        width: ScreenUtils.scaleSize(140),
        height: ScreenUtils.scaleSize(140),
        borderRadius: ScreenUtils.scaleSize(140 / 2),
    },
    nameStyle: {
        fontSize: ScreenUtils.setSpText(19),
        fontWeight: '600',
        color: '#333333',
        width: ScreenUtils.scaleSize(150)
    },
    buttonStyle: {
        width: width * 0.45,
        height: ScreenUtils.scaleSize(80),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE059',
        borderRadius: width * 0.05,
        marginTop: ScreenUtils.scaleSize(27),
        marginBottom: ScreenUtils.scaleSize(27),
        alignSelf: 'center',
    },
    button2Style: {
        width: ScreenUtils.scaleSize(690),
        height: ScreenUtils.scaleSize(88),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE059',
        marginTop: ScreenUtils.scaleSize(27),
        marginBottom: ScreenUtils.scaleSize(27),
        alignSelf: 'center',
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: ScreenUtils.scaleSize(88),
        marginBottom: ScreenUtils.scaleSize(3),
    },
    row5Style: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: ScreenUtils.scaleSize(75),
        marginBottom: ScreenUtils.scaleSize(20),
    },

    leftStyle: {
        width: ScreenUtils.scaleSize(72),
        paddingLeft: ScreenUtils.scaleSize(12),
        alignItems: 'center',
    },
    icon01: {
        height: ScreenUtils.scaleSize(40),
        width: ScreenUtils.scaleSize(40),
    },
    icon03: {
        height: ScreenUtils.scaleSize(28),
        width: ScreenUtils.scaleSize(36),
    },
    icon02: {
        height: ScreenUtils.scaleSize(60),
        width: ScreenUtils.scaleSize(60),
    },
    icon02t: {
        fontSize: ScreenUtils.setSpText(17)
    },
    icon04: {
        height: ScreenUtils.scaleSize(35),
        width: ScreenUtils.scaleSize(45),
    },
    icon05: {
        height: ScreenUtils.scaleSize(40),
        width: ScreenUtils.scaleSize(34),
    },
    rightStyle: {
        width: ScreenUtils.scaleSize(678),
        flexDirection:
            'row',
        justifyContent:
            'space-between',
        paddingLeft: ScreenUtils.scaleSize(5),
        alignItems: 'center',
    },
    listFont: {
        fontSize: ScreenUtils.setSpText(17)
    },
    image: {
        width: ScreenUtils.scaleSize(250),
        height: ScreenUtils.scaleSize(135),
        borderRadius: 4
    },
    DetailImage: {
        marginLeft:ScreenUtils.scaleSize(20),
        width: ScreenUtils.scaleSize(88),
        height: ScreenUtils.scaleSize(88),
        borderRadius: ScreenUtils.scaleSize(88 / 2),
    }
});


