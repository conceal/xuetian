import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, Picker, TouchableOpacity, Dimensions} from 'react-native';
import * as ScreenUtils from '../../Common/ScreenUtils';
import Prove from "../register/Prove";
const {width} = Dimensions.get('window');

export default class TelChange extends Component{
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
      num: '86',
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.PickerStyle}>
            <Picker
                selectedValue={this.state.num}
                onValueChange={(num)=> this.setState({num: num})}
                style={styles.picker}
                mode={'dropdown'}
            >
              <Picker.Item label='+86' value={'移动'} style={{fontSize:5}}/>
              <Picker.Item label='+10' value={'联通'} style={{fontSize:5}}/>
              <Picker.Item label='+00' value={'电信'} style={{fontSize:5}}/>
            </Picker>
            <TextInput
              placeholder={'手机号'}
              maxLength={11}
              style={styles.textInput}
              keyboardType={'numeric'}
              underlineColorAndroid={'transparent'}
              onChangeText={(text)=> this.setState({text: text})}
            />
          </View>
          <TouchableOpacity style={styles.touch} onPress={()=> this.props.navigation.navigate('ChangeProve')}>
            <Text style={{fontSize:19, color: 'black'}}>下一步</Text>
          </TouchableOpacity>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  PickerStyle: {
    flexDirection: 'row',
    height: 50,
    marginVertical: 20,
  },
  picker: {
    width: 80,
    height: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'gray',
  },
  textInput: {
    width: width-80,
    height: 50,
    backgroundColor: 'white',
  },
  touch: {
    width: width-60,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 30,
    backgroundColor: '#FFE059',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  }
});
