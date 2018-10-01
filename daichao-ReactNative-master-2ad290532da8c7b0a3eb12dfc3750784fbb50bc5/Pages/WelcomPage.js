import React,{Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  AsyncStorage
}from 'react-native'
import Root from "./RootPage";
import Root2 from './Root2Page';
import NetUtils from "./Common/NetUtils";
import JPushModule from "jpush-react-native/index";
let url = 'http://47.98.148.58/app/goods/launchImg.do';
let URL = "http://47.98.148.58/app/user/setRegistrationId.do";
export default class WelcomePage extends Component{
  constructor(props){
    super(props);
    this.utils = new NetUtils;
    this.state={
      img:' ',
    }
  }

  componentDidMount() {
    JPushModule.initPush();
    JPushModule.getRegistrationID((registrationId) => {
      console.log("registrationId:"+ registrationId);
      this.utils.fetchNetRepository(URL,
          {"registrationId":registrationId});
    });
    this.onLoad();
    setTimeout(this.openApp.bind(this),3000);
  }

  openApp(){
    AsyncStorage.getItem('isFirst',(error,result)=>{
      if (result === 'false') {
        this.props.navigator.resetTo({ component:Root }) }
      else { console.log('第一次打开');
        AsyncStorage.setItem('isFirst','false',(error)=>{ if (error) { alert(error); } });
        this.props.navigator.resetTo({ component:Root2 })}});
  }

  render(){
    return<View style={styles.container}>
      <Image style={styles.image}
             source={{uri:this.state.img}}
      />
    </View>
  }
  onLoad() {
    this.utils.fetchNetRepository(url)
        .then(result => {
          console.log(result);
          let data = result.data.imgUrl;
          this.setState({
            img: data,
          });
        })
        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  text:{
    fontSize:20,
    color:'red',
    marginTop:200,
    marginLeft:185,
  },
  image:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:null,
    height:null,
  }
});
