import React , {Component}from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Modal, AsyncStorage, Platform
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

let url = 'http://47.98.148.58/app/goods/homePage.do';
let Url = 'http://47.98.148.58/app/goods/clickCount.do';
let URL = 'http://47.98.148.58/app/user/checkUserStatusByTkid.do';
let Index = 0;
let isIphoneX = Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812;

export default class LendPage extends Component {
  constructor(props) {
    super(props);
    this.utils = new NetUtils;
    this.state = {
      dataArray: [],
      gdsId:"",
      BannerArray:[],
      kuaibaoArray:[],
      ActivityArray:[],
      showFoot:0,
      Refresh:true,
      length:0,
      currentPage:1,
      totalPage:0,
      isFirst:true,
      visible:false,
      FdataUrl:'',
      FdataPic:'',
      tab1Pic:'',
      tab1Title:'',
      tab2Pic:'',
      tab2Title:'',
      tab3Pic:'',
      tab3Title:'',
      tab4Pic:'',
      tab4Title:'',
      tab5Pic:'',
      tab5Title:'',
      img1:'',
      img2:'',
      url1:'',
      url2:'',
      tab1Id:'',
      tab2Id:'',
      tab3Id:'',
      tab4Id:'',
      tab5Id:'',
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

  render(){
    return(
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
                style={styles.wrap2}
                loop={true}
                autoplay={true}
                autoplayTimeout={3}
                horizontal={true}
                paginationStyle={{bottom:ScreenUtils.scaleSize(7)}}
                dotStyle={{backgroundColor:'#E1E1E1', width:ScreenUtils.scaleSize(14), height:ScreenUtils.scaleSize(14)}}
                activeDotStyle={{backgroundColor:'#F6D574', width:ScreenUtils.scaleSize(14), height:ScreenUtils.scaleSize(14)}}
            >
              <Image resizemode={'contain'} style={styles.image} source={{uri:this.state.img1}}/>
              <Image resizemode={'contain'} style={styles.image}
                     source={{uri:this.state.img2}}/>
            </Swiper>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{
                  this.props.navigation.navigate('new',{tabId:this.state.tab1Id,tab:'tb_new',title:this.state.tab1Title});
                }}
            >
              <Image style={styles.image1} source={{uri:this.state.tab1Pic}}/>
              <Text style={styles.tab1}>{this.state.tab1Title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{
                  this.props.navigation.navigate('black',{tabId:this.state.tab2Id,tab:'tb_black',title:this.state.tab2Title})
                }}
            >
              <Image style={styles.image2} source={{uri:this.state.tab2Pic}}/>
              <Text style={styles.tab2}>{this.state.tab2Title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{
                  this.props.navigation.navigate('long',{tabId:this.state.tab3Id,tab:'tb_long',title:this.state.tab3Title})
                }}
            >
              <Image style={styles.image3} source={{uri:this.state.tab3Pic}}/>
              <Text style={styles.tab3}>{this.state.tab3Title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{
                  this.props.navigation.navigate('high',{tabId:this.state.tab4Id,tab:'tb_high',title:this.state.tab4Title})
                }}
            >
              <Image style={styles.image4} source={{uri:this.state.tab4Pic}}/>
              <Text style={styles.tab4}>{this.state.tab4Title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{
                  this.props.navigation.navigate('low',{tabId:this.state.tab5Id,tab:'tb_low',title:this.state.tab5Title})
                }}
            >
              <Image style={styles.image5} source={{uri:this.state.tab5Pic}}/>
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
                  onPress={()=>this.props.navigation.navigate('WebPage', {url: this.state.FdataUrl, ...this.props})}
              >
                <Image
                    source={{uri:this.state.FdataPic}}
                    style={{height:ScreenUtils.scaleSize(500), width:ScreenUtils.scaleSize(500)}}
                />
              </TouchableOpacity>
              <Text>|</Text>
              <TouchableOpacity onPress={()=> this._onClose()}>
                <Icon name="close-o" size={40} color={'#FFE059'}/>
              </TouchableOpacity>
            </View>
          </Modal>
          <FlatList
              renderItem={this.ViewList}
              data={this.state.dataArray}
              ListFooterComponent={this._renderFooter.bind(this)}
              onEndReached={()=>this._onEndReached()}
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
      console.log("Device register succeed, registrationId " + registrationId);
    });
    JPushModule.addReceiveOpenNotificationListener(() => {
      this.props.navigation.navigate('Fourth');
    })
  }

  _onload(){
    AsyncStorage.getItem('login',(error,result)=>{
      this.utils.fetchNetRepository(URL, {"tkid":result});
      console.log("这是政哥返给我的"+result)
    });
  }



