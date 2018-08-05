import React, {Component} from 'react';
import {StyleSheet, Text, View , TouchableOpacity , Image} from 'react-native';

export default class extends Component {
  render(){
    return(
        <TouchableOpacity style={styles.container}>
        <View style={styles.crll_container}>
          <Text style={styles.title}>{this.props.data.full_name}</Text>
          <Text style={styles.description}>{this.props.data.description}</Text>
          <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
            <View style={{flexDirection:'row' , alignItems:'center'}}>
              <Text>Author:</Text>
              <Image
                  source={{uri:this.props.data.owner.avatar_url}}
                  style={{height:22 , width:22}}
              />
            </View>
            <View style={{flexDirection:'row' , alignItems:'center'}}>
              <Text>Stars:</Text>
              <Text>{this.props.data.stargazers_count}</Text>
            </View>
            <Image
                source={require('.././image/image01.png')}
                style={{height:22 , width:22}}
            />
          </View>
        </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  title:{
    fontSize:16,
    marginBottom: 2,
    color:'#212121'
  },
  description:{
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
    borderRadius:2,
  },
  crll_container:{
    backgroundColor:'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor:'#dddddd',
    borderWidth: 0.5,
    shadowColor:'gray',
    shadowOffset:{width:0.5 , height:0.5},
    shadowOpacity:0.4,
    shadowRadius:1,
    elevation:2,
  }
})