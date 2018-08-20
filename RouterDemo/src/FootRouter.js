import React, {Component} from 'react';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import FirstPage from './scene/FirstPage';
import SecondPage from './scene/SecondPage';
import ThirdPage from './scene/ThirdPage';
import TabScene from './scene/tabScene/TabScene';
import PageOne from "./scene/tabScene/PageOne";
import PageTwo from "./scene/tabScene/PageTwo";
import PageThree from "./scene/tabScene/PageThree";
import {Text} from "react-native";

const TabIcon = ({focused , title}) => {
  return (
      <Text style={{color: focused  ? 'blue' : 'black'}}>{title}</Text>
  );
};

export default class FootRouter extends Component{
  render() {
    return (
        <Router>
          <Scene key='root'>
            <Scene key='FirstPage' component={FirstPage} title='FirstPage' initial={true} />
            <Scene key='SecondPage' component={SecondPage} title='SecondPage'/>
            <Scene key='ThirdPage' component={ThirdPage} title='ThirdPage'/>
            <Scene hideNavBar tabBarPosition="bottom">
              <Tabs
                  key="tabbar"
                  swipeEnabled
                  wrap={false}
                  // 是否显示标签栏文字
                  showLabel={false}
                  tabBarStyle={{backgroundColor: "#eee"}}
                  //tab选中的颜色
                  activeBackgroundColor="white"
                  //tab没选中的颜色
                  inactiveBackgroundColor="red"
              >
                <Scene
                    key="one"
                    icon={TabIcon}
                    component={PageOne}
                    title="PageOne"
                />

                <Scene
                    key="two"
                    component={PageTwo}
                    title="PageTwo"
                    icon={TabIcon}
                />

                <Scene
                    key="three"
                    component={PageThree}
                    title="PageThree"
                    icon={TabIcon}
                />
              </Tabs>
            </Scene>
          </Scene>
        </Router>
    )
  }
}