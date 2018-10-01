import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Picker, Dimensions, TouchableOpacity} from 'react-native';
const {width} = Dimensions.get('window');

export default class FindBackPassword extends Component{
  static navigationOptions={
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerRight: (
        <View/>
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      num: '',
    }
  }

  render(){
    return(
        <View style={styles.First}>
          <View style={styles.container}>
            <Picker
                selectedValue={this.state.num}
                onValueChange={(num)=>this.setState({num:num})}
                style={styles.picker}
                mode='dropdown'
                itemStyle={{height:50}}
            >
              <Picker.Item label='+86' value={'移动'} style={{fontSize:5}}/>
              <Picker.Item label='+10' value={'联通'} style={{fontSize:5}}/>
              <Picker.Item label='+00' value={'电信'} style={{fontSize:5}}/>
            </Picker>
            <TextInput
                placeholder={'手机号'}
                maxLength={11}
                underline={true}
                style={{width:width-50,backgroundColor:'white'}}
                underlineColorAndroid={'transparent'}
                keyboardType={'numeric'}
                onChangeText={(text)=>this.setState({text:text,click:true})}
            />
          </View>
          <TouchableOpacity
              onPress={()=> this.props.navigation.navigate('FindProve')}
              style={styles.touch}
          >
            <Text style={{fontSize:19,color:'black'}}>获取验证码</Text>
          </TouchableOpacity>
        </View>
    );
  }
}
const styles=StyleSheet.create({
  First:{
    flex:1,
    alignItems:'center',
    backgroundColor:'#F3F4F6'
  },
  container:{
    flexDirection:'row',
    height: 50,
    marginTop:20,
    marginBottom:40,
  },
  picker:{
    width:80,
    height:50,
    justifyContent:'center',
    backgroundColor:'white',
    color:'gray',
    marginLeft:30
  },
  touch:{
    backgroundColor:'#FFE059',
    borderRadius:5,
    width:width-60,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    marginTop:20
  },
});
