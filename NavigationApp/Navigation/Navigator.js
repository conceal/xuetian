import MainScreen from './MainScreen';
import SecondScreen from './SecondScreen';
import {TabNavigator} from 'react-navigation';

export default TabNavigator(
    {
        Main:{
            screen:MainScreen,
        },
        Second:{
            screen:SecondScreen,
        },
    },
    {
        tabBarPosition:'bottom',
        animationEnabled:true,
        tabBarOptions:{
            activeTintColor:'#e91e63',
            showIcon:'true'
        }
    }
)