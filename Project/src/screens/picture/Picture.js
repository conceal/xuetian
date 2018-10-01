/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, Platform, ActivityIndicator} from 'react-native';
import HttpUtils from '../../config/HttpUtils';
import NavigationBar from "../../config/NavigationBar";
import {pictureData} from '../../config/utils/Services';
import CommonStyle from "../../config/utils/CommonStyle";
import PictureCell from './PictureCell';

export default class Picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureData: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let formData = new FormData();
    formData.append("TransCode" , "030112");
    formData.append("OpenId" , "Test");
    formData.append("SongListId" , "141998290");

    HttpUtils.post(pictureData(),formData)
        .then((response)=> {
          this.setState({
            pictureData: response.Body,
            isLoading: false,
          })
        }).catch((error)=> {
          alert(error)
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
                titleView={<Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>图文</Text>}
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
            <ScrollView>
              <PictureCell pictureData={this.state.pictureData} />
            </ScrollView>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
