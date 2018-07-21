/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
	Component
} from 'react';
import {
	StyleSheet,
	View,
	Text,
	AppRegistry,
	TextInput
} from 'react-native';
//引入外部的js文件
var LoginView = require('./loginView');

export default class loginApp extends Component {
	render() {
		return (
			<LoginView/>
		);
	}
}


//输出一个类
AppRegistry.registerComponent('LoginApp', () => loginApp);