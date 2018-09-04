/**
 * Create by xuetian
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {Actions} from 'react-native-router-flux';
import {CommonStyle} from '../../../config/utils/utils';

export default class ComingMovieCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ScrollView
            style={{height: 160, margin: 10, marginLeft: 0}}
            horizontal={true}
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
        >
          {this.renderScrollView()}
        </ScrollView>
    );
  }

  renderScrollView() {
    return (
        this.props.attentionMovie.map((data, index)=> (
            <TouchableOpacity
                key={index}
                style={{marginLeft: 10, width: 80}}
                onPress={()=> Actions.MovieDetails({id:data.id})}
            >
              <Image style={{width: 80, height: 120}} source={{uri:data.image}}/>
              <Text numberOfLines={1}>{data.title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize:11, color: CommonStyle.textGrayColor}}>
                  {data.wantedCount}
                  <Text>人想看</Text>
                </Text>
                <Icon name={"heart"} size={15} color={'#F86728'}/>
              </View>
            </TouchableOpacity>
        ))
  )
  }
}
