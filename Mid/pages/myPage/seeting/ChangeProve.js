import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";
const {width} = Dimensions.get('window');
export default class ChangeProve extends Component{
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
      text: '',
      time:60,
      inputTexts:new Array(6),
      editable:true,
    }
  }

  componentDidMount() {
    this.startTime();
  }

  startTime() {
    let that = this;
    //setInterval表示每个几秒执行一次方法
    this.timer = setInterval(function () {
      if(that.state.time === 0) {
        that.setState({
          time:0,
        })
      }else{
        that.setState({
          time:that.state.time - 1,
        })
      }
    },1000);
  }

  textLogin() {
    this.props.navigation.navigate('ChangeTel')
  }

  Inputs() {
    let inputs = [];
    const {inputTexts} = this.state;
    for(let i = 0; i < 6; i++){
      let input = <View style={styles.textInput}>
        <Text>{inputTexts[i]}</Text>
      </View>;
      inputs.push(input)
    }
    return inputs;
  }

  TextAdd(){
    if(this.state.time === 0){
      return null;
    }else{
      return <Text style={{marginLeft:20, marginTop: 10}}>重新发送{this.state.time}s</Text>
    }
  }

  render(){
    const {editable} = this.state;

    return (
        <View style={styles.container}>
          <Text style={styles.textStyle}>验证码已发送至：</Text>
          <TouchableOpacity style={styles.touch} onPress={()=> this.setState({editable: !this.state.editable})}>
            <View style={styles.touch}>
              {
                editable ?
                    <TextInput
                        ref={(ref) => this._input = ref}
                        autoFocus={true}
                        style={{height: 1, width: 1}}
                        maxLength={6}
                        visible={false}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                          this.setState({
                            inputTexts: Array.from(text),
                            text: text,
                          });
                          text.length === 6 && this._input.blur();
                        }}
                        onBlur={() => this.textLogin()}
                    /> : <View />
              }
              {this.Inputs()}
            </View>
          </TouchableOpacity>
          {this.TextAdd()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  contain:{
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  textStyle: {
    paddingTop: 15,
    marginLeft: 20,
    color: 'black',
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width,
  },
  textInput: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    width: ScreenUtils.scaleSize(95),
    height: ScreenUtils.scaleSize(80),
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  }
});
