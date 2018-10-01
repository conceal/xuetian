import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Modal, TouchableWithoutFeedback, DeviceEventEmitter
} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";
import NetUtils from '../../Common/NetUtils';
import WebPage from "../../WebPage";
import Icon from "react-native-vector-icons/EvilIcons";

let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');
let url = 'http://47.98.148.58/app/goods/classification.do';
let URL = 'http://47.98.148.58/app/goods/moreclassification.do';
let Url = 'http://47.98.148.58/app/goods/clickCount.do';
let Page=0;
let imageurl = "";
export default class High extends Component {
  constructor(props) {
    super(props);
    this.utils = new NetUtils;
    this.state = {
      dataArray: [],
      isLoading: true,
      id: 0,
      img: null,
      showFoot:0,
      Refresh:true,
      length:0,
      totalPage:0,
      First:true,
      currentPage:1,
      visible:false,
      FdataUrl:'',
      FdataPic:'',
      url:''
    }
  }



  onLoad(url,page) {
    const {params} = this.props.navigation.state;
    this.utils.fetchNetRepository(url,
        {"tabId":params.tab4Id,"pageNo":page},
    )
        .then(result => {
          console.log(result);
          let data = result.data.commodityList;
          if (this.state.First === true){
            imageurl = result.data.headerImg.headerImg;
            let length = result.data.total;
            Page = parseInt(length/10)+1;
            this.setState({
              First:false,
              totalPage:Page,
              url:result.data.headerImg.style_url
            })
          }
          console.log("进来没有");

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
          if(this.state.currentPage>=Page){
            foot = 1;
          }

          if (page === 1){
            this.setState({
              dataArray: datas,
              isLoading: false,
              img: imageurl,
              showFoot:foot,
            });
          } else {
            this.setState({
              dataArray: this.state.dataArray.concat(datas),
              isLoading: false,
              img: imageurl,
              showFoot:foot,
            });
          }

          if(page%2 === 0){
            console.log("111111111111");
            this.setModalVisible(true);
            this.setState({
              FdataUrl:result.data.fwlist.fw_url,
              FdataPic:result.data.fwlist.fw_pic,
            })
          }

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
    this.onLoad(url);
    this.changeTab4 = DeviceEventEmitter.addListener('ChangeTab4', (value)=>{
      //这里面是要调用的方法，比如：刷新
      //value:是下面页面在 通知 时 ，所传递过来的参数
      this.onLoad(url,1);
      this._flatList.scrollToIndex({viewPosition: 0, index: 0});
    });
  }
  componentWillUnmount(){
    this.changeTab4.remove();
  }

  setModalVisible(visible) {
    this.setState({
      visible: visible
    })
  }

  Load(){
    console.log(this.state.isLoading);
    if (this.state.isLoading === true) {
      return<View style={styles.loading}>
        <ActivityIndicator/>
        <Text>Loading...</Text>
      </View>
    }else {
      return<View style={{flex:1}}>
        <TouchableWithoutFeedback
            onPress={()=>this.props.navigation.navigate('WebPage', {url: this.state.url, ...this.props})}
        >
          <Image source={{uri:this.state.img}}
                 style={styles.ImageView}
          />
        </TouchableWithoutFeedback>
        <FlatList
            ref={(flatList)=>this._flatList = flatList}
            renderItem={this.ViewList}
            data={this.state.dataArray}
            ListFooterComponent={this._renderFooter.bind(this)}
            onEndReached={()=>this._onEndReached()}
            onEndReachedThreshold={0.1}
            keyExtractor={this._keyExtractor}


        />

      </View>
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderFooter(){
    if (this.state.showFoot === 1) {
      return (
          <View style={{height:30,alignItems:'center',justifyContent:'flex-start'}}>
            <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}> 没有更多数据了 </Text>
          </View> );
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
  _onEndReached(){
    if (this.state.showFoot !== 0){
      return;
    }
    if ((this.state.currentPage !== 1)&&(this.state.currentPage>=this.state.totalPage)){
      return;
    }else {
      this.setState({
        currentPage:this.state.currentPage+1
      })
    }
    this.setState({showFoot:2});
    console.log("UpdateCurrentPage:"+this.state.currentPage);
    this.onLoad(URL,this.state.currentPage+1);
  }

  render() {
    return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor='white'
          />
          {this.Load()}
          <Modal
              visible={this.state.visible}
              animationType='slide'
              transparent={true}
              onRequestClose={() =>this.setModalVisible(false)}>
            <View style={styles.modalStyle}>
              <TouchableOpacity
                  onPress={()=>{this.props.navigation.navigate('WebPage', {url: this.state.FdataUrl, ...this.props})}}
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
        </View>
    );
  }
  _onClose() {
    this.setState({
      visible: false
    })
  }

  onPush(id) {
    const {params} = this.props.navigation.state;
    this.utils.fetchNetRepository(Url,
        {"tabId": params.tab4Id, "gdsId": id},
    )
        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }

  CheckTab= ({item}) =>{
    if (item.value.commoditytab === "" || item.value.commoditytab === null){
      return<View/>
    } else {
      return<View style={styles.label}>
        <Text style={{
          fontSize: ScreenUtils.setSpText(11),
          color: '#F3713D'
        }}>{item.value.commoditytab}</Text>
      </View>
    }
  };

  ViewList = ({item}) => {
    return (
        <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
          <TouchableOpacity
              onPress={() => {
                this.onPush(item.value.commodityId);
                console.log(this.state.id);
                this.props.navigation.navigate('WebPage', {url: item.value.commodityUrl, ...this.props})
              }}
          >
            <View style={styles.wrap}>
              <View style={{flexDirection: 'row'}}>
                <Image source={{uri:item.value.commodityInco}}
                       style={styles.icon}
                />
                <View style={styles.two}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{
                      color: '#333333',
                      fontSize: ScreenUtils.setSpText(19),
                      paddingBottom: 7
                    }}>{item.value.commodityName}</Text>
                    {this.CheckTab({item})}
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
  footer:{
    flexDirection:'row',
    height:24,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:10,
  },
  loading:{
    alignItems:'center',
    justifyContent:'center'
  },
  modalStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});
