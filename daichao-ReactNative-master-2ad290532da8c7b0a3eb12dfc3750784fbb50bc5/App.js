import React,{Component} from 'react';

import {
    Navigator
} from'react-native-deprecated-custom-components';
import WelcomePage from './Pages/WelcomPage';
function setup() {
    class Root extends Component{
        renderScene(route,navigator){
            let Component=route.component;
            return <Component{...route.params} navigator={navigator}/>
        }
        render(){
            return <Navigator
                initialRoute={{component:WelcomePage}}
                renderScene={(route,navigator)=>this.renderScene(route,navigator)}
            />
        }
    }
    return<Root/>
}
module.exports=setup;