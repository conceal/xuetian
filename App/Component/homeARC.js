/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry , StyleSheet, Text, View , ScrollView , Image , Alert} from 'react-native';
//导入TimerMixin
var TimerMixin = require('react-timer-mixin');
//导入图片资源
var ImageData = require('../src/json/ARC.json');
//获得屏幕宽度
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

export default class homeARC extends Component {
  //注册定时器
  //mixins:(TimerMixin);

  constructor(props) {
    super(props);
    this.state={
      currentPage:0
    }
  }

  

  render = ()=> {
    return(
      <View style={styles.container}>
        <ScrollView
          ref="scrollView"
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onMomentumScrollEnd ={(e)=> this.scrollEnd(e)}
          onScrollBeginDrag={()=>this.scrollBeginDrag()}
          onScrollEndDrag={()=>this.startTimer()}
        >
        {this.renderAllimage()}
        </ScrollView>
        <View style={styles.pageViewStyle}>
          {this.renderPage()}
      </View>
    </View>
    );
  }

  componentDidMount = ()=> {
    this.startTimer();
  }
  
  componentWillUnmount = ()=> {
    clearInterval(this.timer);
  }

  scrollBeginDrag = ()=> {
    console.log(1);
    clearInterval(this.timer);
  }

  startTimer = ()=> {
    var scrollView = this.refs.scrollView;
    var imgCount =ImageData.data.length;
    var that = this;
    this.timer = setInterval( function() {
      var currentPage = 0;
      if((that.state.currentPage+1) >= imgCount) {
        currentPage = 0;
      }else{
        currentPage = that.state.currentPage + 1;
      }
      that.setState({
        currentPage:currentPage
      });

      var offsetX = currentPage * width;
      scrollView.scrollTo({x: offsetX , y: 0, animated: true});
    },3000);
  }

  scrollEnd= (e)=> {
    var offsetX = e.nativeEvent.contentOffset.x;
    var currentPage = Math.floor(offsetX/width);
    this.setState({
      currentPage:currentPage,
    });
  }
  //加载所有图片
  renderAllimage= ()=> {
    //定义一个数组
    var allImages = [];
    //拿到图片数据
    var imgsArr =  ImageData.data;
    //遍历图片数据
    for(var i=0 ; i < imgsArr.length ; i++) {
      //取出单个图片数据
      var imgItem = imgsArr[i];
      //创建图片组件到数组中
      allImages.push(
        <Image
          key={i}
          source={{uri:imgItem.img}}
          style={{width:width , height:160}}
        />
      );
    }
    return allImages;
  }
  renderPage = ()=> {
    var style;
    var pageArr = [];
    var imgsArr = ImageData.data;
    for(var i=0 ; i < imgsArr.length ; i++) {
      style= (i==this.state.currentPage)?{color:'white'}:{color:'black'};
      //给爬格子加载对象
      pageArr.push(
        <Text
          key={i}
          style={[{fontSize:25} , style]}
        >&bull; </Text>
      )
    }
    return pageArr;
  }
}
const styles = StyleSheet.create({
  container: {
      marginBottom:2,
  },
  pageViewStyle:{
    width:width,
    height:25,
    backgroundColor:'rgba(0,0,0,0.2)',
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  }
});


