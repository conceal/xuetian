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
import GuidePage from "./GuidePage";
import MyInvite from "./MyPageComponent/SectionComponent/MyInvite";
import MyHelp from "./MyPageComponent/SectionComponent/MyHelp";
import DetailHelp from "./MyPageComponent/SectionComponent/DetailHelp";
import Leave from "./MyPageComponent/SectionComponent/LeaveMessage";
import AboutUs from "./MyPageComponent/SectionComponent/AboutUs";
import Change_Name from "./MyPageComponent/SettingDetails/Change_Name";
import Change_Password from "./MyPageComponent/SettingDetails/Change_Password";
import WebPage from "./WebPage";
import SearchPage from "./LendPageComponent/SearchPage";
import Change_TelChange from "./MyPageComponent/SettingDetails/Change_TelChange";
import Change_Teltel from "./MyPageComponent/SettingDetails/Change_Teltel";
import Change_TelProve from "./MyPageComponent/SettingDetails/Change_TelProve";
import FindBackPage from "./MyPageComponent/ForgetComponent/FindBackPage";
import NewPasswordPage from "./MyPageComponent/ForgetComponent/NewPasswordPage";
import ProvePage from "./MyPageComponent/ForgetComponent/ProvePage";
import MyWeChat from "./MyPageComponent/SectionComponent/MyWeChat";
import LoginProve from "./MyPageComponent/LoginProve";
import MyEarn from "./MyPageComponent/SectionComponent/MyEarn";

const Root = StackNavigator({
      Home: {
        screen: GuidePage,
        navigationOptions: {
          header: null
        }
      },
      First: {
        screen: StartPage,
        navigationOptions: {
          header: null,
        }
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
      Leave: {
        screen: Leave
      },
      AboutUs: {
        screen: AboutUs
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
          title: '注册'
        }
      },
      Detail: {
        screen: Detail,
        navigationOptions: {
          title: '注册'
        }
      },
      Invite: {
        screen: Invite,
        navigationOptions: {
          title: '输入邀请码'
        }
      },
      Prove: {
        screen: Prove,
        navigationOptions: {
          title: '输入验证码'
        }
      },
      SearchPage: {
        screen: SearchPage,
      },
      Change_name: {
        screen: Change_Name,
        navigationOptions: {
          title: '修改昵称'
        }
      },
      MyEarn: {
        screen: MyEarn,
        navigationOptions: {
          title: '我的奖励'
        }
      },
      Change_password: {
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
      LoginProve: {
        screen: LoginProve,
        navigationOptions: {
          title: '输入验证码'
        }
      },
      WebPage: {
        screen: WebPage,
      },
    }
);

export default Root;
