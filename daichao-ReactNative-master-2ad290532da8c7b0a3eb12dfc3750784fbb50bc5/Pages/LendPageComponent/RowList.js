import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    Dimensions,
    StatusBar
} from 'react-native';
import TabNavigator from "react-native-tab-navigator";
import Newc from "./Tab/Newc";
import Black from "./Tab/Black";
import Long from "./Tab/Long";
import High from "./Tab/High";
import Low from "./Tab/Low";

let {width} = Dimensions.get('window');

export default class RowList extends Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            headerTitle: params ? params.title : this.props.title,
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            },
            headerRight: (
                <View/>
            ),
            headerStyle: {
                marginTop: StatusBar.currentHeight
            }
        }
    };

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            selectedTab: params.tab,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_new'}
                        title="新口子"
                        selectedTitleStyle={{color: 'black'}}
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/Images/er-xinkouzi.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#FFE059'}]}
                                                         source={require('../../res/Images/er-xinkouzi1.png')}/>}
                        onPress={() => {
                            this.setState({selectedTab: 'tb_new'});
                            this.props.navigation.setParams({title: '新口子'})
                        }}
                    >
                        <Newc {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_black'}
                        title="黑户专区"
                        selectedTitleStyle={{color: 'black'}}
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/Images/er-heihuzhuanqu.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#FFE059'}]}
                                                         source={require('../../res/Images/er-heihuzhuanqu1.png')}/>}
                        onPress={() => {
                            this.setState({selectedTab: 'tb_black'});
                            this.props.navigation.setParams({title: '黑户专区'})
                        }}
                    >
                        <Black/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_long'}
                        title="长周期"
                        selectedTitleStyle={{color: 'black'}}
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/Images/er-changzhouqi.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#FFE059'}]}
                                                         source={require('../../res/Images/er-changhzouqi2.png')}/>}
                        onPress={() => {
                            this.setState({selectedTab: 'tb_long'});
                            this.props.navigation.setParams({title: '长周期'})
                        }}
                    >
                        <Long/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_high'}
                        title="高额度"
                        selectedTitleStyle={{color: 'black'}}
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/Images/er-gaoedu.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#FFE059'}]}
                                                         source={require('../../res/Images/ergaoeedu1.png')}/>}
                        onPress={() => {
                            this.setState({selectedTab: 'tb_high'});
                            this.props.navigation.setParams({title: '高额度'})
                        }}
                    >
                        <High/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_low'}
                        title="低利率"
                        selectedTitleStyle={{color: 'black'}}
                        renderIcon={() => <Image style={styles.image}
                                                 source={require('../../res/Images/er-dililv.png')}/>}
                        renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#FFE059'}]}
                                                         source={require('../../res/Images/er-dililv1.png')}/>}
                        onPress={() => {
                            this.setState({selectedTab: 'tb_low'});
                            this.props.navigation.setParams({title: '低利率'})
                        }}
                    >
                        <Low/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 24,
        height: 24
    },
});
