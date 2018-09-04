import React,{Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    StatusBar,
} from 'react-native'

import TabNavigator from 'react-native-tab-navigator';
import LendPage from './LendPageComponent/LendPage';
import EarnPage from './EarnPageComponent/EarnPage';
import MyPage from './MyPageComponent/MyPage';
export default class StartPage extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedTab:'tb_home',
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='transparent'
                    translucent={true}
                    hidden={false}
                    animated={true}
                    barStyle={'dark-content'}
                    showHideTransition={'fade'}
                    networkActivityIndicatorVisible={true}
                />
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_home'}
                        title="借钱"
                        titleStyle={{fontSize:12}}
                        selectedTitleStyle={{color:'black'}}
                        renderIcon={()=><Image style={styles.image}
                                               source={require('../res/Images/jieqian.png')}/>}
                        renderSelectedIcon={()=><Image style={[styles.image]}
                                                       source={require('../res/Images/jieqian2.png')}/>}
                        onPress={()=>this.setState({selectedTab:'tb_home'})}
                    >
                        <LendPage{...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_earn'}
                        title="赚钱"
                        titleStyle={{fontSize:12}}
                        selectedTitleStyle={{color:'black'}}
                        renderIcon={()=><Image style={styles.image}
                                               source={require('../res/Images/qiandai.png')}/>}
                        renderSelectedIcon={()=><Image style={[styles.image]}
                                                       source={require('../res/Images/qiandai2.png')}/>}
                        onPress={()=>this.setState({selectedTab:'tb_earn'})}
                    >
                        <EarnPage{...this.props}/>
                    </TabNavigator.Item >
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_user'}
                        title="我的"
                        titleStyle={{fontSize:12}}
                        selectedTitleStyle={{color:'black'}}
                        renderIcon={()=><Image style={styles.image}
                                               source={require('../res/Images/me.png')}/>}
                        renderSelectedIcon={()=><Image style={[styles.image]}
                                                       source={require('../res/Images/me2.png')}/>}
                        onPress={()=>this.setState({selectedTab:'tb_user'})}
                    >
                        <MyPage{...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:StatusBar.currentHeight
    } ,
    image:{
        width:22,
        height:22
    },
    page1:{
        flex:1,
        backgroundColor:'red'
    },
    page2:{
        flex:1,
        backgroundColor:'blue'
    },
    page3:{
        flex:1,
        backgroundColor:'#FFE059'
    },
});