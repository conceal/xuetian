import React, { Component } from 'react'
import {
    Text,
    View,
    StatusBar,
} from 'react-native'
import Swiper from 'react-native-swiper'

export default class SwiperDemo extends Component {
    state = {
        animated: true,
        hidden: false,
        backgroundColor:'white',
        translucent:false,
        barStyle:'default',
        // networkActivityIndicatorVisible:false,
        // showHideTransition:'fade',
    }
    render() {
        return (
            <View style={{flex:1}}>
                  <StatusBar
                    animated={this.state.animated}
                    hidden={this.state.hidden}
                    backgroundColor={this.state.backgroundColor}
                    translucent={this.state.translucent}
                    barStyle={this.state.barStyle}
                    networkActivityIndicatorVisible={this.state.networkActivityIndicatorVisible}
                    showHideTransition={this.state.showHideTransition}
                />
                <Swiper style={styles.wrapper} showsButtons={true}>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                        {this.setState({backgroundColor:'#9DD6EB'})}
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                        {this.setState({backgroundColor:'#9DD6EB'})}
                    </View>
                    <View>
                        <Text style={styles.text}>And simple</Text>
                        {this.setState({backgroundColor:'#9DD6EB'})}
                    </View>
                </Swiper>
            </View>
        )
    }
}

const styles = {
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
}