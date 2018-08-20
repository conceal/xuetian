/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry , Text, View , SectionList} from 'react-native';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state={
      isRefreshing:false
    }
  }

  sectionComp = (info)=> {
    let txt = info.section.key;
    return <Text style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
  }

  renderItem = (info)=> {
    let txt = '  ' + info.item.title;
    return <Text
      style={{ height: 60, textAlignVertical: 'center', backgroundColor: "#ffffff", color: '#5C5C5C', fontSize: 15 }}>{txt}</Text>
  }

  onRefresh = ()=> {
    this.setState=(
      {isRefreshing:true,},

      ()=> {this.renderItem()
      })
  }

  onEndReached = ()=> {
    this.setState=(
      {isRefreshing:true},
      ()=> {this.renderItem()
      })
  }

  render(){
    let sections = [
      { key: "A", data: [{ title: "阿童木" }, { title: "阿玛尼" }, { title: "爱多多" }] },
      { key: "B", data: [{ title: "表哥" }, { title: "贝贝" }, { title: "表弟" }, { title: "表姐" }, { title: "表叔" }] },
      { key: "C", data: [{ title: "成吉思汗" }, { title: "超市快递" }] },
      { key: "W", data: [{ title: "王磊" }, { title: "王者荣耀" }, { title: "往事不能回味" },{ title: "王小磊" }, { title: "王中磊" }, { title: "王大磊" }] },
    ];

    return (
      <View style={{flex:1}}>
        <SectionList
          renderSectionHeader={this.sectionComp}
          renderItem={this.renderItem}
          sections={sections}
          ItemSeparatorComponent={()=> <View><Text></Text></View>}
          ListHeaderComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>通讯录</Text></View>}
          ListFooterComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>通讯录尾部</Text></View>}
          refreshing={false}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={5}
          onEndReached={this.onEndReached}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent('SectionListDemo' , ()=> App);

