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
import HttpUtils from "../../../config/HttpUtils";
import {comingMovies} from "../../../config/utils/Services";

export default class ComingMovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingMovieList:[],
      attentionList:[],
      isLoading:true,
    }
  }

  componentDidMount() {
    this.load();
  }

  load() {
    HttpUtils.get(comingMovies())
        .then((response)=> {
          this.setState({
            attentionList:response.attention,
            comingMovieList: response.moviecomings,
            isLoading:false,
          });
        }).catch((error)=> {
      console(error);
    });

  }

  render() {
    let attentionArray = this.state.attentionList;
    let comingArray = this.state.comingMovieList;
    if (this.state.isLoading) {
      return (
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} size="small" />
            <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
          </View>
      )
    } else {
      return (
          <ScrollView
              removeClippedSubviews={true}
          >
            <AttentionMovieCell attentionMovie={attentionArray} />
            <FlatList
                data={comingArray}
                extraData={this.state}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
            />
          </ScrollView>
      );
    }
  }

  renderItem= (item)=> {
    return (
        <ComingMovieCell comingMovie={item.item}/>
    )
  };

  keyExtractor = (item, index) => {
    index.toString();
  }
}

