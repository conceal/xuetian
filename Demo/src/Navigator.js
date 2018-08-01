import HomeScreen from './HomeScreen';
import Page0Screen from './page0';
import Page1Screen from './page1';
import Page2Screen from './page2';
import Page3Screen from './page3';
import Page4Screen from './page4';
import {StackNavigator} from 'react-navigation';
import {StyleSheet} from 'react-native';

export default StackNavigator(
    {
        Home:{
            screen:HomeScreen,
            navigationOptions:{
                header:null,
            }
        },
        Page0:{
            screen:Page0Screen,
            navigationOptions:{
                headerTitle:'注册',
                headerTitleStyle:{alignSelf:'center'}
            }
        },
        Page1:{
            screen:Page1Screen,
            navigationOptions:{
                headerTitle:'注册',
                headerTitleStyle:{alignSelf:'center'}
            }
        },
        Page2:{
            screen:Page2Screen,
            navigationOptions:{
                headerTitle:'注册',
                headerTitleStyle:{alignSelf:'center'}
            }
        },
        Page3:{
            screen:Page3Screen,
            navigationOptions:{
                headerTitle:'设置密码',
                headerTitleStyle:{alignSelf:'center'}
            }
        },
        Page4:{
            screen:Page4Screen,
            navigationOptions:{
                headerTitle:'输入邀请码',
                headerTitleStyle:{alignSelf:'center'}
            }
        },
    },
    {
        initialRouteName:'Page0'
    }
)

const styles = StyleSheet.create({

})