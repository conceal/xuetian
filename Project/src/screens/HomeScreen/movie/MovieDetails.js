/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert, Image, ActivityIndicator, ScrollView, findNodeHandle, Platform, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import HttpUtils from '../../../config/HttpUtils';
import {movieDetails, commentCells} from '../../../config/utils/Services';
import {VibrancyView, BlurView} from 'react-native-blur';
import {Actions} from 'react-native-router-flux';
import MiniComment from './comment/MiniCommentCell';
import PlusComment from './comment/PlusCommentCell';
import {CommonStyle, DeviceInfo} from '../../../config/utils/utils';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/FontAwesome";
import PlusCommentCell from "./comment/PlusCommentCell";
import ShowingMovieCell from "./showingMovie/ShowingMovieCell";

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.navBar = null;
    this.state = {
      opacity:null,
      data:[],
      miniData:[],
      plusData:[],
      loaded:false,
      viewRef: null,
    }
  }

  componentDidMount(){
   this.load();
  }

  load() {
    let id = this.props.id;
    HttpUtils.get(movieDetails(id))
        .then((response)=> {
          this.setState({
            data:response.data,
            loaded:true,
          });
          // alert(this.state.data);
        }).catch((error)=> {
      alert(error);
    });
    HttpUtils.get(commentCells(id))
        .then((response)=> {
          this.setState({
            miniData:response.data.mini,
            plusData:response.data.plus,
          });
          // alert(this.state.data);
        }).catch((error)=> {
      alert(error);
    })
  }

  renderMiniComment = (data)=> {
    return (
        <FlatList
            data={data}
            renderItem={this.renderItem1}
        />
    )
  };

  renderItem1 = (item)=> {
    return (
        <MiniComment miniData={item.item}/>
    )
  };

  renderPlusComment = (data)=> {
    return (
        <FlatList
            data={data}
            renderItem={this.renderItem2}
        />
    )
  };
  renderItem2 = (item)=> {
    return (
        <PlusComment plusData={item.item}/>
    )
  };

  onScroll(event) {
    let y = event.nativeEvent.contentOffset.y;
    let opacityPercent = y/64;
    if(y < 64) {
      this.navBar.setNativeProps({
        style: {opacity: opacityPercent}
      })
    } else {
      this.navBar.setNativeProps({
        style: {opacity: 1}
      })
    }
  }

  imageLoaded() {
    this.setState({
      viewRef: findNodeHandle(this.backgroundImage)
    })
  };

  renderType(arr) {
    return (
        arr.map((item, index) => (
            <Text key={index} style={{color: CommonStyle.black, fontSize: 13, marginTop: 3}}>{`${item} `}</Text>
        ))
    )
  }

  renderActorList(arr, id) {
    return (
        arr.map((item, index)=> (
          <TouchableOpacity
            key={index}
            style={{marginLeft: 10, width: 80, alignItems: 'center'}}
            onPress={() => Actions.ActorList({id: id})}
          >
            <Image style={{width: 80, height: 80}} source={{uri: item.img}} />
            <Text numberOfLines={1} style={styles.actorStyle}>{item.name}</Text>
            <Text numberOfLines={1} style={styles.actorStyle}>{item.nameEn}</Text>
            <Text numberOfLines={1} style={styles.actorStyle}>{item.roleName}</Text>
          </TouchableOpacity>
        ))
    )
  }

  render() {
    let data = this.state.data;
    let basic = data.basic;
    let boxOffice = data.boxOffice;
    let live = data.live;
    let related = data.related;
    // let video = basic.video;
    let miniData = this.state.miniData;
    let plusData = this.state.plusData;
    if(!this.state.loaded){
      return(
          <View style={styles.loadingView}>
            <ActivityIndicator animating={true} size="small"/>
            <Text style={{color:'#666666' , paddingLeft:10}}>努力加载中</Text>
          </View>
      )
    }else {
      return (
          /* 标题栏*/
          <View style={styles.container}>
            <ScrollView
                onScroll={this.onScroll.bind(this)}
                scrollEventThrottle={20}
                bounces={false}
            >
              <Image
                ref={(img)=> {this.backgroundImage = img}}
                style={styles.bgContainer}
                source={{uri:basic.img}}
                resizeMode='stretch'
                onLoadEnd={()=> this.imageLoaded()}
              />
              <View style={styles.bgContainer}>
                {
                  Platform.OS === 'ios' ?
                      <VibrancyView
                          blurAmount={10}
                          blurType={'light'}
                          style={styles.container}
                      /> :
                      <BlurView
                          viewRef={this.state.viewRef}
                          style={styles.absolute}
                          blurType={'light'}
                          blurAmount={10}
                      />
                }
              </View>
              <View style={styles.containerStyle}>
                <View style={styles.headerStyle}>
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center', backgroundColor: CommonStyle.clear}}
                    onPress={()=> Actions.PlayMovieList({id:basic.movieId})}
                  >
                    <ImageBackground style={styles.img} source={{uri:basic.img}} resizeMode='contain'>
                      <Icon name='play-circle-outline' size={40} color={CommonStyle.white}/>
                    </ImageBackground>
                  </TouchableOpacity>
                  <View style={styles.rightContent}>
                    <Text style={{color: CommonStyle.orange, fontSize:16, marginVertical: 10}}>{basic.name}</Text>
                    <Text style={{color: CommonStyle.orange, fontSize:13, marginBottom: 8}}>{basic.nameEn}</Text>
                    <View style={{flexDirection:'row'}}>
                      {
                        basic.isEggHunt ? <Text style={{color: '#588F03', fontSize: 12}}>有彩蛋-</Text> : null
                      }
                      <Text style={{fontSize:12, color: CommonStyle.black}}>{basic.mins}</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItem:'center'}}>
                      {
                        this.renderType(basic.type)
                      }
                    </View>
                    <Text style={{color: CommonStyle.black, fontSize: 13, marginTop: 3}}>{basic.releaseDate}-{basic.releaseArea}上映</Text>
                    <Text style={{color: CommonStyle.black, fontSize: 13, marginTop: 3}}>{basic.commentSpecial}</Text>
                    <View>
                      <View style={styles.borderText}>
                        <Text style={{paddingVertical: 3, paddingHorizontal: 5, color:'#64788E', fontSize:10}}>中国巨幕</Text>
                      </View>
                      {
                        basic.isIMAX ? <View style={styles.borderText}>
                          <Text style={{paddingHorizontal: 5, paddingVertical: 2, color: '#64788E', fontSize: 10}}>IMAX</Text>
                        </View> : null
                      }
                    </View>
                  </View>
                  <View style={{width:40 , marginTop:30}}>
                    <View style={{height:30, alignItems:'center', justifyContent:'center', backgroundColor:'#588F03'}}>
                      <Text style={{fontSize:15, color:CommonStyle.white}}>{basic.overallRating}</Text>
                    </View>
                  </View>
                </View>

                {/* 剧情 */}
                <View style={styles.content}>
                  <Text style={{color: CommonStyle.textBlockColor, lineHeight: 20}}>{`剧情： ${basic.story}`}</Text>
                </View>

                {/* 导演 */}
                <View style={{borderBottomWidth: 10, borderBottomColor: CommonStyle.lineColor}}>
                  <TouchableOpacity
                    style={{height:40, paddingHorizontal:10, flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}
                    onPress={()=> Actions.ActorList({id:basic.movieId})}
                  >
                    <Text style={{color:CommonStyle.textBlockColor, fontSize:15}}>导演</Text>
                    <View style={{flexDirection:'row', alignItems:'center', }}>
                      <Text style={{color:CommonStyle.textBlockColor, fontSize:12}}>全部</Text>
                      <Icon1 name={"triangle-right"} size={12} color={CommonStyle.black}/>
                    </View>
                  </TouchableOpacity>
                  <ScrollView
                    style={{height:120, margin:10, marginLeft: 0,marginTop:0}}
                    horizontal={true}
                    removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {this.renderActorList([basic.director], basic.movieId)}
                  </ScrollView>
                </View>

                {/* 演员 */}
                <View style={{borderBottomWidth: 10, borderBottomColor: CommonStyle.lineColor}}>
                  <TouchableOpacity
                      style={{height:40, paddingHorizontal:10, flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}
                      onPress={()=> Actions.ActorList({id:basic.movieId})}
                  >
                    <Text style={{color:CommonStyle.textBlockColor, fontSize:15}}>演员</Text>
                    <View style={{flexDirection:'row', alignItems:'center', }}>
                      <Text style={{color:CommonStyle.textBlockColor, fontSize:12}}>全部</Text>
                      <Icon1 name={"triangle-right"} size={12} color={CommonStyle.black}/>
                    </View>
                  </TouchableOpacity>
                  <ScrollView
                      style={{height:120, margin:10, marginLeft: 0,marginTop:0}}
                      horizontal={true}
                      removeClippedSubviews={true}
                      showsHorizontalScrollIndicator={false}
                  >
                    {this.renderActorList([basic.actors], basic.movieId)}
                  </ScrollView>
                </View>

                {/* 直播 */}
                {
                  live.count >= 1 ?
                      <View>
                        <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                          <Text style={{color: CommonStyle.textBlockColor, fontSize: 15}}>直播</Text>
                          <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>{live.count}</Text>
                            <Icon1 name={"triangle-right"} size={12} color={CommonStyle.black}/>
                          </View>
                        </View>
                        <View style={styles.liveContent}>
                          <Image
                              style={{width: 100, height: 60}}
                              source={{uri: live.img}}
                              resizeMode='contain'
                          />
                          <View style={{flex: 1, marginLeft: 10}}>
                            <Text style={{color: CommonStyle.textBlockColor, marginBottom: 5}}>{live.title}</Text>
                            <Icon2 name={"video"} size={15} color={CommonStyle.red}/>
                            <Text style={{color: CommonStyle.textGrayColor, marginVertical: 5, fontSize: 12}}>{live.playNumTag}</Text>
                          </View>
                        </View>
                      </View> : null
                }

                {/* 视频 */}
                <View style={{flexDirection: 'row', paddingBottom: 10, borderBottomColor: CommonStyle.lineColor, borderBottomWidth: 10}}>
                  <TouchableOpacity style={{flex:1, }} onPress={()=> Actions.PlayMovieList({id:basic.movieId})}>
                    <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <Text style={{color: CommonStyle.textBlockColor, fontSize: 15}}>视频</Text>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>{basic.video.count}</Text>
                        <Icon1 name={"triangle-right"} size={12} color={CommonStyle.black}/>
                      </View>
                    </View>
                    <ImageBackground style={{height: 120, width: DeviceInfo.deviceWidth - 150, justifyContent: 'center', alignItems: 'center',}} source={{uri:basic.video.img}} resizeMode='cover'>
                      <Icon name='play-circle-outline' size={40} color={CommonStyle.white}/>
                    </ImageBackground>
                  </TouchableOpacity>

                  {/* 图片 */}
                  <TouchableOpacity style={{width: 120}} onPress={() => Actions.StagePicture({id: basic.movieId, title: basic.name, subTitle: basic.nameEn})}>
                    <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                      <Text style={{color: CommonStyle.textBlockColor, fontSize: 15}}>图片</Text>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>{basic.stageImg.count}</Text>
                        <Icon1 name={"triangle-right"} size={12} color={CommonStyle.black}/>
                      </View>
                    </View>
                    <View style={{marginRight: 10, paddingRight: 10}}>
                      <Image
                          style={{width: 110, height: 120}}
                          source={{uri: basic.stageImg.list[0].imgUrl}}
                          resizeMode='cover'
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                {/* 票房 */}
                {
                  boxOffice.ranking !== 0 ?
                      <View style={{borderBottomWidth:10,borderBottomColor:CommonStyle.lineColor}}>
                        <View style={{height:40, paddingHorizontal:10,flexDirection:'row', alignItems:'center'}}>
                          <Text style={{color:CommonStyle.textBlockColor, fontSize:15}}>票房</Text>
                        </View>
                        <View style={styles.boxOffice}>
                          <View style={{alignItems: 'center'}}>
                            <Text style={styles.boxOfficeValue}>{boxOffice.ranking}</Text>
                            <View style={{alignItems:'center', flexDirection:'row'}}>
                              <Text style={styles.boxOfficeText}>票房排名</Text>
                              <Icon1 name={"triangle-right"} size={12} color={CommonStyle.black}/>
                            </View>
                          </View>
                          <View style={{alignItems: 'center'}}>
                            <Text style={styles.boxOfficeValue}>{boxOffice.todayBoxDes}</Text>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                              <Text style={styles.boxOfficeText}>{boxOffice.todayBoxDesUnit}</Text>
                              <Icon1 name={"triangle-right"} size={12} color={CommonStyle.black}/>
                            </View>
                          </View>
                          <View style={{alignItems: 'center'}}>
                            <Text style={styles.boxOfficeValue}>{boxOffice.totalBoxDes}</Text>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                              <Text style={styles.boxOfficeText}>{boxOffice.totalBoxUnit}</Text>
                              <Icon1 name={"triangle-right"} size={12} color={CommonStyle.black}/>
                            </View>
                          </View>
                        </View>
                      </View> : null
                }
                <View>
                  <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{color: CommonStyle.textBlockColor, fontSize: 15}}>短评</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>全部</Text>
                      <Icon1 name={"triangle-right"} size={12} color={CommonStyle.black}/>
                    </View>
                  </View>
                  {this.renderMiniComment(miniData.list)}
                  <TouchableOpacity
                      style={{alignItems: 'center', justifyContent: 'center', height: 50, borderBottomWidth: 10, borderBottomColor: CommonStyle.lineColor}}
                      onPress={() => Actions.miniComment({id: basic.movieId})}
                  >
                    <Text style={{color: '#FD7108', fontSize: 15}}>{`查看更多${miniData.total}条短评`}</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={{height: 40, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{color: CommonStyle.textBlockColor, fontSize: 15}}>影评</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>全部</Text>
                      <Icon1 name={"triangle-right"} size={12} color={CommonStyle.black}/>
                    </View>
                  </View>
                  {this.renderPlusComment(plusData.list)}
                  <TouchableOpacity
                      style={{alignItems: 'center', justifyContent: 'center', height: 40}}
                      onPress={() => Actions.plusComment({id: basic.movieId, title: basic.name})}
                  >
                    <Text style={{color: '#FD7108', fontSize: 15}}>{`查看更多${plusData.total}条短评`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            {/* 顶部导航栏 */}
            <View
                style={[styles.navBarStyle, {backgroundColor: CommonStyle.clear}]}>
              <View style={styles.navComtentStyle}>
                {/*<Icon3 name={'ios-arrow-back'} size={20} color={CommonStyle.white}/>*/}
                <Text style={{color: CommonStyle.white, fontSize: 17}}>{``}</Text>
                {/*<View style={{marginRight: 5}}>*/}
                  {/*<Icon4 name={'share-square-o'} size={20} color={CommonStyle.white}/>*/}
                {/*</View>*/}
              </View>
            </View>
            <View
                ref={ref => this.navBar = ref}
                style={[styles.navBarStyle,{opacity: 0}]}
            >
              <View style={styles.navComtentStyle}>
                <TouchableOpacity  style={{marginLeft:8, width:44, height:44}} onPress={()=> Actions.pop()}>
                  <Icon3 name="ios-arrow-back" size={26} color={CommonStyle.white}/>
                </TouchableOpacity>
                <Text style={{color:CommonStyle.white, fontSize:20}}>{basic.name}</Text>
                <TouchableOpacity style={{marginRight:5}} onPress={()=> alert('功能暂未实现')}>
                  <Icon4 name="share-square-o" size={26} color={CommonStyle.white} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'transparent',
  },
  bgContainer:{
    position: 'absolute',
    height:120,
    width:DeviceInfo.deviceWidth,
  },
  content: {
    padding: 10,
    backgroundColor: CommonStyle.white,
    borderTopWidth: 10,
    borderTopColor: CommonStyle.lineColor,
    borderBottomWidth: 10,
    borderBottomColor: CommonStyle.lineColor,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerStyle:{
    flex:1,
    marginTop:120,
    backgroundColor: CommonStyle.white
  },
  headerStyle:{
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  img:{
    width:100,
    height:150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContent:{
    flex: 1,
    backgroundColor: CommonStyle.clear,
    marginLeft: 10,
  },
  borderText:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CommonStyle.clear,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: '#64788E',
  },
  actorStyle:{
    fontSize:12,
    color: CommonStyle.textBlockColor,
    marginTop: 5,
  },
  boxOffice:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    padding:10,
    paddingTop:0,
  },
  boxOfficeValue:{
    color:'#F37407',
    fontSize:20,
  },
  boxOfficeText:{
    marginVertical:10,
    color:CommonStyle.gray,
    fontSize:12,
},
  navComtentStyle:{
    height:44,
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  navBarStyle: {
    height: 64,
    backgroundColor: '#161C28',
    position: 'absolute',
    width: DeviceInfo.deviceWidth,
  },
});

