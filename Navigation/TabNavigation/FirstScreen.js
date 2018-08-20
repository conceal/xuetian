import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button,
    StyleSheet,
    Image,
} from 'react-native';

export default class DrawerMainScreen extends React.Component {
    static navigationOptions={
        tabBarLabel:'Home',
      
    }
    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Second')}
                title="Go to Second"
            />
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});
