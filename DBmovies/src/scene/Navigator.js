import React , {Component} from 'react';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import {StackNavigator} from 'react-navigation';
import PageScreen from './PageScreen';

export default StackNavigator(
    {
        Home:{
            screen:HomeScreen
        },
        Details:{
            screen:DetailsScreen
        },
        Page:{
            screen:PageScreen
        }

    },
     {
        initialRouteName: 'Home',     //设置初始路由为Home
    },
)