/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, Platform, ActivityIndicator} from 'react-native';
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
      count:19,
      musicDataSource: [],
      isLoading: true,
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
            musicDataSource:result.Body.slice(0,9),
            isLoading: false,
          });
        })
        .catch((error)=> {
          console.log(error)
        })
  }

  render() {
    if (this.state.isLoading) {
      return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} size="small" />
            <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
          </View>
      )
    } else {
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
                  backgroundColor: '#151C28'
                }}
            />
            <FlatList
                data={this.state.musicDataSource}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                onEndReachedThreshold={0.3}
                onEndReached={() => this.footerRefreshing()}
            />
          </View>
      );
    }
  }

    _keyExtractor = (item, index) => index;

    _renderItem = (item) => {
      return (
          <MusicCell MusicData={item.item} />
      )
    };

    footerRefreshing()
    {
      // 如果正在刷新或者没有更多数据，就不再拉取数据
      if (this.state.count > this.state.data.length) {
        return (
            <View style={{height: 50, justifyContent: 'center', alignItem: 'center'}}>
              <Text>已经到达最底部</Text>
            </View>
        )
      } else {
        let count = this.state.count;
        this.setState({
          count: this.state.count + 10,
          musicDataSource: this.state.data.slice(0, count),
        });
      }
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
