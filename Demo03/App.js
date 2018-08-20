/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Image, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';

let options = {
  title:'请选择',
  cancelButtonTitle:'取消',
  takePhotoButtonTitle:'拍照',
  chooseFromLibraryButtonTitle:'选择相册',
  quality:0.75,
  allowsEditing:true,
  noData:false,
  storageOptions:{
    skipBackup:true,
    path:'image',
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      avatarSource:null
    };
  }

  openMyCamera = ()=> {
    ImagePicker.showImagePicker(options, (response)=> {
      if(response.didCancel) {
        alert('用户点击了取消');
      } else if(response.error) {
        alert("ImagePicker发生错误："+response.error);
      } else {
        let source = {uri:response.uri};
        this.setState({
          avatarSource:source,
        });
      }
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=> this.openMyCamera()}>
          <Text>相机&相册</Text>
        </TouchableOpacity>
        <Image source={this.state.avatarSource} style={styles.imageStyle}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    alignItems:'center',
  },
  button:{
    marginTop: 20,
    backgroundColor:'#808080',
    height:35,
    width:140,
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle:{
    height: 180,
    width: 250,
    marginTop:30,
    alignSelf: 'center',
  }
});
