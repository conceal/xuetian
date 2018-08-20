/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {ListView , Image , View , Text , StyleSheet , TouchableOpacity , Alert} from 'react-native';

import ImageData from './image.json';
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');

export default class listView extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged:(r1 , r2) => r1 !== r2});
        this.state={
            datasource:ds.cloneWithRows(ImageData)
        }
    }
  render() {
    return (
        <ListView
            dataSource={this.state.datasource}
            renderRow={this.renderRow}
        />
    );
  }
  renderRow(rowData , sectionID , rowID , heightID) {
      return(
          <TouchableOpacity onPress={this.click}>
            <View style={styles.container}>
                <Image
                    source={{uri:rowData.img}}
                    style= {styles.imageStyle}
                />
                <View style={styles.rightStyle}>
                    <Text style={styles.nameStyle}>{rowData.name}</Text>
                    <Text style={styles.titleStyle} numberOfLines={3}>{rowData.title}</Text>
                </View>
            </View>    
          </TouchableOpacity>
      )
  }
}

click = ()=> {
    Alert.alert('人生语录');
}

const styles = StyleSheet.create({
    container:{
        width:width,
        flexDirection:'row', 
        padding:10,
        borderBottomWidth:0.5,
        borderBottomColor:"#e8e8e8"
    },
    rightStyle:{
        width:width*0.66,
        marginLeft:5,
    },
    imageStyle:{
        width:100,
        height:100,
        marginTop:5,
        marginBottom:5
    },
    nameStyle:{
        paddingTop:5,
        fontSize:20
    },
    titleStyle:{

    },
})

module.exports = listView;
