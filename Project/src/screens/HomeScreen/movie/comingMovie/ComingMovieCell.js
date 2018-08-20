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
import {CommonStyle} from '../../../../config/utils/utils';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/EvilIcons';

export default class ComingMovieCell extends Component {
  render() {
    let data = this.props.comingMovie;
    return (
        <TouchableOpacity style={styles.container} onPress={()=> Actions.MovieDetails({id:data.id})}>
          <TouchableOpacity style={styles.leftStyle} onPress={()=> Actions.MovieDetails({id:data.id})}>
            <ImageBackground style={styles.imageStyle} source={{uri:data.image}}>
              <Icon1 name='play-circle-outline' size={25} color={CommonStyle.white}/>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.rightStyle}>
            <View style={{flex:1}}>
              <Text numberOfLines={2} style={{color: CommonStyle.textBlockColor, fontSize: 16}}>{data.title}</Text>
              <Text numberOfLines={1} style={{color: '#F9783F', fontSize: 13, paddingVertical: 6}}>{data.wantedCount}人想看-{data.type}</Text>
              <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>{data.actor1}/{data.actor2}</Text>
            </View>
            <View style={{justifyContent: 'space-around'}}>
              {
                data.isTicket ?
                    <TouchableOpacity style={{borderColor: '#6EA524', borderWidth: 1, borderRadius: 2}}>
                      <Text style={{paddingVertical: 5, paddingHorizontal: 10, color: '#6EA524', fontSize: 13}}>预售</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={{borderColor: '#F9783F', borderWidth: 1, borderRadius: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2, paddingVertical: 4}}>
                      <Icon2 name="heart" size={15} color={'#F9783F'}/>
                      <Text style={{ color: '#F9783F', fontSize: 13}}>想看</Text>
                    </TouchableOpacity>
              }
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  rightStyle: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:1,
  },
  titleStyle: {
    fontSize: 16,
    color: CommonStyle.black,
  }
});
