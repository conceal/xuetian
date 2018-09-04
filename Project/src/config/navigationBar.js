import React, {Component} from 'react';
import {View, Text, Platform, StyleSheet, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {CommonStyle} from './utils/utils';

const NAV_BAR_HEIGHT_ANDROID = CommonStyle.navHeight;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
  backgroundColor: PropTypes.string,
  barStyle:PropTypes.oneOf['default', 'light-content', 'dark-content'],
  hidden:PropTypes.bool,
};

export default class NavigationBar extends Component {
  static propTypes = {
    style:PropTypes.object,
    title:PropTypes.string,
    titleView:PropTypes.element,
    hide:PropTypes.bool,
    leftButton:PropTypes.element,
    rightButton:PropTypes.element,
    statusBar: PropTypes.shape(StatusBarShape),
  };

  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden:false,
    }
  }
;
  constructor(props) {
    super(props);
    this.state = {
      title: ' ',
      hide: false,
    }
  }

  render() {
    let status = <View style={[styles.statusBar, this.props.statusBar]}>
                    <StatusBar {...this.props.statusBar}/>
                  </View>;
    let titleView = this.props.titleView ? this.props.titleView : <Text style={styles.titleStyle}>{this.props.title}</Text>;
    let content = <View style={this.props.navBar ? this.props.navBar : styles.navBar}>
                    {this.props.leftButton}
                    <View style={styles.titleViewContainer}>
                      {status}
                      {titleView}
                    </View>
                    {this.props.rightButton}
                  </View>;
    return (
        <View style={styles.container}>
          {content}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'gray'
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    backgroundColor: '#151C28',
  },
  titleViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
  }
});
