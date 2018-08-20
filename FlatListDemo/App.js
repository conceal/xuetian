/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View , FlatList , Alert} from 'react-native';

let ITEM_HEIGHT = 100;

export default class App extends Component{

  renderItem= (item)=> {
    let text = '第' + item.index + '个' + 'title=' + item.item.title;
    let bgColor = item.index % 2 == 0 ? 'red' : 'blue';
    return <Text style={[{flex:1 , height:ITEM_HEIGHT , backgroundColor:bgColor},styles.txt]}>{text}</Text> 
  }

  header = (item)=> {
    return <Text style={[styles.txt , {backgroundColor:'black'}]}>这是头部</Text>
  }

  footer = ()=> {
    return <Text style={[styles.txt , {backgroundColor:'black'}]}>这是尾部</Text>
  }

  separator = ()=> {
    return <View style={{height:2 , backgroundColor:'yellow'}}/>
  }

  render() {
    var data = [];
    for (var i = 0; i < 100; i++) {
      data.push({key: i, title: i + ''});
    }    


    return (
      <View style={{flex:1}}>
        <Button 
          title='滚动到指定位置'
          onPress={()=> {
            this.flatList.scrollToOffset({animated:true , offset:2000})
          }}
        />
        <View style={{flex:1}}>
          <FlatList
            ref={(flatList) => this.flatList = flatList}
            ListHeaderComponent={this.header}
            ListFooterComponent={this.footer}
            ItemSeparatorComponent={this.separator}
            // numColumns={3}
            // columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}
            // 
            // getItemLayout={(data,index)=>(
            //   {length:ITEM_HEIGHT , offset:(ITEM_HEIGHT)*index , index}
            // )}
            onEndReachedThreshold={5}
            onEndReachd={(info)=>{
              Alert.alert('info');
            }}
            // onViewableItemsChanged={(info)=> {
            //   Alert.alert('info');
            // }}
            data={data}
            renderItem={this.renderItem}>
          </FlatList>
        </View>
  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txt:{
    textAlign:'center',
    textAlignVertical:'center',
    color:'white',
    fontSize:30,
  }
})

