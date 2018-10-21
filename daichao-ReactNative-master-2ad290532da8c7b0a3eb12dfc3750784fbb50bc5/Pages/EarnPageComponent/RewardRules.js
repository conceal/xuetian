import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    FlatList,
    StatusBar
} from 'react-native';
import * as ScreenUtils from "../Common/ScreenUtils";

let URL = 'http://47.98.148.58/app/goods/rewardRuleInfoShow.do';
let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
import NetUtils from "../Common/NetUtils";

export default class RewardRules extends Component {
    static navigationOptions = {
        headerTitle: '奖励规则',
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
                let data = result.data.rewardCoupon;
                let datas = [];
                let i = 0;
                data.map(function (item) {
                    datas.push({
                        key: i,
                        value: item,
                    });
                    i++;
                });
                this.setState({
                    rewardData:datas
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
    };

    _keyExtractor = (item, index) => index.toString();

    _header() {
        return <View style={{
            paddingTop: ScreenUtils.scaleSize(25),
            paddingLeft: ScreenUtils.scaleSize(25),
            backgroundColor: 'white'
        }}>
            <Text style={{color:'black',fontSize: ScreenUtils.setSpText(19.5)}}>奖励规则</Text>
        </View>

    }

    detail() {
        return <View style={{marginLeft: width * 0.03, marginRight: width * 0.03, flex: 1, width: width * 0.95}}>
            <View style={{
                paddingTop: ScreenUtils.scaleSize(25),
                paddingLeft: ScreenUtils.scaleSize(25),
                backgroundColor: 'white'
            }}>
                <Text style={{color:'black',fontSize: ScreenUtils.setSpText(19.5)}}>积分兑换</Text>
            </View>
            <FlatList
                data={this.state.rewardData}
                renderItem={this.MoneyList}
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
                    <View style={{backgroundColor:'white',paddingLeft:ScreenUtils.scaleSize(20)}}>
                        <Text style={{color:'#4F4F4F',fontSize:ScreenUtils.setSpText(16)}}>1.参与方式</Text>
                        <Text style={{fontSize:ScreenUtils.setSpText(15)}}>通过“一呼百应 邀请有奖”活动邀请好友</Text>
                        <Text style={{color:'#4F4F4F',fontSize:ScreenUtils.setSpText(16)}}>2.奖励规则</Text>
                        <Text style={{fontSize:ScreenUtils.setSpText(15)}}>您的一个好友注册时填写了你的专属邀请码，你将获得1个积分。累计积分满10分则可以兑换与积分等价值的奖励金（暂定为一个积分 = 1元钱，最终解释权归官方所有）。</Text>
                        <Text style={{color:'#4F4F4F',fontSize:ScreenUtils.setSpText(16)}}>3.奖励结果查询入口</Text>
                        <Text style={{fontSize:ScreenUtils.setSpText(15)}}>“我的->我的奖励->奖励明细”查看奖励结果</Text>
                    </View>
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


    MoneyList = ({item}) => {
        return (
            <View style={{padding: ScreenUtils.scaleSize(25), backgroundColor: 'white', flexDirection: 'row'}}>
                <Image
                    style={styles.image}
                    source={{uri:item.value.rdImg}}
                />
                <View style={{paddingLeft: ScreenUtils.scaleSize(15)}}>
                    <Text style={{fontSize: ScreenUtils.setSpText(16), color: 'black'}}>{item.value.rdName}</Text>
                    <Text style={{fontSize: ScreenUtils.setSpText(13.5)}}>{item.value.rdIntro}</Text>
                    <Text style={{color:'red',fontSize: ScreenUtils.setSpText(13.5)}}>{item.value.rdPoint}</Text>
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


