import React, {Component} from 'react';
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
import Swiper from 'react-native-swiper';
import SearchInputPart from "./SearchInputPart";
import NetUtils from "../Common/NetUtils";

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');

let url = "http://47.98.148.58/app/goods/search.do";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.utils = new NetUtils;
    this.state = {
      text: "",
      par: 0,
      dataArray: [],
      datas:[],
      Datas:[],
      img1:'',
      img2:'',
      url1:'',
      url2:''
    }
  }

  static navigationOptions = {
    headerStyle: {
      marginTop: StatusBar.currentHeight
    }
  };

  componentDidMount() {
    this.onLoad();
  }

  onLoad() {
    const {params} = this.props.navigation.state;
    this.utils.fetchNetRepository(url,
        {"text": params.text})
        .then(result => {
          console.log(result);
          let re = result.code;
          let data = result.data.commodityList;
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
            dataArray: datas,
            par: re,
            img1:result.data.banner[0].banner_img_url,
            img2:result.data.banner[1].banner_img_url,
            url1:result.data.banner[0].banner_url,
            url2:result.data.banner[1].banner_url,
          });
          data = "";
          datas = "";
        })

        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }
  _keyExtractor = (item, index) => index.toString();

  addItem() {
    let dataArray = this.state.dataArray;
    dataArray.length=4;
    return dataArray.map((item) => {
      return <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('WebPage', {url: item.value.url, ...this.props,})
          }}
      >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: width / 5,
          height: ScreenUtils.scaleSize(58),
          backgroundColor: 'white'
        }}>
          <Text style={styles.Name}>{item.value.gds_name}</Text>
        </View>
      </TouchableOpacity>
    })

  };

  render() {
    const {params} = this.props.navigation.state;
    if (this.state.par === 0) {
      return (
          <View style={styles.container}>
            <StatusBar
                backgroundColor='white'
            />
            <FlatList
                renderItem={this.ViewList}
                data={this.state.dataArray}
                keyExtractor={(item, index) => index}
            />
          </View>
      )
    }
    else {
      return (
          <View style={styles.wholeview}>
            <StatusBar
                backgroundColor='white'
            />
            <View style={{
              height: 80,
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white'
            }}>
              <Text style={styles.text}>没有找到"{params.text}"的搜索结果</Text>
              <Text style={styles.text}>为您推荐以下商品</Text>
            </View>
            <View style={styles.textStyle}>
              <Text style={{fontSize: ScreenUtils.setSpText(16), color: '#E5E5E5'}}>------------</Text>
              <Text style={{fontSize: ScreenUtils.setSpText(16), color: 'red'}}>搜索推荐</Text>
              <Text style={{fontSize: ScreenUtils.setSpText(16), color: '#E5E5E5'}}>------------</Text>
            </View>
            <View style={styles.container1}>
              <Swiper
                  style={styles.wrap1}
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
                <Image resizemode={'contain'} style={styles.image} source={{uri:this.state.img1}}/>
                <Image resizemode={'contain'} style={styles.image}
                       source={{uri:this.state.img2}}/>
              </Swiper>
            </View>
            <View style={styles.textStyle}>
              <Text style={{fontSize: ScreenUtils.setSpText(16), color: '#E5E5E5'}}>------------</Text>
              <Text style={{fontSize: ScreenUtils.setSpText(16), color: 'black'}}>热门商品</Text>
              <Text style={{fontSize: ScreenUtils.setSpText(16), color: '#E5E5E5'}}>------------</Text>
            </View>

            <View>
              <View style={{
                marginTop: ScreenUtils.scaleSize(45),
                marginLeft: ScreenUtils.scaleSize(20),
                marginRight: ScreenUtils.scaleSize(20),
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}>
                {this.addItem()}
              </View>
            </View>
          </View>
      )
    }

  }

  ViewList = ({item}) => {
    return (
        <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
          <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('WebPage', {url: item.value.commodityUrl, ...this.props,})
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
                      color: '#333333',
                      fontSize: ScreenUtils.setSpText(19),
                      paddingBottom: 7
                    }}>{item.value.commodityName}</Text>
                    <View style={styles.label}>
                      <Text style={{
                        fontSize: ScreenUtils.setSpText(11),
                        color: '#F3713D'
                      }}>{item.value.red_tab}</Text>
                    </View>
                  </View>
                  <Text>{item.value.gds_intro}</Text>
                </View>
              </View>
              <View style={styles.three}>

                <Image style={{height: ScreenUtils.scaleSize(30), width: ScreenUtils.scaleSize(45),}}
                       source={require('../../res/Images/ahead.png')}/>

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
    backgroundColor: '#F3F4F6'
  },
  two: {
    justifyContent: 'center',
    paddingLeft: 5
  },
  touch: {
    marginLeft: ScreenUtils.scaleSize(118),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 55,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F36B36',
    marginTop: 5
  },
  ahead: {
    height: ScreenUtils.scaleSize(55),
    width: ScreenUtils.scaleSize(55),
  },
  wrap1: {},
  container1: {
    width: ScreenUtils.scaleSize(750),
    height: ScreenUtils.scaleSize(280),
    marginTop: ScreenUtils.scaleSize(38)
  },
  image: {
    width: Dimensions.width,
    height: ScreenUtils.scaleSize(280)
  },
  wholeview: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  text: {
    fontSize: ScreenUtils.setSpText(16),
    color: '#D1D1D1'
  },
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ScreenUtils.scaleSize(33),
    marginBottom: ScreenUtils.scaleSize(10),
  },
  textInputStyle: {
    backgroundColor: 'white',
    width: ScreenUtils.scaleSize(610),
    alignItems: 'flex-start',
    paddingTop: ScreenUtils.scaleSize(0.1),
    height: ScreenUtils.scaleSize(64)
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
  },
  wrap: {
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
  three: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Name:{
    fontSize:ScreenUtils.setSpText(15)
  }


});