  onLoad(page) {
    this.utils.fetchNetRepository(url,
        {"pageNo":page})
        .then(result => {
          let data = result.data.commodityList;

          let length = result.data.total;
          let page = parseInt(length/10)+1;
          console.log(result);
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
          if (this.state.currentPage>=page){
            foot = 1
          }
          this.setState({
            dataArray: this.state.dataArray.concat(datas),
            length:length,
            totalPage:page,
            showFoot:foot,
            FdataUrl:result.data.fwlist.fw_url,
            FdataPic:result.data.fwlist.fw_pic,
          });
          if(this.state.currentPage%2 === 0){
            console.log("111111111111");
            this.setModalVisible(true);
          }
          data = "";
          datas = "";
          if(this.state.isFirst === true){
            let ActivityData = result.data.activity;
            let banner = result.data.Banner;
            let kuaibaodata = result.data.mimiBulletin;
            this.setState({
              ActivityArray: ActivityData,
              isFirst:false,
              img1:banner[0].BannerImg,
              img2:banner[1].BannerImg,
              url1:banner[0].BannerUrl,
              url2:banner[1].BannerUrl,
              kuaibaoArray: kuaibaodata,
              tab1Pic:result.data.Tab[0].TabInco,
              tab1Title:result.data.Tab[0].TabName,
              tab1Id:result.data.Tab[0].TabId,
              tab2Pic:result.data.Tab[1].TabInco,
              tab2Title:result.data.Tab[1].TabName,
              tab2Id:result.data.Tab[1].TabId,
              tab3Pic:result.data.Tab[2].TabInco,
              tab3Title:result.data.Tab[2].TabName,
              tab3Id:result.data.Tab[2].TabId,
              tab4Pic:result.data.Tab[3].TabInco,
              tab4Title:result.data.Tab[3].TabName,
              tab4Id:result.data.Tab[3].TabId,
              tab5Pic:result.data.Tab[4].TabInco,
              tab5Title:result.data.Tab[4].TabName,
              tab5Id:result.data.Tab[4].TabId,
            });

          }

        })

        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }

  _onEndReached(){
    if(!this.canAction) return;
    if (this.state.showFoot !== 0){
      return;
    }
    if ((this.state.currentPage!==1)&&(this.state.currentPage>=this.state.totalPage)){
      return;
    }else {
      this.setState({
        currentPage:this.state.currentPage+1
      })
    }
    this.setState({showFoot:2});
    this.onLoad(this.state.currentPage+1);

  }

  _kuaibao(){
    let dataArray = this.state.kuaibaoArray;
    let Activity = this.state.ActivityArray;
    return<View style={styles.crow}>
      <TouchableOpacity
          style={styles.rowStyle}
          onPress={()=>{
            this.props.navigation.navigate('WebPage', {url: dataArray[Index].url, ...this.props,})
          }}
      >
        <View style={styles.rightStyle}>
          <Image style={{marginTop:ScreenUtils.scaleSize(4),width:ScreenUtils.scaleSize(122),height:ScreenUtils.scaleSize(30)}} source={require('../../res/Images/米米快报.png')}/>
          <Text style={{paddingLeft:ScreenUtils.scaleSize(13),color:'red',fontSize:ScreenUtils.setSpText(14.5)}}>恭喜</Text>
          <View style={{marginLeft:ScreenUtils.scaleSize(3),flexDirection: 'row', flex: 1 }}>
            {this.scroll()}
          </View>
          <Image source={require('../../res/Images/ahead.png')} style={styles.icon02}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={()=>{
            this.props.navigation.navigate('WebPage', {url: Activity.activityUrl, ...this.props})
          }}
      >
        <Image style={{width:ScreenUtils.scaleSize(662.4),height:ScreenUtils.scaleSize(141),marginBottom:ScreenUtils.scaleSize(11)}} source={{uri:Activity.activityImg}}/>
      </TouchableOpacity>
    </View>
  }
  scroll(){
    let array = [{ content: "" }];
    let dataArray = this.state.kuaibaoArray;
    if (dataArray && dataArray.length > 0) {
      array = [];
      for (let item of dataArray) {
        array.push({ content: item.text});
      }
    }
    if(array[0].content !== ""&&array.length>=1){
      return<ScrollVertical
          onChange={(index => {
            Index = index;
          })}
          enableAnimation={true}
          data={array}
          delay={2500}
          duration={1000}
          scrollHeight={ScreenUtils.scaleSize(45)}
          scrollStyle={{ alignItems: 'flex-start' }}
          textStyle={{ color: 'black', fontSize:ScreenUtils.setSpText(13) }} />
    }
  }

