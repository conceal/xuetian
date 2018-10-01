import React , {Component} from 'react';
import {
  StyleSheet ,
  View ,
  TextInput ,
  Image,
  TouchableOpacity
} from 'react-native';
import * as ScreenUtils from "../Common/ScreenUtils";
import NetUtils from "../Common/NetUtils";

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
export default class TextInputPart extends Component{
  constructor(props){
    super(props);
    this.utils = new NetUtils;
    this.state={
      text:"",
    }
  }
  render(){
    return(
        <View style={styles.container}>
          <View>
            <TextInput
                style={styles.textInputStyle}
                placeholder='搜索'
                clearButtonMode='always'
                underlineColorAndroid='transparent'
                returnKeyType="search"
                onChangeText={(text)=>this.setState({text:text})}
                onSubmitEditing={()=>{
                  this.props.navigation.navigate('SearchPage',{text:this.state.text})
                }}
            />
          </View>
          <View style={styles.LeftStyle}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>{
                  this.props.navigation.navigate('Fourth');
                }}
            >
              <Image
                  source={require('../../res/Images/new.png')}
                  style={styles.imageStyle}/>
            </TouchableOpacity>
          </View>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    paddingLeft:ScreenUtils.scaleSize(30),
    paddingBottom:ScreenUtils.scaleSize(11),
    backgroundColor:'#FFE059'
  },
  textInputStyle:{
    backgroundColor:'white',
    width:ScreenUtils.scaleSize(610),
    alignItems:'flex-start',
    height:ScreenUtils.scaleSize(69),
    borderRadius:ScreenUtils.scaleSize(4),
    justifyContent:'center',
    paddingTop:ScreenUtils.scaleSize(6)
  },
  LeftStyle:{
    marginTop:ScreenUtils.scaleSize(12),
    marginLeft:ScreenUtils.scaleSize(29),
    marginRight:ScreenUtils.scaleSize(32.1),
    width:ScreenUtils.scaleSize(48.9),
    height:ScreenUtils.scaleSize(41),
    flexDirection:'row'
  },
  imageStyle:{
    width:ScreenUtils.scaleSize(48.9),
    height:ScreenUtils.scaleSize(41),
    marginBottom:ScreenUtils.scaleSize(22),
  },
  textStyle:{
    fontSize:10,
  }
});
