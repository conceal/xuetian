/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {DeviceInfo} from '../../config/utils/utils';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {Actions} from 'react-native-router-flux';
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/SimpleLineIcons";
import Icon4 from "react-native-vector-icons/EvilIcons";
import storage from '../../config/StorageConfig';

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state={
      nickname: null,
    }
  }

  componentWillMount() {
    storage.load({
      key:'nickname',
      autoSync: true,
      syncInBackground:true,
    }).then((ret)=> {
      this.setState({
        nickname:ret,
      })
    }).catch((error)=> {
      console.log(error)
    })
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <ParallaxScrollView
              style={styles.parallaxStyle}
              fadeOutForeground={true}                       //如果为true，当用户向上滚动式，前景将淡出
              // stickyHeaderHeight={50}                        //标题栏高度
              parallaxHeaderHeight={350}                    //视差标题​​的高度。
              outputScaleValue={10}
              renderBackground={()=>                        //视差头的背景
                  <Image
                      style={{width:DeviceInfo.deviceWidth, height: 350}}
                      source={require('../../drawable/mineBackground.jpg')}
                  />
              }
              renderForeground={()=> (                        //视差前景
                  <View>
                    <TouchableOpacity style={styles.headPhotoStyle} activeOpacity={1} onPress={()=> Actions.Redact()}>
                      <Image style={styles.headPhoto} source={{uri:"http://ww1.sinaimg.cn/large/0077HGE3ly1fut71xpbe1j30eo0q2wts.jpg"}}/>
                    </TouchableOpacity>
                    <Text style={styles.mottoStyle}>不要轻易做一个决断</Text>
                    <Text style={styles.mottoStyle}>但是做过的每一个决断不要去后悔</Text>
                  </View>
              )}
              // renderStickyHeader={()=> (
              //     <View key="sticky-header" style={styles.fixedSection}>
              //       <Text style={styles.stickySectionText}>{this.state.title}</Text>
              //     </View>
              // )}
              //固定标题头
              renderFixedHeader={()=> <Text style={styles.headTitle}>{this.state.nickname}</Text>}
          >
            <View style={styles.myCollect}>
              <Text style={styles.collectStyle}>我的收藏</Text>
              <View style={styles.varietiesStyle}>
                <View>
                  <Icon1 name="movie" size={30} color={'grey'}/>
                  <Text style={styles.textStyle}>电影</Text>
                </View>
                <View>
                  <Icon2 name="book-open" size={30} color={'grey'}/>
                  <Text style={styles.textStyle}>文章</Text>
                </View>
                <View>
                  <Icon2 name="music" size={30} color={'grey'}/>
                  <Text style={styles.textStyle}>音乐</Text>
                </View>
                <View>
                  <Icon3 name="picture" size={30} color={'grey'}/>
                  <Text style={styles.textStyle}>图片</Text>
                </View>
              </View>
            </View>
          </ParallaxScrollView>
          <View style={{height: 30, backgroundColor:'#6577cc' }}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parallaxStyle: {
    flex:1,
    backgroundColor: 'hotpink',
    overflow: 'hidden'
  },
  headPhotoStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:100
  },
  headPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  mottoStyle: {
    paddingVertical: 5,
    textAlign: 'center',
    color:'white',
    fontSize: 16
  },
  headTitle: {
    padding: 5,
    marginTop:20,
    textAlign: 'right',
    fontSize: 25,
    color:'white',
    fontWeight: 'bold'
  },
  fixedSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: DeviceInfo.deviceWidth,
    height: 50,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10
  },
  myCollect: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  varietiesStyle: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  collectStyle: {
    fontSize: 16,
    marginLeft: 20,
  },
  textStyle: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    marginBottom: 16,
  }
});
