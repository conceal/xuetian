import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar, DeviceEventEmitter
} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";
let ImagePicker = require('react-native-image-picker');

export default class Setting extends Component {
  static navigationOptions = {
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerRight: (
        <View/>
    ),
  };

  constructor(props){
    super(props);
    this.state={
      text:13613722839,
      Name:"",
      Data:"",
      nickName:"",
      imgUrl:'',
      phoneNum:'',
      avatarSource: "",
      videoSource: ""
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      cancelButtonTitle: '取消',
      title: '请选择',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册中选择',
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity
              onPress={this.selectPhotoTapped.bind(this)}
              style={styles.row1Style}
          >
            <View style={styles.row2Style}>
              <View>
                <Text style={styles.textStyle}>头像</Text>
              </View>
              <View style={styles.leftStyle}>
                <Image source={this.state.avatarSource} style={styles.image1Style}/>
                <Image source={require('../../../res/images/ahead.png')} style={styles.image2Style}/>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.row3Style}
              onPress={() => this.props.navigation.navigate('ChangeName')}
          >
            <View style={styles.row4Style}>
              <View>
                <Text style={styles.textStyle}>昵称</Text>
              </View>
              <View style={styles.leftStyle}>
                <Text style={styles.textStyle}>{this.state.nickName}</Text>
                <Image source={require('../../../res/images/ahead.png')} style={styles.image2Style}/>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ChangeTel')}
              style={styles.row3Style}
          >
            <View style={styles.row4Style}>
              <View>
                <Text style={styles.textStyle}>手机号</Text>
              </View>
              <View style={styles.leftStyle}>
                <Text style={styles.textStyle}>{this.state.phoneNum}</Text>
                <Image source={require('../../../res/images/ahead.png')} style={styles.image2Style}/>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChangePassword')} style={styles.row3Style}>
            <View style={styles.row4Style}>
              <View>
                <Text style={styles.textStyle}>修改密码</Text>
              </View>
              <View style={styles.leftStyle}>
                <Image source={require('../../../res/images/ahead.png')} style={styles.image2Style}/>
              </View>
            </View>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row1Style: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  row2Style: {
    height: ScreenUtils.scaleSize(162),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ScreenUtils.scaleSize(20),
    marginRight: ScreenUtils.scaleSize(10),
    marginLeft:  ScreenUtils.scaleSize(10),
    alignItems: 'center',
  },
  row3Style: {
    backgroundColor: 'white',
    marginTop: 1,
  },
  row4Style: {
    height:ScreenUtils.scaleSize(88),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: ScreenUtils.scaleSize(10),
    marginLeft: ScreenUtils.scaleSize(10),
    alignItems: 'center',
  },
  leftStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: ScreenUtils.setSpText(17),
    color: 'black',
  },
  image1Style: {
    width: ScreenUtils.scaleSize(130),
    height: ScreenUtils.scaleSize(130),
    borderRadius: ScreenUtils.scaleSize(130/2),
  },
  image2Style: {
    width: ScreenUtils.scaleSize(60),
    height:ScreenUtils.scaleSize(90),
    marginRight: 5
  },
  falanyStyle: {
    paddingLeft: 20,
  }
});

