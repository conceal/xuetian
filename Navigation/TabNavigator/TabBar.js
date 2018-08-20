import React , { Component } from 'react';
import {AppRegistry , Text , View , Navigator , StyleSheet , Image , TouchableOpacity} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import HomeComponent from './HomeComponent';
import CustomerComponent from './CustomerComponent';
import OrderComponent from './OrderComponent';
import ProductComponent from './ProductComponent';
import MineComponent from './MineComponent';

export default class Main extends Component{
    constructor(props) {
        super(props) ;
        this.state = {
            selectedTab:'home'
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <TabNavigator tabBarStyle={styles.tab}>
                    <TabNavigator.Item 
                        selected={this.state.selectedTab === 'home' }
                        title="首页"
                        titlestyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={()=> <Image source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} style={styles.icon}/>}
                        renderSelectedIcon={()=> <Image source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} style={styles.icon}/>}
                        onPress={()=> this.setState({selectedTab:'首页'})} >
                        <HomeComponent/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '订单'}
                        title="订单"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} style={styles.icon}/> }
                        renderSelectedIcon={() => <Image style={styles.icon} source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} />}
                        onPress={() => this.setState({ selectedTab: '订单' })}>
                        <OrderComponent />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '客户'}
                        title="客户"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} style={styles.icon}/> }
                        renderSelectedIcon={() => <Image style={styles.icon} source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} />}
                        onPress={() => this.setState({ selectedTab: '客户' })}>
                        <CustomerComponent />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '产品'}
                        title="产品"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} style={styles.icon}/> }
                        renderSelectedIcon={() => <Image style={styles.icon} source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} />}
                        onPress={() => this.setState({ selectedTab: '产品' })}>
                        <ProductComponent />
                    </TabNavigator.Item>
                   <TabNavigator.Item
                        selected={this.state.selectedTab === '我的'}
                        title="我的"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} style={styles.icon}/> }
                        renderSelectedIcon={() => <Image style={styles.icon} source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} />}
                        onPress={() => this.setState({ selectedTab: '我的' })}>
                        <MineComponent />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    tab:{
        height:70,
        backgroundColor:'#222222',
        alignItems:'center',
    },
    tabText:{
        marginTop:1,
        color:'#ffffff',
        fontSize:16,
    },
    selectedTabText:{
        marginTop:1,
        color:'#FFD700',
        fontSize:16,
    },
    icon:{
        width:30,
        height:31,
        resizeMode:'stretch',
        marginTop:10,
    }
});