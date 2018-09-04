import React, {Component} from 'react';
import {TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


export default class LoveHeart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLove: false,
      loveColor: this.props.loveColor,
      disLoveColor:this.props.disLoveColor,
      size: this.props.size,
    }
  }

  render() {
    return (
        <TouchableOpacity activeOpacity={1} onPress={()=> this.setState({isLove: !this.state.isLove})}>
          {
            this.state.isLove ?
                <Icon name="heart" size={this.state.size} color={this.state.loveColor} /> :
                <Icon name="heart-o" size={this.state.size} color={this.state.disLoveColor} />
          }
        </TouchableOpacity>
    )
  }
}
