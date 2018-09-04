import React , {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

import * as ScreenUtils from "../Common/ScreenUtils";
import Data from '../../res/json/LendPageData';
import Swiper from 'react-native-swiper';
import SearchInputPart from "./SearchInputPart";
import NetUtils from "../Common/NetUtils";
let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');

let url = "http://9trhkj.natappfree.cc/app/goods/search.do";

export default class SearchPage extends Component{
    constructor(props){
        super(props);
        this.utils = new NetUtils;
        this.state={
            text:null,
            par:0
        }
    }
    static navigationOptions = {
        headerRight: (
            <SearchInputPart/>
        ),
        headerStyle: {
            marginTop: StatusBar.currentHeight
        }
    };
    componentDidMount() {
        this.onLoad();
    }


    onLoad() {
        const { params } = this.props.navigation.state;
        console.log('1111111111');
        this.utils.fetchNetRepository(url,
            {"text": params.text })
            .then(result => {
                console.log(result);
                console.log(params.text);
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
    render(){
        const { params } = this.props.navigation.state;
        if (this.state.par === 0) {
            return(
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
        else {
            return(
                <View style={styles.wholeview}>
                    <StatusBar
                        backgroundColor='white'
                    />
                    <View style={{height:80,width:width,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
                        <Text style={styles.text}>没有找到"{params.text}"的搜索结果</Text>
                        <Text style={styles.text}>为您推荐以下商品</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={{fontSize:ScreenUtils.setSpText(16),color:'#E5E5E5'}}>------------</Text>
                        <Text style={{fontSize:ScreenUtils.setSpText(16),color:'red'}}>搜索推荐</Text>
                        <Text style={{fontSize:ScreenUtils.setSpText(16),color:'#E5E5E5'}}>------------</Text>
                    </View>
                    <View style={styles.container1}>
                        <Swiper
                            style={styles.wrap1}
                            loop={true}
                            autoplay={true}
                            autoplayTimeout={3}
                            horizontal={true}
                            paginationStyle={{bottom:ScreenUtils.scaleSize(7)}}
                            dotStyle={{backgroundColor:'#E1E1E1', width:ScreenUtils.scaleSize(14), height:ScreenUtils.scaleSize(14)}}
                            activeDotStyle={{backgroundColor:'#F6D574', width:ScreenUtils.scaleSize(14), height:ScreenUtils.scaleSize(14)}}
                        >
                            <Image resizemode={'contain'} style={styles.image} source={require('../../res/Images/banner1.png')}/>
                            <Image resizemode={'contain'} style={styles.image} source={require('../../res/Images/banner2.png')}/>
                        </Swiper>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={{fontSize:ScreenUtils.setSpText(16),color:'#E5E5E5'}}>------------</Text>
                        <Text style={{fontSize:ScreenUtils.setSpText(16),color:'black'}}>热门商品</Text>
                        <Text style={{fontSize:ScreenUtils.setSpText(16),color:'#E5E5E5'}}>------------</Text>
                    </View>

                    <View>
                        <View style={{marginTop:ScreenUtils.scaleSize(45),marginLeft:ScreenUtils.scaleSize(20),marginRight:ScreenUtils.scaleSize(20),justifyContent:'space-between',flexDirection:'row'}}>
                            <TouchableOpacity
                                onPress={()=>{
                                   this.props.navigation.navigate('WebPage',{url: item.value.url, ...this.props,})
                                }}
                            >
                                <View style={{justifyContent:'center',alignItems:'center',width:width/5,height:ScreenUtils.scaleSize(58),backgroundColor:'white'}}>
                                    <Text>大宝</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate('WebPage',{url: item.value.url, ...this.props,})
                                }}
                            >
                                <View style={{justifyContent:'center',alignItems:'center',width:width/5,height:ScreenUtils.scaleSize(58),backgroundColor:'white'}}>
                                    <Text>大宝</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate('WebPage',{url: item.value.url, ...this.props,})
                                }}
                            >
                                <View style={{justifyContent:'center',alignItems:'center',width:width/5,height:ScreenUtils.scaleSize(58),backgroundColor:'white'}}>
                                    <Text>大宝</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate('WebPage',{url: item.value.url, ...this.props,})
                                }}
                            >
                                <View style={{justifyContent:'center',alignItems:'center',width:width/5,height:ScreenUtils.scaleSize(58),backgroundColor:'white'}}>
                                    <Text>大宝</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:ScreenUtils.scaleSize(18),marginLeft:ScreenUtils.scaleSize(20),marginRight:ScreenUtils.scaleSize(20),justifyContent:'space-between',flexDirection:'row'}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate('WebPage',{url: item.value.url, ...this.props,})
                                }}
                            >
                                <View style={{justifyContent:'center',alignItems:'center',width:width/5,height:ScreenUtils.scaleSize(58),backgroundColor:'white'}}>
                                    <Text>大宝</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate('WebPage',{url: item.value.url, ...this.props,})
                                }}
                            >
                                <View style={{justifyContent:'center',alignItems:'center',width:width/5,height:ScreenUtils.scaleSize(58),backgroundColor:'white'}}>
                                    <Text>大宝</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate('WebPage',{url: item.value.url, ...this.props,})
                                }}
                            >
                                <View style={{justifyContent:'center',alignItems:'center',width:width/5,height:ScreenUtils.scaleSize(58),backgroundColor:'white'}}>
                                    <Text>大宝</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate('WebPage',{url: item.value.url, ...this.props,})
                                }}
                            >
                                <View style={{justifyContent:'center',alignItems:'center',width:width/5,height:ScreenUtils.scaleSize(58),backgroundColor:'white'}}>
                                    <Text>大宝</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>




                </View>
            )
        }

    }
    ViewList=(item)=>{
        return(
            <View style={{alignItems:'center',justifyContent:'center',paddingTop:ScreenUtils.scaleSize(16)}}>
                <View style={styles.wrap}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={{uri:item.item.icon}}
                               style={styles.icon}
                        />
                        <View style={styles.two}>
                            <View style={{flexDirection:'row'}}>

                                <Text style={{color:'black',fontSize:ScreenUtils.setSpText(19),paddingBottom:7}}>{item.item.name}</Text>

                                <View style={{borderRadius:2,
                                    marginLeft:ScreenUtils.scaleSize(28),
                                    marginTop:4,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    height:ScreenUtils.scaleSize(38),
                                    width:ScreenUtils.scaleSize(96),
                                    backgroundColor:'#F0F2F4'}}>
                                    <Text style={{fontSize:ScreenUtils.setSpText(14.5)}}>{item.item.tab1}</Text>
                                </View>
                                <View style={{borderRadius:2,
                                    marginLeft:ScreenUtils.scaleSize(28),
                                    marginTop:4,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    height:ScreenUtils.scaleSize(38),
                                    width:ScreenUtils.scaleSize(96),
                                    backgroundColor:'#F0F2F4'}}>
                                    <Text style={{fontSize:ScreenUtils.setSpText(15)}}>{item.item.tab2}</Text>
                                </View>
                                <View style={styles.touch}>
                                    <Text style={{color:'#F36B36',fontSize:ScreenUtils.setSpText(14)}}>{item.item.label}</Text>
                                </View>

                            </View>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{width:width*0.75,fontSize:ScreenUtils.setSpText(16)}}
                            >{item.item.introduction}</Text>
                        </View>

                    </View>
                    <Image
                        style={styles.ahead}
                        source={require('../../res/Images/ahead.png')}
                    />
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F3F4F6'
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
    two:{
        justifyContent:'center',
        paddingLeft:5
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
    ahead:{
        height:ScreenUtils.scaleSize(55),
        width:ScreenUtils.scaleSize(55),
    },
    wrap1:{
    },
    container1:{
        width:ScreenUtils.scaleSize(750),
        height:ScreenUtils.scaleSize(280),
        marginTop:ScreenUtils.scaleSize(38)
    },
    image:{
        width:Dimensions.width,
        height:ScreenUtils.scaleSize(280)
    },
    wholeview:{
        flex:1,
        backgroundColor:'#F3F4F6'
    },
    text:{
        fontSize:ScreenUtils.setSpText(16),
        color:'#D1D1D1'
    },
    textStyle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:ScreenUtils.scaleSize(33),
        marginBottom:ScreenUtils.scaleSize(10),
    },
    textInputStyle:{
        backgroundColor:'white',
        width:ScreenUtils.scaleSize(610),
        alignItems:'flex-start',
        paddingTop:ScreenUtils.scaleSize(0.1),
        height:ScreenUtils.scaleSize(64)
    },


});