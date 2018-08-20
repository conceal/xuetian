import React , { Component } from 'react';
import {AppRegistry , View , Text , Image , StyleSheet , Button} from 'react-native';

export default class SecondScreen extends Component {
    static navigationOptions = {
        tabBarLabel:'Second',
        tabBarIcon:({tintColor}) => (
            <Image source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} style={[styles.icon , {tintColor:tintColor}]}/>
        ),
    };

    render(){
        return(
            <Button
                onPress={()=> this.props.naviagation.goBack()}
                title='Go back Home'
            />
        );
    }
}


const styles = StyleSheet.create({
    icon:{
        width:26,
        height:26,
    },
});

