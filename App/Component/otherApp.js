import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,FlatList
} from 'react-native';
import Data from '../src/json/otherApp.json';
var Dimensions  = require('Dimensions');
var {width} = Dimensions.get('window');
export default class List extends Component{

    ListV=(item)=>{
        return(
            <View style={styles.container}>
                <Image source={{uri:item.item.img}}
                       style={styles.ImageView}
                />
                <View style={{paddingLeft:10}}>
                    <Text style={{fontSize:20}}>{item.item.app}</Text>
                    <Text style={{paddingTop:5,adjustsFontSizeToFit:true,numberOfLines:2}}>{item.item.text}</Text>
                </View>
            </View>
        );
    }
    separator=()=>{
        return(
            <View>
                <View style={{height:5}}></View>
                <Text style={{color:'#e8e8e8'}}>-----------------</Text>
                <View style={{height:5}}></View>
            </View>
        );
    }
    header(){
        return(
            <View style={{height:5}}/>
        );
    }
    footer(){
        return(
            <View style={{height:5}}/>
        );
    }
    render(){
        return(
                <FlatList
                    renderItem={this.ListV}
                    data ={Data}
                    ItemSeparatorComponent={this.separator}
                    ListHeaderComponent={this.header}
                    ListFooterComponent={this.footer}
                />

        );
    };
}
const styles=StyleSheet.create({
    ImageView:{
        width:50,
        height:50,
        borderRadius:5,
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        paddingLeft:15
    },
    Main:{
        justifyContent:'center',
        alignItems:'center'
    }
})