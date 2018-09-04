/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import NavigationBar from '../../../config/NavigationBar';
import {CommonStyle} from '../../../config/utils/utils';
import Icon from "react-native-vector-icons/Ionicons";
import {Actions} from 'react-native-router-flux';
import HttpUtils from '../../../config/HttpUtils';
import PlayMovieCell from './PlayMovieCell';
import {playMovieData} from '../../../config/utils/Services';

export default class playMovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      isLoading: true,
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let id = this.props.id;
    HttpUtils.get(playMovieData(id))
        .then((response)=> {
          this.setState({
            data:response.videoList,
            isLoading: false,
          });
        }).catch((error)=> {
          alert(error);
    });
  }

  renderItem = (item)=> {
    return (
        <PlayMovieCell playData={item.item}/>
    )
  };

  render() {
    let data = this.state.data;
    if(this.state.isLoading){
      return(
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} size="small"/>
            <Text style={{color:'#666666' , paddingLeft:10}}>努力加载中</Text>
          </View>
      )
    }else {
      return (
          <View style={styles.container}>
            <NavigationBar
                title={'预告片&花絮'}
                leftButton={
                  <TouchableOpacity
                      style={{marginLeft: 16, height: CommonStyle.navImageHeight, width: CommonStyle.navImageWidth}}
                      onPress={() => Actions.pop()}>
                    <Icon name="ios-arrow-back" size={30} color={'white'} />
                  </TouchableOpacity>
                }
            />
            <FlatList
                data={data}
                renderItem={this.renderItem}
                style={{paddingBottom: 10}}
                keyExtractor={this._keyExtractor}
            />
          </View>
      );
    }
  }

  _keyExtractor = (item, index) => index;
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

