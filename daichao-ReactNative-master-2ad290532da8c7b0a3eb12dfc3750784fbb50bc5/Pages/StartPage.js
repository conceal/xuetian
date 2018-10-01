import React,{Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  DeviceEventEmitter,
  Text,
} from 'react-native'

import TabNavigator from 'react-native-tab-navigator';
import LendPage from './LendPageComponent/LendPage';
import EarnPage from './EarnPageComponent/EarnPage';
import MyPage from './MyPageComponent/MyPage';
import NetUtils from "./Common/NetUtils";
let url = 'http://47.98.148.58/app/goods/homePage.do';
export default class StartPage extends Component{
  constructor(props){
    super(props);
    this.utils = new NetUtils;
    this.state={
      selectedTab:'tb_home',
      name1:"",
      name2:"",
      name3:"",
      img11:"",
      img12:"",
      img21:"",
      img22:"",
      img31:"",
      img32:""
    }
  }
  componentDidMount(){
    this.onLoad(1);
  }
  onLoad(page) {
    this.utils.fetchNetRepository(url,
        {"pageNo": page})
        .then(result => {
          console.log(result);
          this.setState({
            name1:result.data.menu[0].menu_name,
            name2:result.data.menu[1].menu_name,
            name3:result.data.menu[2].menu_name,
            img11:result.data.menu[0].img,
            img12:result.data.menu[0].clientImg,
            img21:result.data.menu[1].img,
            img22:result.data.menu[1].clientImg,
            img31:result.data.menu[2].img,
            img32:result.data.menu[2].clientImg,
          });
        })
        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }

  render(){
    return(
        <View style={styles.container}>
          <StatusBar
              backgroundColor='transparent'
              translucent={true}
              hidden={false}
              animated={true}
              barStyle={'dark-content'}
              showHideTransition={'fade'}
              networkActivityIndicatorVisible={true}
          />
          <TabNavigator>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_home'}
                title={<Text>{this.state.name1}</Text>}
                titleStyle={{fontSize:12}}
                selectedTitleStyle={{color:'black'}}
                renderIcon={()=><Image style={styles.image}
                                       source={{uri:this.state.img11}}/>}
                renderSelectedIcon={()=><Image style={[styles.image]}
                                               source={{uri:this.state.img12}}/>}
                onPress={()=>{
                  DeviceEventEmitter.emit('Change',1);
                  this.setState({selectedTab:'tb_home'})
                }}
            >
              <LendPage{...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_earn'}
                title={<Text>{this.state.name2}</Text>}
                titleStyle={{fontSize:12}}
                selectedTitleStyle={{color:'black'}}
                renderIcon={()=><Image style={styles.image}
                                       source={{uri:this.state.img21}}/>}
                renderSelectedIcon={()=><Image style={[styles.image]}
                                               source={{uri:this.state.img22}}/>}
                onPress={()=>this.setState({selectedTab:'tb_earn'})}
            >
              <EarnPage{...this.props}/>
            </TabNavigator.Item >
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_user'}
                title={<Text>{this.state.name3}</Text>}
                titleStyle={{fontSize:12}}
                selectedTitleStyle={{color:'black'}}
                renderIcon={()=><Image style={styles.image}
                                       source={{uri:this.state.img31}}/>}
                renderSelectedIcon={()=><Image style={[styles.image]}
                                               source={{uri:this.state.img32}}/>}
                onPress={()=>this.setState({selectedTab:'tb_user'})}
            >
              <MyPage{...this.props}/>
            </TabNavigator.Item>
          </TabNavigator>
        </View>
    )
  }

}
const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:StatusBar.currentHeight
  } ,
  image:{
    width:24,
    height:24
  },
  page1:{
    flex:1,
    backgroundColor:'red'
  },
  page2:{
    flex:1,
    backgroundColor:'blue'
  },
  page3:{
    flex:1,
    backgroundColor:'#FFE059'
  },
});
