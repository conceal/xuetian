import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList, StatusBar
} from 'react-native';

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');
import * as ScreenUtils from "../../Common/ScreenUtils";
import NetUtils from "../../Common/NetUtils";

let url = 'http://47.98.148.58/app/user/showHelp.do';
export default class MyHelp extends Component {
  static navigationOptions = {
    headerTitle: '帮助',
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

  constructor(props) {
    super(props);
    this.utils = new NetUtils;
    this.state = ({
      data: []
    })
  }

  onLoad() {
    this.utils.fetchNetRepository(url)
        .then(result => {
          console.log(result);
          let data = result.data;
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
            data: datas,
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
  };

  render() {
    return (
        <View style={styles.container}>
          <StatusBar
              backgroundColor='white'
          />
          <Text style={styles.title}>常见问题</Text>
          <FlatList
              renderItem={this.ViewList}
              keyExtractor={(item, index) => index}
              data={this.state.data}
          />
        </View>
    )
  }

  ViewList = ({item}) => {
    let title1 = item.value.problem;
    return (
        <TouchableOpacity
            style={styles.rowStyle}
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('DetailHelp', {title: title1})}
        >
          <View style={styles.rightStyle}>
            <Text style={styles.listFont}>{title1}</Text>
            <Image source={require('../../../res/Images/ahead.png')} style={styles.icon02}/>
          </View>
        </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
      },

      rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: ScreenUtils.scaleSize(88),
        marginBottom: ScreenUtils.scaleSize(3),
      },
      title: {
        marginBottom: ScreenUtils.scaleSize(20),
        fontSize: ScreenUtils.setSpText(25),
        marginTop: ScreenUtils.scaleSize(20),
        marginLeft: ScreenUtils.scaleSize(10)
      },
      icon02: {
        height: ScreenUtils.scaleSize(60),
        width: ScreenUtils.scaleSize(60),
      },
      rightStyle: {
        width: width,
        flexDirection:
            'row',
        justifyContent:
            'space-between',
      },

      listFont: {
        fontSize: ScreenUtils.setSpText(19),
        marginLeft: ScreenUtils.scaleSize(10),
        marginTop: ScreenUtils.scaleSize(15),
      }
    })
;


