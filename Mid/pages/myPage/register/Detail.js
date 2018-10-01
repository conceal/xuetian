import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default class Detail extends Component{
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
      nickName: '',
      password: '',
    }
  }

  render() {
    return (
       <View style={styles.container}>
         <View style={styles.partOne}>
           <Image source={require('../../../res/images/icon.png')} style={styles.Img}/>
           <View style={styles.partTwo}>
             <TextInput
                 placeholder={'昵称'}
                 style={{width:width,backgroundColor:'white',marginBottom:2,height:45}}
                 underlineColorAndroid={'transparent'}
                 keyboardType={'default'}
                 onChangeText={(nickName)=>{this.setState({nickName:nickName})}}
             />
             <TextInput
                 placeholder={'密码'}
                 style={{width:width,backgroundColor:'white',marginBottom:2,height:45}}
                 underlineColorAndroid={'transparent'}
                 keyboardType={'default'}
                 secureTextEntry={true}
             />
             <TextInput
                 placeholder={'确认密码'}
                 style={{width:width,backgroundColor:'white',marginBottom:2,height:45}}
                 underlineColorAndroid={'transparent'}
                 keyboardType={'default'}
                 secureTextEntry={true}
                 onChangeText={(password)=>{this.setState({password:password})}}
             />
           </View>
           <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')} style={styles.touch}>
             <Text style={{fontSize:19,color:'black'}}>完成</Text>
           </TouchableOpacity>

           <View style={styles.partThree}>
             <Text>点击完成，表示你已同意</Text>
             <TouchableOpacity onPress={()=> {}}>
               <Text style={{color: 'blue'}}>《米米来用户协议》</Text>
             </TouchableOpacity>
           </View>
         </View>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  partOne: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Img: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 20,
    marginTop: 15,
  },
  partTwo: {
    marginTop: 40,
    paddingTop: 5,
  },
  touch: {
   width: width-60,
    height:50,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE059',
  },
  partThree: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  }
});
