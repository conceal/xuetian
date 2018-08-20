/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList, ActivityIndicator} from 'react-native';
import ShowingMovieCell from './ShowingMovieCell';
import HttpUtils from "../../../../config/HttpUtils";
import {showingMovies} from "../../../../config/utils/Services";

export default class ShowingMovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingMovieList:[],
      isLoaded:false,
    }
  }

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies() {
    HttpUtils.get(showingMovies())
        .then((response)=> {
          this.setState({
            showingMovieList: response.ms,
            isLoaded:true,
          });
        }).catch((error)=> {
            console(error);
        });
  }

  render() {
    let dataSource = this.state.showingMovieList;
    if (!this.state.isLoaded) {
      return (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} size="small" />
            <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
          </View>
      )
    } else {
      return (
          <View style={styles.container}>
            <FlatList
                data={dataSource}
                renderItem={this.renderItem}
            />
          </View>
      );
    }
  }

  renderItem = (item)=> {
    return (
        <ShowingMovieCell data={item.item}/>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
