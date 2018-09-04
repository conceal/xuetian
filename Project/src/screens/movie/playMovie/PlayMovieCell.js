import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Actions} from 'react-native-router-flux';
import {CommonStyle}from '../../../config/utils/utils';

export default class PlayMovieCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  render() {
    let data = this.props.playData;
    return (
        <TouchableOpacity style={styles.container} onPress={()=> Actions.PlayMovie({url:data.url, title:data.title})}>
          <ImageBackground style={styles.imageStyle} source={{uri:data.image}}>
            <Icon name="play-circle-outline" size={30} color={CommonStyle.white}/>
          </ImageBackground>
          <View style={styles.rightStyle}>
            <Text numberOfLines={2} style={styles.titleStyle}>{data.title}</Text>
            <Text style={styles.textStyle}>片长：{data.length}</Text>
          </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems:'center',
    marginTop: CommonStyle.marginTop,
    marginLeft: CommonStyle.marginLeft,
    paddingBottom: CommonStyle.marginBottom,
    borderBottomWidth: CommonStyle.lineWidth,
    borderBottomColor: CommonStyle.textGrayColor,
  },
  imageStyle:{
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightStyle:{
    flex: 1,
    justifyContent: 'space-around',
    height: 60,
    paddingHorizontal: 10,
  },
  titleStyle:{
    fontSize:15,
    fontWeight:'bold',
    color: CommonStyle.textBlockColor
  },
  textStyle:{
    color: CommonStyle.textGrayColor,
  }
});
