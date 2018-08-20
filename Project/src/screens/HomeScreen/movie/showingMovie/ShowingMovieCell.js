/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonStyle} from '../../../../config/utils/utils';

export default class ShowingMovieCell extends Component {
  render() {
    let data = this.props.data;
    return (
        <TouchableOpacity style={styles.container} onPress={()=> Actions.MovieDetails({id:data.id})}>
          <TouchableOpacity style={styles.leftStyle} onPress={()=> Actions.MovieDetails({id:data.id})}>
            <ImageBackground style={styles.imageStyle} source={{uri:data.img}}>
              <Icon name='play-circle-outline' size={25} color={CommonStyle.white}/>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.rightStyle}>
            <View style={{flex: 1,}}>
              <Text style={styles.titleStyle}>{data.t}</Text>
              <Text style={{fontSize:12, color:'#539103', paddingTop:6}}>{data.commonSpecial}</Text>
              <Text numberOfLines={1} style={{color: CommonStyle.textGrayColor, fontSize: 12, paddingVertical: 6}}>{data.actors}</Text>
            </View>
            <View style={{justifyContent:'space-around'}}>
              <Text>{data.r}分</Text>
              <TouchableOpacity
                  style={{borderColor: '#F9783F', borderWidth: 1, borderRadius: 2}}
                  onPress={()=> alert('购票服务暂未开启')}
              >
                <Text style={{paddingVertical: 5, paddingHorizontal: 10, color: '#F9783F', fontSize: 13}}>购票</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: CommonStyle.marginTop,
    marginLeft: CommonStyle.marginLeft,
    paddingBottom: CommonStyle.marginBottom,
    borderBottomWidth: CommonStyle.lineWidth,
    borderBottomColor: CommonStyle.lineColor,
  },
  leftStyle:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle:{
    width:50,
    height:80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightStyle:{
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CommonStyle.black,
  }


});
