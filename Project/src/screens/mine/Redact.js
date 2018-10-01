import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Modal} from 'react-native';
import NavigationBar from '../../config/NavigationBar';
import CommonStyle from "../../config/utils/CommonStyle";
import {Actions} from "react-native-router-flux";
import ImagePicker from 'react-native-image-picker';
import Icon from "react-native-vector-icons/EvilIcons";
import DeviceInfo from "../../config/utils/DeviceInfo";
import stdaorage from '../../config/StorageConfig';

let options = {
  title:'请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '相册',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Redact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: null,
      headPhoto: null,
      backgroundImage: null,
      modalVisible: false,
      changeText: null
    }
  }

  componentDidMount() {
    storage.load({
      key:'nickname',
      autoSync: true,
      syncInBackground:true,
    }).then((ret)=> {
      this.setState({
        nickname:ret,

      })
    }).catch((error)=> {
      console.log(error)
    })
  }

  render() {
    return (
        <View style={styles.container}>
          <NavigationBar
              titleView={<Text style={styles.navBarStyle}>编辑资料</Text>}
              navBar={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 44,
                backgroundColor: 'white',
              }}
              leftButton={
                <TouchableOpacity
                    style={{marginLeft: 6, height:CommonStyle.navImageHeight, width:CommonStyle.navImageWidth, justifyContent:'center'}}
                    onPress={()=> Actions.pop()}>
                  <Icon name="chevron-left" size={46} color={'black'}/>
                </TouchableOpacity>
              }
          />
          <Text style={styles.sectionStyle}>基本资料</Text>
          <View style={styles.itemStyle}>
            <TouchableOpacity style={styles.headPhotoStyle} activeOpacity={1} onPress={()=> this.openMyCamera()}>
              <Text style={styles.textStyle}>头像</Text>
              <Image style={styles.headPhoto} source={this.state.headPhoto}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headPhotoStyle}>
              <Text style={styles.textStyle}>背景</Text>
              <Icon name="chevron-right" size={40} color={'grey'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headPhotoStyle} activeOpacity={1} onPress={()=> this.setModalVisible(true)}>
              <Text style={styles.textStyle}>昵称</Text>
              <Text style={styles.textStyle}>{this.state.nickname}</Text>
            </TouchableOpacity>
          </View>
          <Modal
              animationType={"fade"}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={()=> this.setModalVisible(false)}
          >
            <TouchableOpacity activeOpacity={1} onPress={()=> this.onClose()} style={styles.modalStyle}>
              <TextInput
                  style={styles.textInput}
                  placeholder={'用户名'}
                  autoFocus={true}
                  onChangeText={(text)=> this.ChangeText(text)}
              />
              <TouchableOpacity onPress={()=> this.onClose()} style={styles.buttonStyle} activeOpacity={1}>
                <Text style={styles.buttonText}>保存</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        </View>
    )
  }

  openMyCamera = ()=> {
    ImagePicker.showImagePicker(options, (response) => {
      if(response.didCancel) {
        console.log('用户点击了取消')
      }else if (response.error){
        console.log('ImagePicker发生错误:'+response.error)
      }else {
        let source = {uri:response.uri};
        this.setState({
          headPhoto: source
        });
      }
    })
  };

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    })
  }

  onClose() {
    this.setState({
      modalVisible: false,
      nickname: this.state.changeText,
    });
    storage.save({
      key:'nickname',
      data:this.state.changeText,
    })
  }

  ChangeText = (text)=> {
    this.setState({
      changeText: text,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBarStyle: {
    fontSize: 16,
    color: 'black',
  },
  sectionStyle: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 10,
  },
  itemStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 14,
    color: 'black',
    marginVertical: 10,
  },
  headPhotoStyle: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  headPhoto: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  modalStyle: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  textInput: {
    height: 40,
    width: DeviceInfo.deviceWidth*0.9,
    borderRadius: 14,
    backgroundColor: 'white'
  },
  buttonStyle: {
    marginTop: 20,
    height: 40,
    width: DeviceInfo.deviceWidth*0.9,
    borderRadius: 14,
    backgroundColor: '#C6E2FF',
    alignItems:'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  },
});
