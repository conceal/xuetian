import React, { Component } from 'react';
import {View,Switch,StyleSheet } from 'react-native';

export default class SwitchTest extends Component {
    constructor(props) {
        super(props);
        this.state ={
            switchState: true,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Switch value={this.state.switchState}
                        onTintColor='#FFD700'
                        thumbTintColor='white'
                        onValueChange={ (value) => this.setState({switchState:value})}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        flex: 1
    },
});