/**
 * Created by xuetian on 2018/8/17
 */

/**设备信息**/

import {Dimensions, Platform} from 'react-native';

const DeviceInfo = {
  //设备宽度
  deviceWidth:Dimensions.get('window').width,
  //设备高度
  deviceHeight: Platform.OS === 'iOS' ? Dimensions.get('window').height : Dimensions.get('window').height - 24 ,
  isIphoneX:Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812,
  //设备系统
  deviceOS: Platform.OS,
  //当前config : debug \ release
  mode:__DEV__ ? 'xdebug' : 'release'
};

export default DeviceInfo;
