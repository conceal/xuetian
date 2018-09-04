/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, FlatList} from 'react-native';
import HttpUtils from '../../config/HttpUtils';
import {readData, DayReadData}from '../../config/utils/Services';
import ReadListCell from './ReadListCell';
import NavigationBar from '../../config/NavigationBar';
import {CommonStyle} from "../../config/utils/utils";
import DayRead from '../../picture/DayRead';

export default class Read extends Component {
  constructor(props) {
    super(props);
    this.state={
      readData: null,
      isLoading:true,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    HttpUtils.get(DayReadData())
        .then((response)=> {
          let data = JSON.stringify(response);
          this.setState({
            readData: data.data,
            isLoading: false,
          })
        }).catch((error)=> {
          alert(error);
    })
  }

  render() {
    let dataSource = this.state.readData;
    if(this.state.isLoading) {
      return (
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} size="small"/>
            <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
          </View>
      )
    }else{
      return (
          <View style={styles.container}>
            <NavigationBar
              title={'阅读'}
              statusBar={{
                backgroundColor:'#151C28'
              }}
            />
            <DayRead data={dataSource}/>
          </View>
      )
    }
  }

  renderItem = (item)=> {
    return (
        <ReadListCell data={item.item}/>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
});
