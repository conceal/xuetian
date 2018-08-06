import React , {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import NavigationBar from './NavigationBar';
import CustomKeyPage from './CustomKeyPage';

export default class MyPage extends Component{
  constructor(props){
    super(props);
  };

  render(){
    return (
        <View style={styles.container}>
          <NavigationBar
            title='我的'
            style={{backgroundColor:'#6405ED'}}
          />
          <Text
              sryle={styles.tips}
              onPress={() => {
                  this.props.navigator.push({component: CustomKeyPage, params: {...this.props}
                  })
              }}
          >自定义标签</Text>
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