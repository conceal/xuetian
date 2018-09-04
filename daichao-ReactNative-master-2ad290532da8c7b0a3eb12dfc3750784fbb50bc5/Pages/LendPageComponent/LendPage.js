import React , {Component}from 'react';
import {
    FlatList,
    View,
    Text ,
    Image ,
    TouchableOpacity ,
    StyleSheet,
    StatusBar,
    Platform,
} from 'react-native';

import HomeTextInput from './TextInputPart';
import HomeARC from './ARCPart';
import Data from '../../res/json/LendData';
import Report from '../../res/json/ReportData';
import * as ScreenUtils from "../Common/ScreenUtils";
import NetUtils from "../Common/NetUtils";
let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
let url = 'http://tsmsy.natapp1.cc/app/goods/homePage.do';
let isIphoneX = Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812;

export default class LendPage extends Component {
    constructor(props) {
        super(props);
        this.utils = new NetUtils;
        this.state = {
            dataArray: [],
            isLoading: true,
            gdsId:""
        }
    }

    render(){
        return(
            <View style={styles.container}>
              {
                  Platform.OS === 'ios' ?
                      <View style={{height: Platform.OS === 'ios' ? (isIphoneX ? 40 : 20) : 0, backgroundColor: '#FFE059'}}>
                      </View> : null
              }
                <StatusBar
                    backgroundColor="#FFE059"
                />
                <HomeTextInput {...this.props}/>
                <HomeARC/>
                <View style={styles.row}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={()=>this.props.navigation.navigate('new',{tab:'tb_new',title:'新口子'})}
                    >
                        <Image style={styles.image1} source={require('../../res/Images/xinkouzi.png')}/>
                        <Text style={styles.tab1}>新口子</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={()=>this.props.navigation.navigate('black',{tab:'tb_black',title:'黑户专区'})}
                    >
                        <Image style={styles.image2} source={require('../../res/Images/heihuzhuanqu.png')}/>
                        <Text style={styles.tab2}>黑户专区</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={()=>this.props.navigation.navigate('long',{tab:'tb_long',title:'长周期'})}
                    >
                        <Image style={styles.image3} source={require('../../res/Images/changzhouqi.png')}/>
                        <Text style={styles.tab3}>长周期</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={()=>this.props.navigation.navigate('high',{tab:'tb_high',title:'高额度'})}
                    >
                        <Image style={styles.image4} source={require('../../res/Images/gaiedu.png')}/>
                        <Text style={styles.tab4}>高额度</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={()=>this.props.navigation.navigate('low',{tab:'tb_low',title:'低利率'})}
                    >
                        <Image style={styles.image5} source={require('../../res/Images/dililv.png')}/>
                        <Text style={styles.tab5}>低利率</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    renderItem={this.ViewList}
                    data={Data}
                    ListHeaderComponent={this._header}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
    componentDidMount() {
        this.onLoad();
    }

    onLoad() {
        this.utils.fetchNetRepository(url)
            .then(result => {
                console.log(result);
                let imageurl = result.data.Banner.BannerImg;
                let data = result.data.commodityList;
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



    _header = () => {
        return <View style={{paddingBottom:ScreenUtils.scaleSize(10)}}>

            <View style={styles.crow}>
                <TouchableOpacity style={styles.rowStyle}>
                    <View style={styles.rightStyle}>
                        <Image style={{marginTop:ScreenUtils.scaleSize(4),width:ScreenUtils.scaleSize(122),height:ScreenUtils.scaleSize(30)}} source={require('../../res/Images/米米快报.png')}/>
                        <Text style={{paddingLeft:ScreenUtils.scaleSize(13),color:'red',fontSize:ScreenUtils.setSpText(14.5)}}>恭喜</Text>
                        <Text numberOfLines={1}
                              ellipsizeMode='tail'
                              style={styles.reportText}
                        >{Report[0].text}</Text>
                        <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={{width:ScreenUtils.scaleSize(662.4),height:ScreenUtils.scaleSize(141),marginBottom:ScreenUtils.scaleSize(11)}} source={require('../../res/Images/qiang.png')}/>
                </TouchableOpacity>
            </View>

        </View>
    };

    ViewList=(item)=>{
        return(
            <View style={{alignItems:'center',justifyContent:'center',paddingTop:ScreenUtils.scaleSize(16)}}>
                <TouchableOpacity
                    onPress={()=>{
                        /*this.onPush();
                        this.setState={
                            gdsId:item.value.commodityId
                        };*/
                        this.props.navigation.navigate('WebPage', {url:item.value.commodityUrl, ...this.props})
                    }}
                >
                <View style={styles.wrap}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={{uri:item.item.icon}}
                               style={styles.icon}
                        />
                        <View style={styles.two}>
                            <View style={{flexDirection:'row'}}>

                                <Text style={{color:'black',fontSize:ScreenUtils.setSpText(17),paddingBottom:7}}>{item.item.name}</Text>

                                <View style={{borderRadius:2,
                                    marginLeft:ScreenUtils.scaleSize(28),
                                    marginTop:4,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    height:ScreenUtils.scaleSize(38),
                                    width:ScreenUtils.scaleSize(96),
                                    backgroundColor:'#F0F2F4'}}>
                                    <Text style={{fontSize:ScreenUtils.setSpText(13)}}>{item.item.tab1}</Text>
                                </View>
                                <View style={{borderRadius:2,
                                    marginLeft:ScreenUtils.scaleSize(28),
                                    marginTop:4,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    height:ScreenUtils.scaleSize(38),
                                    width:ScreenUtils.scaleSize(96),
                                    backgroundColor:'#F0F2F4'}}>
                                    <Text style={{fontSize:ScreenUtils.setSpText(13)}}>{item.item.tab2}</Text>
                                </View>
                                <View style={styles.touch}>
                                    <Text style={{color:'#F36B36',fontSize:ScreenUtils.setSpText(13.5)}}>{item.item.label}</Text>
                                </View>

                            </View>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{width:width*0.75,fontSize:ScreenUtils.setSpText(15)}}
                            >{item.item.introduction}</Text>
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
        flex:1,
        backgroundColor:'#F3F4F6'
    },
    imageStyle:{
        width:40,
        height:40
    },
    row:{
        height:ScreenUtils.scaleSize(177),
        width:ScreenUtils.scaleSize(730),
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        flexDirection:'row',
        marginTop:ScreenUtils.scaleSize(21),
        marginLeft:ScreenUtils.scaleSize(10),
        marginRight:ScreenUtils.scaleSize(10),
    },
    crow:{
        height:ScreenUtils.scaleSize(240),
        width:ScreenUtils.scaleSize(730),
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#FFFFFF',
        flexDirection:'column',
        borderRadius:10,
        marginTop:10,
        marginLeft:5,
        marginRight:5,
    },
    sectext:{
        color:'red'
    },
    two:{
        justifyContent:'center',
        paddingLeft:5
    },
    wrap:{
        height:80,
        width:width-10,
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        flexDirection:'row',
        paddingLeft:5,
        paddingRight:5,

    },
    touch:{
        marginLeft:ScreenUtils.scaleSize(118),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        width:55,
        height:20,
        borderRadius:15,
        borderWidth:1,
        borderColor:'#F36B36',
        marginTop:5
    },
    rowStyle:{
        width:width-30,
        flexDirection:'row',
        backgroundColor:'white',
        height:27,
        marginBottom:2,
    },
    rightStyle:{
        height:27,
        width:width*0.92,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:2,
        borderBottomColor:'#F3F4F6',
        paddingTop:ScreenUtils.scaleSize(3)
    },
    icon02:{
        height:27,
        width:21,
        marginLeft:ScreenUtils.scaleSize(0.1),
    },
    icon:{
        borderRadius:8,
        height:ScreenUtils.scaleSize(90),
        width:ScreenUtils.scaleSize(90),
        paddingLeft:5,
        paddingRight:10
    },
    tab1:{
        color:'#444444',
        fontSize:ScreenUtils.scaleSize(25.8),
        marginLeft:ScreenUtils.scaleSize(32),
        marginTop:ScreenUtils.scaleSize(16.6),
    },
    image1:{
        marginLeft:ScreenUtils.scaleSize(30),
        height:ScreenUtils.scaleSize(73.7),
        width:ScreenUtils.scaleSize(73.7),
    },
    tab2:{
        color:'#444444',
        fontSize:ScreenUtils.scaleSize(25.8),
        marginTop:ScreenUtils.scaleSize(16.6),
    },
    image2:{
        height:ScreenUtils.scaleSize(73.7),
        width:ScreenUtils.scaleSize(73.7),

    },
    tab3:{
        color:'#444444',
        fontSize:ScreenUtils.scaleSize(25.8),
        marginTop:ScreenUtils.scaleSize(16.6),
    },
    image3:{
        height:ScreenUtils.scaleSize(73.7),
        width:ScreenUtils.scaleSize(73.7),
    },
    tab4:{
        color:'#444444',
        fontSize:ScreenUtils.scaleSize(25.8),
        marginTop:ScreenUtils.scaleSize(16.6),
    },
    image4:{
        height:ScreenUtils.scaleSize(73.7),
        width:ScreenUtils.scaleSize(73.7),
    },
    tab5:{
        color:'#444444',
        fontSize:ScreenUtils.scaleSize(25.8),
        marginTop:ScreenUtils.scaleSize(16.6),
    },
    image5:{
        marginRight:ScreenUtils.scaleSize(30),
        height:ScreenUtils.scaleSize(73.7),
        width:ScreenUtils.scaleSize(73.7),

    },
    reportText:{
        fontSize:ScreenUtils.setSpText(15),
        marginLeft:ScreenUtils.scaleSize(2),
        width:width*0.6
    },
    ahead:{
        height:ScreenUtils.scaleSize(55),
        width:ScreenUtils.scaleSize(55),
    }
});

