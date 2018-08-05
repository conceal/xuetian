import React, {Component} from 'react';
import {StyleSheet, Text, View , TextInput} from 'react-native';
import DataRepository from '../widget/Network';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state ={}
    jsonData:' '
  }

  onLoade = ()=>{
    let url = this.genUrl(this.text)
    this.dataRepository.fetchNetRespository(url)
        .then((jsonData)=>{
          this.setState({
            jsonData:jsonData
          })
        })
        .catch((error)=> {
          this.setState({
            jsonData:JSON.stringify(error),
          })
        })
  }
  genUrl(key){
    return URL+key+QUERY_STR;
  }
  render() {
    return (
        <View style={styles.container}>
              <Text
              onPress={()=> {this.onLoade()}}
              style={styles.tips}>获取数据</Text>
               <TextInput
              style={{height:50 , borderWidth:1}}
              onChangeText={text=>this.text=text}
              editable={true}
             />
          <Text style={{height:500}}>{this.state.jsonData}</Text>
          </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  tips:{
    fontSize:30,
  }
})

