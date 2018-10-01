/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import ComingMovieCell from './ComingMovieCell';
import AttentionMovieCell from './AttentionMovieCell';

export default class ComingMovieList extends Component {
  constructor(props) {
    super(props);
    this.state={
      data: this.props.comingMovieList.slice(0,9),
      count:19,
    }
  }


  render() {
    return (
        <ScrollView
            removeClippedSubviews={true}
        >
          <AttentionMovieCell attentionMovie={this.props.attentionList} />
          <FlatList
              data={this.state.data}
              extraData={this.state}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              onEndReachedThreshold={0.2}
              onEndReached={() => this.footerRefreshing()}
          />
        </ScrollView>
    );
  }

  renderItem= (item)=> {
    return (
        <ComingMovieCell comingMovie={item.item}/>
    )
  };

  keyExtractor = (item, index) => {
    index.toString();
  };

  footerRefreshing() {
    // 如果正在刷新或者没有更多数据，就不再拉取数据
    if (this.state.count > this.props.comingMovieList.length) {
      return (
          <View style={{height:50, justifyContent: 'center', alignItem: 'center'}}>
            <Text>已经到达最底部</Text>
          </View>
      )
    } else {
      let count = this.state.count;
      this.setState({
        count: this.state.count + 10,
        data: this.props.comingMovieList.slice(0, count),
      });
    }
  }
}

