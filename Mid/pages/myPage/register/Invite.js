import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default class Invite extends Component {
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
      text: ' ',
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <TextInput
            placeholder={'请输入邀请码'}
            style={styles.textInputStyle}
            underlineColorAndroid={'transparent'}
            keyboardType={'numeric'}
            onChangeText={(text)=> this.setState({text: text})}
          />
          <Text style={styles.textStyle}>在好友分享链接中找到他的邀请码</Text>
          <View style={styles.buttonStyle}>
            <TouchableOpacity style={styles.touch} onPress={()=> this.props.navigation.navigate('Detail')}>
              <Text style={{fontSize:19, color: 'black'}}>跳过</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touch} >
              <Text style={{fontSize:19, color: 'black'}}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  textInputStyle: {
    width: width,
    backgroundColor: 'white',
    marginTop: 10,
    fontSize: 15,
    height: 50,
  },
  textStyle: {
    marginLeft: 10,
    marginTop: 8,
    fontSize: 15,
  },
  buttonStyle: {
    flex: 1,
   flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  touch: {
    width: (width-60)/2,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#FFE059'
  }
});
