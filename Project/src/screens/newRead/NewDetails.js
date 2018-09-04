import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from "react-native-vector-icons/Ionicons";
import HttpUtils from '../../config/HttpUtils';
import CommonStyle from "../../config/utils/CommonStyle";
import {Actions} from "react-native-router-flux";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import NavigationBar from "../../config/NavigationBar";
import HTMLView from "react-native-htmlview";
import CommentCell from './CommentCell';
const URL = 'http://v3.wufazhuce.com:8000/api/essay/';
const url = 'http://v3.wufazhuce.com:8000/api/comment/praiseandtime/essay/';
const last = '?version=3.5.0&platform=android';


export default class One extends Component{
  constructor(props){
    super(props);
    this.state={
      data:null,
      comment:null,
      title: null,
      author: null,
      hp_author: null,
      content: null,
      author_introduce: null,
      makettime: null,
      isLoading: true,
      isLove: false,
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData =()=>{
    let id = this.props.id;
    HttpUtils.get(URL+id+last)
        .then((jsonData)=>{
          this.setState({
            title: jsonData.data.hp_title,
            author: jsonData.data. author,
            hp_author: jsonData.data.hp_author,
            content: jsonData.data. hp_content,
            author_introduce: jsonData.data.hp_author_introduce,
            makettime: jsonData.data.hp_makettime,
            isLoading: false,
          });
        })
        .catch((error)=>{
          alert(error);
        });
    HttpUtils.get(url+id+'/0'+last)
        .then((jsonData)=>{
          this.setState({
            comment:jsonData.data.data,
            isLoaded: true,
          });
        })
        .catch((error)=>{
          alert(error);
        });
  };

  _keyExtractor = (item, index) => index.toString();

  RenderItem=(item)=>{
    return (
        <CommentCell CommentData={item.item}/>
    )
  };


  render() {
    let title = this.state.title;
    let author = this.state.author;
    let hp_author = this.state.hp_author;
    let content = this.state.content;
    let author_introduce = this.state.author_introduce;
    let makettime = this.state.makettime;
    if (this.state.isLoading) {
      return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} size="small" />
            <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
          </View>
      )
    } else {
      return (
          <ScrollView style={styles.container}>
            <NavigationBar
                leftButton={
                  <TouchableOpacity
                      style={{marginLeft: 16, height: CommonStyle.navImageHeight, width: CommonStyle.navImageWidth}}
                      onPress={() => Actions.pop()}>
                    <Icon1 name="ios-arrow-back" size={30} color={'black'} />
                  </TouchableOpacity>
                }
                titleView={<Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>{title}</Text>}
                navBar={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: Platform.OS === 'ios' ? 44 : CommonStyle.navHeight,
                  backgroundColor: 'white',
                  borderBottomWidth: 0.3,
                  borderBottomColor: 'gray'
                }}
                rightButton={
                  <TouchableOpacity style={{marginLeft: 16}} onPress={() => alert('暂时不能分享')}>
                    <Icon2 name="share" size={26} color={CommonStyle.black} />
                  </TouchableOpacity>
                }
            />
            <Text style={{fontSize: 25, marginVertical: 20, marginLeft: 10, fontWeight: 'bold', color: 'black'}}>{title}</Text>
            <TouchableOpacity
                // onPress={()=> Actions.AuthorScreen({author:author})}
            >
              <Text style={{fontSize: 16, marginLeft: 10}}>{hp_author}</Text>
            </TouchableOpacity>
            <View style={{marginVertical: 8, marginHorizontal: 10}}>
              <HTMLView
                  value={content}
              />
            </View>
            <View style={{marginBottom: 20, marginHorizontal: 10}}>
              <Text style={{fontSize: 12, marginBottom: 10}}>{author_introduce}</Text>
              <Text style={{fontSize: 12}}>{makettime}</Text>
            </View>
            <Text style={{marginLeft: 5, fontSize: 16}}>精彩评论</Text>
            <FlatList
                data={this.state.comment}
                renderItem={this.RenderItem}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={() => {
                  return <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor}} />
                }}
            />
          </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  One:{
    justifyContent:'center',
    alignItems:'center'
  },
  PartOne:{
    flexDirection:'row',
    marginTop:10,
    justifyContent:'space-between',
    marginRight:5,
    marginLeft:5
  },
  images:{
    width:30,
    height:30,
    borderRadius:15
  }
});
