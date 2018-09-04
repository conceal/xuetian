import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import NavigationBar from "../../config/NavigationBar";
import CommonStyle from "../../config/utils/CommonStyle";
import {ReadData}from '../../config/utils/Services';
let {width} = Dimensions.get('window');

export default class ReadList extends Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      isLoading: true,
    }
  }
  componentDidMount(){
    this.fetchData();
  }

  fetchData = ()=>{
    fetch(ReadData())
        .then(response=>response.json())
        .then((jsonData)=>{
          this.setState({
            data : jsonData.data.essay,
            isLoading: false,
          })
        })
        .catch(error=>{
          alert(error);
        });
  };
  _keyExtractor = (item, index) => index;
  RenderItem(item){
    return(
        <View style={{flex: 1, backgroundColor: CommonStyle.white}}>
          <TouchableWithoutFeedback
              style={{backgroundColor: CommonStyle.white}}
              onPress={()=>Actions.NewDetails({id:item.item.content_id,text:item.item.guide_word})}
          >
            <View style={styles.container}>
              <Image source={{uri:item.item.author[0].web_url}}
                     style={{width:100,height:100}}
              />
              <View style={styles.One}>
                <Text style={{marginTop:10,fontSize:20,height:50}}
                      numberOfLines={2}
                >{item.item.hp_title}</Text>
                <Text style={{marginTop:10,marginRight:5}}
                      numberOfLines={2}
                >导读：{item.item.guide_word}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
    );
  }
  render(){
    let data =this.state.data;
    if (this.state.isLoading) {
      return (
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} size="small" />
            <Text style={{color: '#666666', paddingLeft: 10}}>努力加载中</Text>
          </View>
      )
    } else {
      return(
          <View style={{flex:1}}>
            <NavigationBar
                titleView={<Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>阅读</Text>}
                navBar={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: Platform.OS === 'ios' ? 44 : CommonStyle.navHeight,
                  backgroundColor: 'white',
                  borderBottomWidth: 0.3,
                  borderBottomColor: 'gray'
                }}
                statusBar={{
                  backgroundColor:'#151C28'}}
            />
            <FlatList
                data={data}
                renderItem={this.RenderItem.bind(this)}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={() => {
                  return <View style={{height: 0.5, backgroundColor: CommonStyle.lineColor}} />
                }}
            />
          </View>
      );
    }
  }
}
const styles =StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    height:120,
    alignItems:'center',
    margin:10,
    backgroundColor:'white'
  },
  One:{
    width:width-120,
    height:120,
    alignItems:'stretch',
    margin:10
  }
});
