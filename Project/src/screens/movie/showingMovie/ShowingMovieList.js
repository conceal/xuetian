/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, TextInput, Modal} from 'react-native';
import ShowingMovieCell from './ShowingMovieCell';
import HttpUtils from "../../../config/HttpUtils";
import {showingMovies} from "../../../config/utils/Services";

export default class ShowingMovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      refreshing:false,
      data: this.props.showingMovieList.slice(0,9),
      count:19,
    }
  }

  render() {
      return (
          <View style={styles.container}>
            <FlatList
                data={this.state.data}
                extraData={this.state}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => item.id}
                refreshing={this.state.refreshing}
                onRefresh={() => this.headerRefreshing()}
                onEndReachedThreshold={0.2}
                onEndReached={() => this.footerRefreshing()}
            />
          </View>
      );
  }

  renderItem = (item)=> {
    return (
        <ShowingMovieCell data={item.item}/>
    )
  };

  headerRefreshing() {
    this.setState({
      data:this.props.showingMovieList.slice(0,9)
      })
  }

  footerRefreshing() {
    // 如果正在刷新或者没有更多数据，就不再拉取数据
    if (this.state.count > this.props.showingMovieList.length) {
      return (
          <View style={{height:50, justifyContent: 'center', alignItem: 'center'}}>
            <Text>已经到达最底部</Text>
          </View>
      )
    } else {
      let count = this.state.count;
      this.setState({
        count: this.state.count + 10,
        data: this.props.showingMovieList.slice(0, count),
      });
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
