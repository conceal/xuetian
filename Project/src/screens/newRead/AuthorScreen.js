import React, { Component } from 'react';
import {StyleSheet, Text, View, Image}from 'react-native' ;
import NavigationBar from "../../config/NavigationBar";
import {DeviceInfo} from '../../config/utils/utils'

export default class AuthorScreen extends Component{
  render(){
    let author = this.props.author;
    let web_url = author.author[0].web_url;
    let user_name = author.author[0].user_name;
    let desc = author.author[0].desc;
    let fans_total = author.author[0].fans_total;
    let wb_name = author.author[0].wb_name;
    return(
        <View style={styles.container}>
          <NavigationBar
            title={user_name}
          />
          <Image source={{uri:web_url}}
                 style={{width:DeviceInfo.deviceWidth-10,height:300}}
          />
          <Text style={{marginTop:10}}>姓名：{user_name}</Text>
          <Text style={{marginTop:7,marginBottom:10}}>描述：{desc}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Text style={{marginLeft:15,marginRight:40}}>爱豆数：{fans_total}</Text>
            <Text style={{marginRight:15,marginLeft:40}}>微博名：{wb_name}</Text>
          </View>
        </View>
    );
  }
}
const styles =StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  }
});
