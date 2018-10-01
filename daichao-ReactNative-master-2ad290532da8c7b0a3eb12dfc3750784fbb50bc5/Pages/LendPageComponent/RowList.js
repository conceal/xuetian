import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  StatusBar,
  Text, DeviceEventEmitter
} from 'react-native';
import TabNavigator from "react-native-tab-navigator";
import Newc from "./Tab/Newc";
import Black from "./Tab/Black";
import Long from "./Tab/Long";
import High from "./Tab/High";
import Low from "./Tab/Low";
import NetUtils from "../Common/NetUtils";

let {width} = Dimensions.get('window');

let url = 'http://47.98.148.58/app/goods/classification.do';

export default class RowList extends Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;

    return {
      headerTitle: params ? params.title : this.props.title,
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
      },
      headerRight: (
          <View/>
      ),
      headerStyle: {
        marginTop: StatusBar.currentHeight
      }
    }
  };

  constructor(props) {
    super(props);
    this.netUtils = new NetUtils;
    const {params} = this.props.navigation.state;
    this.state = {
      selectedTab: params.tab,
      name1:'',
      name2:'',
      name3:'',
      name4:'',
      name5:'',
      img11:'',
      img12:'',
      img21:'',
      img22:'',
      img31:'',
      img32:'',
      img41:'',
      img42:'',
      img51:'',
      img52:'',
      tab1Id:'',
      tab2Id:'',
      tab3Id:'',
      tab4Id:'',
      tab5Id:'',
      canUse:true
    }
  }

  onLoad() {
    this.netUtils.fetchNetRepository(url)
        .then(result => {
          console.log(result);
          this.setState({
            name1:result.data.tabImg[0].styleName,
            name2:result.data.tabImg[1].styleName,
            name3:result.data.tabImg[2].styleName,
            name4:result.data.tabImg[3].styleName,
            name5:result.data.tabImg[4].styleName,
            img11:result.data.tabImg[0].img1,
            img12:result.data.tabImg[0].img2,
            img21:result.data.tabImg[1].img1,
            img22:result.data.tabImg[1].img2,
            img31:result.data.tabImg[2].img1,
            img32:result.data.tabImg[2].img2,
            img41:result.data.tabImg[3].img1,
            img42:result.data.tabImg[3].img2,
            img51:result.data.tabImg[4].img1,
            img52:result.data.tabImg[4].img2,
            tab1Id:result.data.tabImg[0].styleId,
            tab2Id:result.data.tabImg[1].styleId,
            tab3Id:result.data.tabImg[2].styleId,
            tab4Id:result.data.tabImg[3].styleId,
            tab5Id:result.data.tabImg[4].styleId,
            canUse:false
          });
          console.log(this.state.name1)
        })
        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }
  componentDidMount() {
    if (this.state.canUse) {
      this.onLoad();
    }
  }

  render() {
    console.log(this.state.name1);
    return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor='white'
          />
          <TabNavigator>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_new'}
                title={<Text>{this.state.name1}</Text>}
                selectedTitleStyle={{color: 'black'}}
                renderIcon={() => <Image style={styles.image}
                                         source={{uri:this.state.img11}}/>}
                renderSelectedIcon={() => <Image style={styles.image}
                                                 source={{uri:this.state.img12}}/>}
                onPress={() => {
                  this.setState({selectedTab: 'tb_new'});
                  DeviceEventEmitter.emit('ChangeTab1',1);
                  this.props.navigation.setParams({tab1Id:this.state.tab1Id,title:this.state.name1})
                }}
            >
              <Newc {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_black'}
                title={<Text>{this.state.name2}</Text>}
                selectedTitleStyle={{color: 'black'}}
                renderIcon={() => <Image style={styles.image}
                                         source={{uri:this.state.img21}}/>}
                renderSelectedIcon={() => <Image style={styles.image}
                                                 source={{uri:this.state.img22}}/>}
                onPress={() => {
                  this.setState({selectedTab: 'tb_black'});
                  DeviceEventEmitter.emit('ChangeTab2',1);
                  this.props.navigation.setParams({tab2Id:this.state.tab2Id,title: this.state.name2})
                }}
            >
              <Black {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_long'}
                title={<Text>{this.state.name3}</Text>}
                selectedTitleStyle={{color: 'black'}}
                renderIcon={() => <Image style={styles.image}
                                         source={{uri:this.state.img31}}/>}
                renderSelectedIcon={() => <Image style={styles.image}
                                                 source={{uri:this.state.img32}}/>}
                onPress={() => {
                  this.setState({selectedTab: 'tb_long'});
                  DeviceEventEmitter.emit('ChangeTab3',1);
                  this.props.navigation.setParams({tab3Id:this.state.tab3Id,title: this.state.name3})
                }}
            >
              <Long {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_high'}
                title={<Text>{this.state.name4}</Text>}
                selectedTitleStyle={{color: 'black'}}
                renderIcon={() => <Image style={styles.image}
                                         source={{uri:this.state.img41}}/>}
                renderSelectedIcon={() => <Image style={styles.image}
                                                 source={{uri:this.state.img42}}/>}
                onPress={() => {
                  this.setState({selectedTab: 'tb_high'});
                  DeviceEventEmitter.emit('ChangeTab4',1);
                  this.props.navigation.setParams({tab4Id:this.state.tab4Id,title: this.state.name4})
                }}
            >
              <High {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_low'}
                title={<Text>{this.state.name5}</Text>}
                selectedTitleStyle={{color: 'black'}}
                renderIcon={() => <Image style={styles.image}
                                         source={{uri:this.state.img51}}/>}
                renderSelectedIcon={() => <Image style={styles.image}
                                                 source={{uri:this.state.img52}}/>}
                onPress={() => {
                  this.setState({selectedTab: 'tb_low'});
                  DeviceEventEmitter.emit('ChangeTab5',1);
                  this.props.navigation.setParams({tab5Id:this.state.tab5Id,title:this.state.name5})
                }}
            >
              <Low {...this.props}/>
            </TabNavigator.Item>
          </TabNavigator>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 24,
    height: 24
  },
});
