import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import {CommonStyle} from '../../../config/utils/utils';
import Icon1 from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/EvilIcons";

export default class MiniComment extends Component {

  render() {
    let data = this.props.miniData;
    return (
        <View style={styles.cellStyle}>
          <View>
            <Image style={styles.avatar} source={{uri: data.headImg}}/>
          </View>
          <View style={styles.rightContent}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5}}>
              <Text style={{color: CommonStyle.drakGray}}>{data.nickname}</Text>
              <Text style={{color: '#639C0C', marginRight: 10}}>{`评 ${data.rating}`}</Text>
            </View>
            <Text style={{color: CommonStyle.textBlockColor, lineHeight: 25}}>{data.content}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10}}>
              <Text style={{color: CommonStyle.drakGray}}>{data.commentDate}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{marginTop: 5}}>
                    <Icon1 name={'message'} size={20} color={CommonStyle.gray}/>
                  </View>
                  <Text style={{fontSize: 12, color: CommonStyle.drakGray, marginLeft: 3}}>回复</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                  <Icon2 name={'like'} size={25} color={CommonStyle.gray}/>
                  <Text style={{fontSize: 12, color: CommonStyle.drakGray}}>赞</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  cellStyle: {
    borderBottomWidth: 1,
    borderBottomColor: CommonStyle.lineColor,
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  rightContent: {
    marginLeft: 10,
    flex: 1
  }
});
