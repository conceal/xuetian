import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableWithoutFeedback} from 'react-native';
import {CommonStyle, DeviceInfo} from '../../config/utils/utils'
import {Actions} from 'react-native-router-flux';
import Icon1 from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

export default class ReadListCell extends Component {
  constructor(props) {
    super(props);
    this.state={
      imgHeight: 250
    }
  }

  componentDidMount() {
    Image.getSize(this.props.data.img_url, this.getSizeSuccess(), this.getSizeFailure)
  }

  getSizeSuccess() {
    let that = this;
    return (width, height) => {
      height = ((DeviceInfo.deviceWidth-20)/width)*height;
      that.setState({
        imgHeight:height,
      })
    }
  };

  getSizeFailure = (error)=> {
    console.log(error)
  };

  render() {
    let data = this.props.data;
    let author = data.author;
    let variety = data.share_list.wx.title.split('|')[0].trim();
    return (
        <TouchableWithoutFeedback
            onPress={()=> Actions.ReadDetail({id:data.item_id, variety: variety})}
        >
          <View style={styles.container}>
            <Text style={styles.textVarietyStyle}>{`${variety}`}</Text>
            <Text style={styles.titleStyle}>{data.title}</Text>
            <Text style={styles.authorStyle}>文/{author.user_name}</Text>
            <Image style={[styles.imageStyle, {height: this.state.imgHeight}]} source={{uri:data.img_url}}/>
            <Text style={styles.forwardStyle}>{data.forward}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.authorStyle}>n小时前</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.authorStyle}>{data.like_count}</Text>
                <View style={{marginLeft: 3}}>
                <Icon1 name="heart" size={18} color={CommonStyle.gray}/>
                </View>
                <View style={{marginLeft: 3}}>
                <Icon2 name="share" size={18} color={CommonStyle.gray}/>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

    )
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 12,
  },
  textVarietyStyle:{
    alignSelf: 'center',
    marginVertical: 3 ,
    fontSize: 12,
    color: CommonStyle.textGrayColor
  },
  titleStyle: {
    fontSize: 16,
    marginBottom: 10 ,
    color: CommonStyle.textBlockColor
  },
  authorStyle: {
    fontSize: 10,
    color: CommonStyle.textGrayColor,
  },
  imageStyle: {
    width: DeviceInfo.deviceWidth-20,
    resizeMode:'contain',
    marginVertical: 10,
  },
  forwardStyle: {
    fontSize: 12,
    marginBottom:5,
    color: CommonStyle.textGrayColor,
  }
});
