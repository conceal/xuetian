import React , {Component} from 'react';
import {AppRegistry , StyleSheet , View} from 'react-native';
import MainPage from './src/component/MainPage';

export default class App extends Component{
  render(){
    return (
        <View style={styles.container}>
          <MainPage/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})

AppRegistry.registerComponent('MyProject' , ()=> App);