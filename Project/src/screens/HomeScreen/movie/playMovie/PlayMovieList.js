/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import NavigationBar from '../../../../config/navigationBar';
import {CommonStyle} from '../../../../config/utils/utils';
import Icon from "react-native-vector-icons/Ionicons";
import {Actions} from 'react-native-router-flux';
import HttpUtils from '../../../../config/HttpUtils';
import PlayMovieCell from './PlayMovieCell';
import {playMovieData} from '../../../../config/utils/Services';

export default class playMovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
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
    return (
        <View style={styles.container}>
          <NavigationBar
            title={'预告片&花絮'}
            leftButton={
              <TouchableOpacity
                  style={{marginLeft: 16, height:CommonStyle.navImageHeight, width:CommonStyle.navImageWidth}}
                  onPress={()=> Actions.pop()}>
              <Icon name="ios-arrow-back" size={30} color={'white'}/>
              </TouchableOpacity>
            }
          />
          <FlatList
            data={data}
            renderItem={this.renderItem}
            style={{paddingBottom: 10}}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

