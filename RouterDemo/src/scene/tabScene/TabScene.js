import React, {Component} from 'react';
import {Text} from 'react-native';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

const TabIcon = ({focused , title}) => {
  return (
      <Text style={{color: focused  ? 'blue' : 'black'}}>{title}</Text>
  );
};

export default class TabScene extends Component{
  render() {
    return (
        <Router>
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
        </Router>
    )
  }
}