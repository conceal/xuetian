/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, Platform} from 'react-native';
import HttpUtils from '../../config/HttpUtils';
import MusicCell from './MusicCell';
import NavigationBar from '../../config/NavigationBar';
import {musicData} from '../../config/utils/Services';
import CommonStyle from "../../config/utils/CommonStyle";

export default class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let formData = new FormData();
    formData.append("TransCode", "020337");
    formData.append("OpenId", "Test");

    HttpUtils.post(musicData(), formData)
        .then((result)=> {
          this.setState({
            data: result.Body,
          });
        })
        .catch((error)=> {
          console.log(error)
        })
  }

  render() {
    return (
        <View style={styles.container}>
          <NavigationBar
              titleView={<Text style={styles.navBarStyle}>音乐</Text>}
              navBar={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: Platform.OS === 'ios' ? 44 : CommonStyle.navHeight,
                backgroundColor: 'white',
                borderBottomWidth: 0.3,
                borderBottomColor: 'gray'
              }}
              statusBar={{
                backgroundColor:'#151C28'}}
          />
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
    );
  }

  _keyExtractor = (item, index) => index;

  _renderItem = (item)=> {
    return (
      <MusicCell MusicData={item.item}/>
    )
  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white'
  },
  navBarStyle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  }
});
