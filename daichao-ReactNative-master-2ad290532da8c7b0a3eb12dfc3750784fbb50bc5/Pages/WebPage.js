import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    WebView, StatusBar
} from 'react-native'

export default class WebPage extends Component{
    static navigationOptions={
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center'
        },
        headerRight: (
            <View/>
        ),
        headerStyle:{
            marginTop:StatusBar.currentHeight
        }
    };
    constructor(props){
        super(props);
        this.url=this.props.url;
        this.state={
            url:this.url,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <WebView
                    style={{width:'100%',height:'100%'}}
                    source={{uri:this.state.url}}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
});