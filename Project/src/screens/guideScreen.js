/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper'
import SplashScreen from 'rn-splash-screen';
import {Actions} from 'react-native-router-flux';
import DeviceInfo from "../config/utils/DeviceInfo";
import HttpUtils from '../config/HttpUtils';
import {showingMovies, comingMovies} from '../config/utils/Services';
import HomeTabs from '../config/HomeTabs';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingMovieList:[],
      comingMovieList:[],
      attentionList:[],
      isLoading: false,
      isShow:false,
    }
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        isLoading: false,
      });
      this.fetchData();
    },4000);
  }

  componentDidUpdate() {
    if(!this.state.isLoading) {
      //Hide splash screen
      SplashScreen.hide();
    }
  }

  fetchData() {
    HttpUtils.get(showingMovies())
        .then((result)=> {
          this.setState({
            showingMovieList: result.ms,
          })
        });
    HttpUtils.get(comingMovies())
        .then((result)=> {
          this.setState({
            attentionList:result.attention,
            comingMovieList: result.moviecomings,
          })
        })
  }

  render() {
    if (this.state.isLoading) {
      return null;
    } else {
      if(this.state.isShow) {
        return (
            <HomeTabs showingMovieList={this.state.showingMovieList} comingMovieList={this.state.comingMovieList} attentionList={this.state.attentionList}/>
        )
      }else{
        return (
            <Swiper style={styles.wrapper} loop={false} loadMinimal={true}>
              <View style={styles.slide1}>
                <Text style={styles.text}>Hello Swiper</Text>
              </View>
              <View style={styles.slide2}>
                <Text style={styles.text}>Beautiful</Text>
              </View>
              <View style={styles.slide3}>
                <Text style={styles.text}>And simple</Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => Actions.Home({
                      showingMovieList: this.state.showingMovieList,
                      comingMovieList: this.state.showingMovieList,
                      attentionList: this.state.attentionList
                    })}
                >
                  <Text style={{paddingVertical: 5, paddingHorizontal: 10, color: '#9DD6EB', fontSize: 26}}>立即进入</Text>
                </TouchableOpacity>
              </View>
            </Swiper>
        )
      }
    }
  }
}

const styles = StyleSheet.create( {
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonStyle: {
    position: 'absolute',
    alignItems:'center',
    bottom: DeviceInfo.deviceHeight*0.2,
    borderColor: '#9DD6EB',
    borderWidth: 1,
    borderRadius: 2,
  }
});
