import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Data from '../src/json/DetailsData.json';
var Dimensions  = require('Dimensions');
var {width} = Dimensions.get('window');
export default class FirstPage extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftod9rbzf4j30mu0csn6n.jpg'}}
                       style={styles.ImageView}
                />
                <View style={styles.TextView}>
                    <Text style={{color:'red',fontSize:15}}>同时注册满六家，下注成功率高达99%</Text>
                </View>
                <FlatList
                    renderItem={this.ViewList}
                    data={Data}
                />

            </View>
        );
    }
    Way1(item){
      if(item.item.way1){
          return(
              <View>
                  <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftoio2o2j4j30140140n8.jpg'}}
                         style={{width:10,height:10}}
                  />
                  <Text>有信用卡即可申请</Text>
              </View>
          );
      }else{
          return <View></View>
      }

    }
    Way2(item){
        if(item.item.way2){
            return(
                <View>
                    <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftoirmxo6ej30140140sh.jpg'}}
                           style={{width:10,height:10}}
                    />
                    <Text>按时还款额度提高5万</Text>
                </View>
            );
        }else{
            return <View></View>
        }

    }
    ViewList=(item)=>{

          return(
              <View style={styles.partView}>
                  <View style={styles.partOne}>
                      <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftofk1hbytj30140143y9.jpg'}}
                             style={{width:20,height:20}}
                      />
                      <Text style={{fontSize:18,paddingLeft:5}}>{item.item.name}</Text>
                  </View>
                  <View style={styles.partTwo}>
                        <View style={styles.partTwoOne}>
                           <Text style={{fontSize:20,color:'red',paddingBottom:5}}>{item.item.number}</Text>
                            <Text style={{fontSize:15}}>额度范围（元）</Text>
                        </View>
                      <View>
                          <Text style={{color:'#FFEBCD'}}>|</Text>
                          <Text style={{color:'#FFEBCD'}}>|</Text>
                          <Text style={{color:'#FFEBCD'}}>|</Text>
                          <Text style={{color:'#FFEBCD'}}>|</Text>
                      </View>
                      <View style={styles.partTwoTwo}>
                          <Text style={{paddingBottom:5}}>{item.item.getTime}放款</Text>
                          <Text style={{paddingBottom:5}}>月费率{item.item.row1}</Text>
                          <Text style={{paddingBottom:5}}>贷款期限{item.item.sendTime}</Text>
                      </View>
                      <View style={styles.partTwoThree}>
                          <Text style={{paddingTop:10}}>已抢{item.item.row}</Text>
                          <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftohq8505cj305t01agld.jpg'}}
                                 style={{width:50,height:13,paddingTop:10}}
                          />
                          <TouchableOpacity
                              activeOpacity={0.9}
                              style={styles.Touchable}
                          >
                              <Text style={{color:'red'}}>申请贷款</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                 <View>{()=>this.Way1(item)}</View>
                  <View>{()=>this.Way2(item)}</View>
              </View>
          );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5FcFF',
    },
    ImageView:{
        width:width,
        height:150,
    },
    TextView:{
        paddingLeft:20,
        justifyContent:'center'
    },
    partView:{
        paddingTop:10,
        width:width,
        height:150,
    },
    partOne:{
        paddingLeft:10,
        flexDirection:'row',
        alignItems:'center'
    },
    partTwo:{
        flexDirection:'row',
        paddingLeft:10,
        width:width*0.95,
        justifyContent:'center'

        
    },
    partTwoOne:{
        paddingTop:10,
        paddingRight:15
    },
    partTwoTwo:{
        paddingTop:10,
        paddingLeft:15,
    },
    partTwoThree:{
        paddingLeft:30,
    },
    Touchable:{
        borderWidth:1,
        borderColor:'red',
        height:30,
        width:70,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    }

});