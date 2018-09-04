import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import HttpUtils from '../../config/HttpUtils';
import {readDetails} from '../../config/utils/Services';
import NavigationBar from '../../config/NavigationBar';
import {Actions} from "react-native-router-flux";
import HTMLView from 'react-native-htmlview';
import {CommonStyle} from '../../config/utils/utils'
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

export default class ReadDetail extends Component {
  constructor(props) {
    super(props);
    this.state={
      title: null,
      author: null,
      content: null,
      author_introduce: null,
      editor_email: null,
      copyright: null,
      authorImg: null,
      webName: null,
      summary: null,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let id = this.props.id;
    HttpUtils.get(readDetails(id))
        .then((response)=> {
          this.setState({
            title: response.data.hp_title,
            author: response.data.hp_author,
            content: response.data.hp_content,
            author_introduce: response.data.hp_author_introduce,
            editor_email: response.data.editor_email,
            copyright: response.data.copyright,
            authorImg: response.data.author[0].web_url,
            webName: response.data.author[0].wb_name,
            summary: response.data.author[0].summary,
          });
        }).catch((error)=> {
          alert(error)
    })
  }

  render() {
    let variety = this.props.variety;
    let title = this.state.title;
    let author = this.state.author;
    let content = this.state.content;
    let author_introduce = this.state.author_introduce;
    let editor_email = this.state.editor_email;
    let copyright = this.state.copyright;
    let authorImg = this.state.authorImg;
    let webName = this.state.webName;
    let summary = this.state.summary;
    return (
        <View style={styles.container}>
          <NavigationBar
            leftButton={
              <TouchableOpacity
                  style={{marginLeft: 16, height:CommonStyle.navImageHeight, width:CommonStyle.navImageWidth}}
                  onPress={()=> Actions.pop()}>
                <Icon name="ios-arrow-back" size={30} color={'white'}/>
              </TouchableOpacity>
            }
            title={variety}
            rightButton={
              <TouchableOpacity style={{marginLeft: 10}} onPress={()=> alert('暂时不能分享')}>
                <Icon2 name="share" size={26} color={CommonStyle.gray}/>
              </TouchableOpacity>
            }
          />
          <ScrollView
              style={{flex:1, paddingLeft: 10, paddingRight: 10}}
              removeClippedSubviews={true}
          >
            <Text numberOfLines={2} style={styles.titleStyle}>{title}</Text>
            <Text style={{fontSize: 26, fontWeight: 'bold'}}>——————</Text>
            <Text style={styles.authorStyle}>文/{author}</Text>
            <HTMLView
              value={content}
            />
            <Text style={{marginVertical: 20, fontSize:10}}>{`${author_introduce} ${editor_email}`}</Text>
            <Text style={{fontSize: 10}}>{copyright}</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 30}}>作者</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginTop:10, marginBottom:5}}>---</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                  style={{width:36, height:36 , borderRadius: 18}}
                  source={{uri:authorImg}}
              />
              <View>
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:16}}>{author}</Text>
                  <Text style={{fontSize:12, marginLeft:5}}>{webName}</Text>
                </View>
                <Text style={{fontSize: 12}}>{summary}</Text>
              </View>
            </View>
            {alert(authorImg)}
          </ScrollView>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },
  authorStyle: {
    fontSize: 10,
  }
});
