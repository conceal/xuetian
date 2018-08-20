import React , { Component } from 'react';
import {AppRegistry , View , Text , Image , StyleSheet , Button} from 'react-native';

export default class MainScreen extends Component {
    static navigationOptions = {
        tabBarLabel:'Home',
        tabBarIcon:({tintColor}) => (
            <Image source={{uri:'http://img.mp.itc.cn/upload/20170803/20cf093c0ce5432aa07edd0c11011193_th.jpg'}} style={[styles.icon , {tintColor:tintColor}]}/>
        ),
    };

    render(){
        const {navigate} = this.props.naviagation;
        return(
            <Button
                onPress={()=> navigate('Second')}
                title='Go to Second'
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

