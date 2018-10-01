import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  FlatList,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import * as ScreenUtils from "../Common/ScreenUtils";
import NetUtils from "../Common/NetUtils";
import Swipeable from 'react-native-swipeable';

let url = 'http://47.98.148.58/app/user/message.do';
let URL = 'http://47.98.148.58/app/user/deleteMsg.do';
let width = Dimensions.get('window').width;

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.utils = new NetUtils;
    this.state = {
      count: null,
      dataArray: [],
      login: false
    }
  }

  static navigationOptions = {
    headerTitle: '消息中心',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center'
    },
    headerRight: (
        <View/>
    ),
    headerStyle: {
      marginTop: StatusBar.currentHeight
    }
  };

  onLoad() {
    this.utils.fetchNetRepository(url)
        .then(result => {
          console.log(result);
          let data = result.data.data;
          let datas = [];
          let i = 0;
          data.map(function (item) {
            datas.push({
              key: i,
              value: item,
            });
            i++;
          });
          this.setState({
            dataArray: datas,
            login: result.data.state
          });
          data = null;
          datas = null;
        })
        .catch(error => {
          this.setState({
            result: JSON.stringify(error),
          })
        })
  }

  componentDidMount() {
    this.onLoad();
  }

  render() {
    return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor='white'
          />
          <FlatList
              renderItem={this.ViewList}
              data={this.state.dataArray}
              keyExtractor={this._keyExtractor}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
          />
        </View>
    )
  };

  _keyExtractor = (item, index) => index.toString();

  ItemSeparatorComponent = () => {
    return (
        <View style={{backgroundColor: 'gray', height: 1, width: width}}>
        </View>
    )
  };

  _delete(id) {
    this.utils.fetchNetRepository(URL,{"id":id})
        .then(result => {
          console.log(result);
          if (result.state === true) {
            this.onLoad()
          }
        })
  }

  ViewList = ({item}) => {
    console.log(this.state.login);
    if (this.state.login) {
      return (
          <Swipeable
              rightButtons={[
                <TouchableOpacity
                    style={styles.swipeableStyle}
                    onPress={() => {
                      this._delete(item.value.id);
                    }}
                >
                  <Text style={{fontSize: 20, color: 'black'}}>删除</Text>
                </TouchableOpacity>
              ]}
          >
            <View style={styles.wrap}>
              <Image source={require('../../res/Images/er-yaoqinggonggao.png')}
                     style={{
                       marginTop: ScreenUtils.scaleSize(20),
                       marginLeft: ScreenUtils.scaleSize(30),
                       width: ScreenUtils.scaleSize(88),
                       height: ScreenUtils.scaleSize(88),
                       paddingBottom: 5
                     }}/>
              <View style={{
                marginLeft: ScreenUtils.scaleSize(25),
                marginTop: ScreenUtils.scaleSize(10),
                flexDirection: 'column'
              }}>
                <View style={{
                  marginTop: ScreenUtils.scaleSize(5),
                  width: width - ScreenUtils.scaleSize(146),
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}>
                  <Text style={styles.title}>{item.value.messageName}</Text>
                  <Text style={styles.time}>{item.value.messageDate}</Text>
                </View>
                <Text style={styles.content}>{item.value.messageText}</Text>
              </View>
            </View>
          </Swipeable>
      );
    } else {
      return <View style={styles.wholeview}>
        <View style={styles.wrap}>
          <Image source={require('../../res/Images/er-yaoqinggonggao.png')}
                 style={{
                   marginTop: ScreenUtils.scaleSize(20),
                   marginLeft: ScreenUtils.scaleSize(30),
                   width: ScreenUtils.scaleSize(88),
                   height: ScreenUtils.scaleSize(88),
                   paddingBottom: 5
                 }}
          />
          <View style={{
            marginLeft: ScreenUtils.scaleSize(25),
            marginTop: ScreenUtils.scaleSize(10),
            flexDirection: 'column'
          }}>
            <View style={{
              marginTop: ScreenUtils.scaleSize(5),
              width: width - ScreenUtils.scaleSize(146),
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={styles.title}>{item.value.messageName}</Text>
              <Text style={styles.time}>{item.value.messageDate}</Text>
            </View>
            <Text style={styles.content}>{item.value.messageText}</Text>
          </View>

        </View>
      </View>

    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  wrap: {
    padding: 6,
    flexDirection: 'row',
    width: ScreenUtils.scaleSize(749),
    height: ScreenUtils.scaleSize(136),
  }, item: {

    flexDirection: 'column',
    marginLeft: 9
  },
  title: {
    fontSize: ScreenUtils.setSpText(18),
    color: '#333333'
  }, content: {
    fontSize: 15,
    marginTop: ScreenUtils.scaleSize(16),
    color: 'gray'
  }, time: {
    marginRight: ScreenUtils.scaleSize(10),
  },
  swipeableStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 75,
    height: ScreenUtils.scaleSize(136),
  },
  wholeview: {
    flexDirection: 'column',
    padding: 6
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },

});