  _renderFooter(){
    if (this.state.showFoot === 1) {
      return (
          <View style={{height:30,alignItems:'center',justifyContent:'flex-start'}}>
            <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}> 没有更多数据了 </Text>
          </View>
      );
    }
    else if(this.state.showFoot === 2) {
      return (
          <View style={styles.loading}>
            <ActivityIndicator/>
            <Text>Loading...</Text>
          </View>
      );
    } else if(this.state.showFoot === 0){
      return (
          <View style={styles.footer}>
            <Text/>
          </View>
      );
    }
  }

  _header = () => {
    return <View style={{paddingBottom:ScreenUtils.scaleSize(10)}}>
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

  ViewList=({item})=>{
    return(
        <View style={{alignItems:'center',justifyContent:'center',paddingTop:ScreenUtils.scaleSize(16)}}>
          <TouchableOpacity
              onPress={()=>{
                this.onPush(item.value.commodityId);
                this.props.navigation.navigate('WebPage', {url:item.value.commodityUrl, ...this.props})
              }}
          >
            <View style={styles.wrap}>
              <View style={{flexDirection:'row'}}>
                <Image source={{uri:item.value.commodityInco}}
                       style={styles.icon}
                />
                <View style={styles.two}>
                  <View style={{flexDirection:'row'}}>

                    <Text style={{color:'black',fontSize:ScreenUtils.setSpText(17),paddingBottom:7}}>{item.value.commodityName}</Text>

                    <View style={{borderRadius:2,
                      marginLeft:ScreenUtils.scaleSize(28),
                      marginTop:4,
                      justifyContent:'center',
                      alignItems:'center',
                      height:ScreenUtils.scaleSize(38),
                      width:ScreenUtils.scaleSize(96),
                      backgroundColor:'#F0F2F4'}}>
                      <Text style={{fontSize:ScreenUtils.setSpText(13)}}>{item.value.commodityTagFirst[0]}</Text>
                    </View>
                    <View style={{borderRadius:2,
                      marginLeft:ScreenUtils.scaleSize(28),
                      marginTop:4,
                      justifyContent:'center',
                      alignItems:'center',
                      height:ScreenUtils.scaleSize(38),
                      width:ScreenUtils.scaleSize(96),
                      backgroundColor:'#F0F2F4'}}>
                      <Text style={{fontSize:ScreenUtils.setSpText(13)}}>{item.value.commodityTagFirst[1]}</Text>
                    </View>
                    <View style={styles.touch}>
                      <Text style={{color:'#F36B36',fontSize:ScreenUtils.setSpText(13.5)}}>{item.value.commodityTagSecond}</Text>
                    </View>

                  </View>
                  <Text
                      numberOfLines={1}
                      ellipsizeMode='tail'
                      style={{width:width*0.75,fontSize:ScreenUtils.setSpText(15)}}
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
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFFFFF',
    width:55,
    height:20,
    borderRadius:15,
    borderWidth:1,
    borderColor:'#F36B36',
    marginTop:5,
    right:3,
    position:'absolute'
  },
  rowStyle:{
    width:width-30,
    flexDirection:'row',
    backgroundColor:'white',
    height:27,
    marginBottom:2,
  },
  rightStyle:{
    height:ScreenUtils.scaleSize(45),
    width:width*0.92,
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomWidth:2,
    borderBottomColor:'#F3F4F6',
    paddingTop:ScreenUtils.scaleSize(3)
  },
  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
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
  },
  loading:{
    alignItems:'center',
    justifyContent:'center'
  },
  wrap2:{
  },
  container2:{
    width:ScreenUtils.scaleSize(750),
    height:ScreenUtils.scaleSize(280)
  },
  image:{
    width:Dimensions.width,
    height:ScreenUtils.scaleSize(280)
  },
  ModalImage:{
    justifyContent:'center',
    alignItems:'center',
  },
  closeButton:{
    width:ScreenUtils.scaleSize(40),
    height:ScreenUtils.scaleSize(40),
    justifyContent:'center',
    alignItems:'center',
  },
  wrapper: {
    /*marginHorizontal: 5,*/
  },
  bar: {
    height:ScreenUtils.scaleSize(45),
    justifyContent: 'center',
  },
  barText: {
    width:width*0.6,
    marginLeft:ScreenUtils.scaleSize(2),
    color: '#ff7e00',
    fontSize:ScreenUtils.setSpText(15),
    lineHeight:ScreenUtils.scaleSize(45),
  },
  viewForText: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
