import React , {Component}from 'react';
import {AppRegistry , View, Text , Image , TouchableOpacity , StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import FirstScreen from '../PagesScreen/FirstPage';
import SecondScreen from '../PagesScreen/SecondtPage';
import ThirdScreen from '../PagesScreen/ThirdPage';
import FourthScreen from '../PagesScreen/FourthPage';
import HomaTextInput from './homeTextInput';
import HomeARC from './homeARC';
import OtherApp from './otherApp';


export class HomeScreen extends Component {
  render(){
    return(
      <View>
        <HomaTextInput/>
        <HomeARC/>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('First')}>
            <Image 
                source={require('../src/drawable/image01.png')}
                style={styles.imageStyle}/>
            <Text>热门贷</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Second')}>
            <Image 
                    source={require('../src/drawable/image02.png')}
                    style={styles.imageStyle}/>
            <Text>免征信</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Third')}>
            <Image 
                    source={require('../src/drawable/image03.png')}
                    style={styles.imageStyle}/>
            <Text>极速贷</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Fourth')}>
            <Image 
                    source={require('../src/drawable/image04.png')}
                    style={styles.imageStyle}/>
            <Text>芝麻分贷</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.otherAppStyle}>
      <OtherApp/>
      </View>
      
      </View>
    )
  }
}

const RootStack = createStackNavigator(
  {
    Home:{
      screen:HomeScreen,
      navigationOptions:{
        header:null
      }

    } ,
    First: {
      screen:FirstScreen,
      navigationOptions:{
          headerTitle:'热门贷'
      }
    },
    Second: {
      screen:SecondScreen,
       navigationOptions:{      
          headerTitle:'免征信'
      }
    },
    Third: {
      screen:ThirdScreen,
      navigationOptions:{
          headerTitle:'极速贷'
      }
    },
    Fourth: {
      screen:FourthScreen,
      navigationOptions:{
          headerTitle:'芝麻分贷'
      }
    },

  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginBottom:2,
    },
    imageStyle:{
        width:50,
        height:50
    },
    otherAppStyle:{
      marginTop:2,
      height:280,
      paddingLeft:8,
    }
})

export default RootStack;


AppRegistry.registerComponent('AppDemo' , ()=> HomeScreen);



