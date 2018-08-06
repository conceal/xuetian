import React , {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NavigationBar from './NavigationBar';

export default class CustomKeyPage extends Component{
  constructor(props){
    super(props);
  };

  render(){
    return (
        <View style={styles.container}>
          <NavigationBar
              title='自定义标签'
              style={{backgroundColor:'#6405ED'}}
          />
          <Text sryle={styles.tips}>自定义标签</Text>
        </View>
    );
  };
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  tips:{

  },
});