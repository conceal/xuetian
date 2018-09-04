import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class CommentCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLove: false,
    }
  }

  render() {
    let data = this.props.CommentData;
    let web_url = data.user.web_url;
    let user_name = data.user.user_name;
    let input_date = data.input_date;
    let praisenum = data.praisenum;
    let content = data.content;
    let Lovepraisenum = praisenum + 1;
    return(
        <View style={styles.container}>
          <View style={styles.PartOne}>
            <View style={{flexDirection:'row',width:100}}>
              <Image style={styles.images}
                     source={{uri:web_url}}
              />
              <View style={{justifyContent:'center',alignItems:'center',marginLeft:5}}>
                <Text style={{fontSize:10,color:'black'}}>{user_name}</Text>
                <Text style={{fontSize:7}}>{input_date}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={()=> this.setState({isLove: !this.state.isLove})} activeOpacity={1}>
              {
                this.state.isLove ?
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{marginRight:5,color:'red'}}>{Lovepraisenum}</Text>
                      <Icon name='heart' size={20} color='red'/>
                    </View> :
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{marginRight:5,color:'grey'}}>{praisenum}</Text>
                      <Icon name='heart-o' size={20} color='grey'/>
                    </View>
              }
            </TouchableOpacity>
          </View>
          <Text style={{fontSize:15,color:'black',marginLeft:40,marginRight:10,marginBottom:20,marginTop:10}}>{content}</Text>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  PartOne:{
    flexDirection:'row',
    marginTop:10,
    justifyContent:'space-between',
    marginRight:5,
    marginLeft:5
  },
  images:{
    width:30,
    height:30,
    borderRadius:15
  }

});
