import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  Dimensions,
  StatusBar
} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";
import NetUtils from "../../Common/NetUtils";
let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
let url = 'http://47.98.148.58/app/user/inviteList.do';

export default class Message extends Component{
  static navigationOptions={
    headerTitle: '我的邀请',
    headerTitleStyle:{
      flex:1,
      textAlign: 'center'
    },
    headerRight:(
        <View/>
    ),
    headerStyle:{
      marginTop:StatusBar.currentHeight
    }
  };
  constructor(props){
    super(props);
    this.utils = new NetUtils;
    this.state=({
      data:[]
    })
  }
  componentDidMount(){
    this.onLoad();
  }
  onLoad() {
    this.utils.fetchNetRepository(url)
        .then(result => {
          console.log(result);
          let data = result.data;
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
            data: datas,
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
  render(){
    return(
        <View style={styles.container}>
          <StatusBar
              backgroundColor='white'
          />
          <FlatList
              renderItem={this.ViewList}
              data={this.state.data}
              keyExtractor={(item, index) => index}
          />
        </View>
    )
  }

  _keyExtractor = (item, index) => index.toString();

  ViewList=({item})=>{
    return(
        <View style={styles.wholeview}>
          <View style={styles.wrap}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image style={styles.imageStyle} source={{uri:item.value.path}}/>
              <Text style={styles.nameStyle}>{item.value.nickName}</Text>
            </View>
            <Text style={styles.teleStyle}>{item.value.phoneNum}</Text>
          </View>
          <View style={{marginLeft:ScreenUtils.scaleSize(20),backgroundColor:'gray',height:1,width:width}}></View>
        </View>
    );
  };
}

const styles=StyleSheet.create({
  wholeview:{
    flexDirection:'column',
  },
  wrap:{
    flex:1,
    backgroundColor:'white',
    flexDirection:'row',
    alignItems:'center',
    width:ScreenUtils.scaleSize(749),
    height:0.099*height,
    justifyContent:'space-between'
  },
  container:{
    flex:1
  },
  nameStyle:{
    marginLeft:ScreenUtils.scaleSize(30),
    fontSize:ScreenUtils.setSpText(18),
    color:'black'
  },
  teleStyle:{
    marginRight:ScreenUtils.scaleSize(20),
    fontSize:ScreenUtils.setSpText(15.5),
  },
  imageStyle: {
    marginLeft:ScreenUtils.scaleSize(20),
    width: ScreenUtils.scaleSize(88),
    height: ScreenUtils.scaleSize(88),
    borderRadius: ScreenUtils.scaleSize(88 / 2),
  },

});
