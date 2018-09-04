import {
    View,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import StartPage from "./StartPage";
import Message from "./LendPageComponent/Message";
import Login from "./MyPageComponent/Login";
import RowList from "./LendPageComponent/RowList";
import Invite from './MyPageComponent/RegisterPage/Invite';
import Setting from './MyPageComponent/Setting';
import React from "react";
import Register from "./MyPageComponent/RegisterPage/Register";
import Detail from "./MyPageComponent/RegisterPage/Detail";
import Prove from "./MyPageComponent/RegisterPage/Prove";
import MyInvite from "./MyPageComponent/SectionComponent/MyInvite";
import MyHelp from "./MyPageComponent/SectionComponent/MyHelp";
import DetailHelp from "./MyPageComponent/SectionComponent/DetailHelp";
import Leave from "./MyPageComponent/SectionComponent/LeaveMessage";
import AboutUs from "./MyPageComponent/SectionComponent/AboutUs";
import Change_Name from "./MyPageComponent/SettingDetails/Change_Name";
import Change_Password from "./MyPageComponent/SettingDetails/Change_Password";
import WebPage from "./WebPage";
import SearchPage from "./LendPageComponent/SearchPage";
import Change_Teltel from "./MyPageComponent/SettingDetails/Change_Teltel";
import Change_TelChange from "./MyPageComponent/SettingDetails/Change_TelChange";
import Change_TelProve from "./MyPageComponent/SettingDetails/Change_TelProve";
import NewPasswordPage from "./MyPageComponent/ForgetComponent/NewPasswordPage";
import ProvePage from "./MyPageComponent/ForgetComponent/ProvePage";
import FindBackPage from "./MyPageComponent/ForgetComponent/FindBackPage";
import MyWeChat from "./MyPageComponent/SectionComponent/MyWeChat";

const Root = StackNavigator({
        Home: {
            screen: StartPage,
            navigationOptions: {
                header: null
            }
        },
        First: {
            screen: StartPage,
            navigationOptions: {
                header: null
            },

        },
        Second: {
            screen: Login,
        },
        Fourth: {
            screen: Message,
        },
        MyInvite: {
            screen: MyInvite,
        },
        MyHelp: {
            screen: MyHelp,
        },
        DetailHelp: {
            screen: DetailHelp,
        },
        AboutUs: {
            screen: AboutUs
        },
        Leave: {
            screen: Leave
        },
        MyWeChat: {
            screen: MyWeChat,
        },
        new: {
            screen: RowList,
        },
        black: {
            screen: RowList,
        },
        long: {
            screen: RowList,
        },
        high: {
            screen: RowList,
        },
        low: {
            screen: RowList,
        },
        Setting: {
            screen: Setting,
            navigationOptions: {
                headerTitle: '设置'
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                title: '注册',
                headerTitleStyle: {
                    flex: 1,
                    textAlign: 'center'
                },
                headerRight: (
                    <View/>
                )
            }
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                title: '注册',
                headerTitleStyle: {
                    flex: 1,
                    textAlign: 'center'
                },
                headerRight: (
                    <View/>
                )
            }
        },
        Invite: {
            screen: Invite,
            navigationOptions: {
                title: '输入邀请码',
                headerTitleStyle: {
                    flex: 1,
                    textAlign: 'center'
                },
                headerRight: (
                    <View/>
                )
            }
        },
        Change_Name: {
            screen: Change_Name,
            navigationOptions: {
                title: '修改昵称'
            }
        },
        Change_Password: {
            screen: Change_Password,
            navigationOptions: {
                title: '修改密码'
            }
        },
        Change_Teltel: {
            screen: Change_Teltel,
            navigationOptions: {
                title: '手机号'
            }
        },
        Change_TelChange: {
            screen: Change_TelChange,
            navigationOptions: {
                title: '修改手机号'
            }
        },
        Change_TelProve: {
            screen: Change_TelProve,
            navigationOptions: {
                title: '输入验证码'
            }
        },
        FindBackPage: {
            screen: FindBackPage,
            navigationOptions: {
                title: '找回密码'
            }
        },
        NewPasswordPage: {
            screen: NewPasswordPage,
            navigationOptions: {
                title: '新密码'
            }
        },
        ProvePage: {
            screen: ProvePage,
            navigationOptions: {
                title: '输入验证码'
            }
        },
        SearchPage: {
            screen: SearchPage,
        },
        Prove: {
            screen: Prove,
            navigationOptions: {
                title: '输入验证码',
                headerTitleStyle: {
                    flex: 1,
                    textAlign: 'center'
                },
                headerRight: (
                    <View/>
                )
            }
        },
        WebPage: {
            screen: WebPage,
        }
    }
);

export default Root;