/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, SectionList, Image} from 'react-native';
import NavigationBar from '../../config/NavigationBar';
import Icon from "react-native-vector-icons/Ionicons";
import CommonStyle from "../../config/utils/CommonStyle";
import {Actions} from "react-native-router-flux";
import HttpUtils from '../../config/HttpUtils';
import {actorData} from '../../config/utils/Services';

export default class ActorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actorData:[],
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let id = this.props.id;
    HttpUtils.get(actorData(id))
        .then((response)=> {
          this.setState({
            actorData:response.types,
          });
        }).catch((error)=> {
          alert(error);
    })
  }

  render() {
    let dataSource = this.state.actorData.map((item, index)=> {
      let dataSource = {};
      dataSource.key= `${item.typeName} ${item.typeNameEn}`;
      dataSource.data = item.persons;
      return dataSource;
    });
    return (
        <View style={styles.container}>
          <NavigationBar
            title = '演职员'
            leftButton={
              <TouchableOpacity
                  style={{marginLeft: 16, height:CommonStyle.navImageHeight, width:CommonStyle.navImageWidth}}
                  onPress={()=> Actions.pop()}>
                <Icon name="ios-arrow-back" size={30} color={'white'}/>
              </TouchableOpacity>
            }
          />
          <SectionList
              renderSectionHeader={this.renderSectionHeader}
              renderItem={this.renderItem}
              sections={dataSource}
              ItemSeparatorComponent={() => <View/>}
              ListHeaderComponent={() => <View/>}
              ListFooterComponent={() => <View/>}
              keyExtractor={()=> this. _keyExtractor}
          />
        </View>
    );
  }

  _keyExtractor = (item, index) => index;

  renderSectionHeader = (info) => {
    let section = info.section.key;
    return (
        <View style={styles.sectionHeader}>
          <Text style={{color: CommonStyle.gray, marginLeft: 10, fontSize: 12}}>{section}</Text>
        </View>
    )
  };

  renderItem = info => {
    let item = info.item;
    return (
        <View style={styles.cellStyle}>
          <View>
            <Image style={{width: 50, height: 50}} source={{uri: item.image}} />
          </View>
          <View style={{justifyContent: CommonStyle.around, flex: 1, marginHorizontal: 10, height: 50}}>
            <Text style={{fontSize: 13, color: CommonStyle.textBlockColor}}>{item.name}</Text>
            <Text style={{fontSize: 11, color: CommonStyle.textGrayColor}}>{item.nameEn}</Text>
            {
              item.personate ?
                  <Text numberOfLines={1}
                        style={{fontSize: 11, color: CommonStyle.textBlockColor}}>{`饰：${item.personate}`}</Text> : null
            }
          </View>
          {
            item.roleCover ?
                <View style={{width: 60, justifyContent: 'center'}}>
                  <Image style={{width: 50, height: 50, borderRadius: 25}} source={{uri: item.roleCover}} />
                </View> : null
          }
        </View>
    )
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cellStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: CommonStyle.lineColor,
  },
  sectionHeader: {
    justifyContent: 'center',
    height: 20,
    backgroundColor: CommonStyle.backgroundColor,
  }
});

