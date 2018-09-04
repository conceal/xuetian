import React,{Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    AsyncStorage
}from 'react-native'
import Root from "./RootPage";
import Root2 from './Root2Page';
export default class WelcomePage extends Component{
    componentDidMount() {
        setTimeout(this.openApp.bind(this),2000);
    }
    openApp(){
        AsyncStorage.getItem('isFirst',(error,result)=>{
            if (result === 'false') {
                this.props.navigator.resetTo({ component:Root }) }
            else { console.log('第一次打开');
                AsyncStorage.setItem('isFirst','false',(error)=>{ if (error) { alert(error); } });
                this.props.navigator.resetTo({ component:Root2 })}});
    }
    render(){
        return<View style={styles.container}>
            <Image style={styles.image}
                   source={require('../res/Images/Launch.png')}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    text:{
        fontSize:20,
        color:'red',
        marginTop:200,
        marginLeft:185,
    },
    image:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:null,
        height:null,
    }
});