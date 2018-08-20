/**
 * Created by guangqiang on 2017/10/9.
 */
import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {CommonStyle} from '../../../../config/utils/utils';

export default class PlusComment extends Component {

  render() {
    let data = this.props.plusData;


    return (
        <View style={styles.cellStyle}>
          <Text style={{color: CommonStyle.black, fontSize: 15, fontWeight: 'bold'}}>{data.title}</Text>
          <Text style={{color: CommonStyle.textBlockColor, marginTop: 10, lineHeight: 20}}>{data.content}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
            <Image style={{width: 40, height: 40, borderRadius: 20}} source={{uri: data.headImg}}/>
            <View style={{marginLeft: 10}}>
              <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>{data.nickname}</Text>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Text style={{color: CommonStyle.textGrayColor, fontSize: 12}}>{data.commentDate}</Text>
                {
                  data.isWantSee ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>看过 - 评分</Text>
                    <View style={{backgroundColor: '#639C0C', paddingHorizontal: 2, paddingVertical: 5}}>
                      <Text style={{fontSize: 12, color: CommonStyle.white}}>{data.rating}</Text>
                    </View>
                  </View> : null
                }
              </View>
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  cellStyle: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: CommonStyle.lineColor,
    marginLeft: 10,
    paddingRight: 10,
  }
});
