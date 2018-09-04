import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import Lightbox from 'react-native-lightbox'
import ActionButton from 'react-native-action-button';
import LoveHeart from '../../config/LoveHeart';
import {DeviceInfo, CommonStyle} from '../../config/utils/utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from "react-native-vector-icons/EvilIcons";
import Icon3 from "react-native-vector-icons/Ionicons";

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Swiper
          style={styles.container}
          height={DeviceInfo.deviceHeight}
          loop={false}
          autoplay={false}
          horizontal={true}
          showsButtons={false}
          showsPagination={false}
        >
          {this.renderPages()}
        </Swiper>
    )
  }

  renderPages() {
    return (
        this.props.pictureData.map((data, index)=> (
            <View style={styles.pageStyle} key={index}>
              <View style={styles.cardView}>
                <Lightbox renderHeader={(close)=> this.renderHeader(close)} underlayColor={'white'} swipeToDismiss={true}>
                  <Image
                      style={styles.imgStyle}
                      source={{uri: data.img_url}} />
                </Lightbox>
                <View style={styles.rowStyle}>
                  <Text style={styles.textStyle}>{data.vol}</Text>
                  <Text style={styles.textStyle}>{data.img_kind} & {data.img_author}作品</Text>
                </View>
                <Text style={styles.wordStyle}>{data.word}</Text>
                <Text style={styles.authorStyle}>----{data.word_from}</Text>
              </View>
              <View style={styles.toolStyle}>
                <Icon name="book" size={25} color={'#00BFFF'}/>
                <View style={styles.rightStyle}>
                  <LoveHeart size={25} loveColor={'red'} disLoveColor={'#00BFFF'} style={{marginRight: 10}}/>
                  <Icon2 name="share-apple" size={40} color={'#00BFFF'}/>
                </View>
              </View>
            </View>
        ))
    )
  }
  renderHeader= (close)=> {
    return (
        <View style={{flex:1}}>
          <ActionButton
              position={'right'}
              buttonColor="#87CEFF"
              onPress={close}
              renderIcon={()=> (<View><Icon3 name={"ios-close"}/></View>)}
          >
          </ActionButton>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  cardView: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 0.3,
    borderColor: 'gray',
    elevation: 2,
  },
  imgStyle: {
    width: DeviceInfo.deviceWidth-40,
    height: DeviceInfo.deviceHeight*0.4,
    alignSelf:'center',
    marginTop: 10,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  textStyle: {
    fontSize: 12,
    color: CommonStyle.textGrayColor,
  },
  wordStyle: {
    fontSize: 15,
    color: CommonStyle.textBlockColor,
    marginTop: 20,
    marginHorizontal: 10,
  },
  authorStyle: {
    fontSize:15,
    color: CommonStyle.textBlockColor,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  toolStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:16,
    marginHorizontal: 18,
  },
  rightStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LightboxStyle: {
    flex: 1,
  }
});
