import React , {Component} from 'react';
import {
    StyleSheet ,
    View ,
    TextInput ,
    Image,
    TouchableOpacity
} from 'react-native';
import * as ScreenUtils from "../Common/ScreenUtils";

let Dimensions = require('Dimensions');
let {width} = Dimensions.get('window');

export default class SearchInputPart extends Component{
    constructor(props){
        super(props);
        this.state={
            text:null
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='搜索'
                        clearButtonMode='always'
                        underlineColorAndroid='transparent'
                        onChangeText={(text)=>this.setState({text:text})}
                        onSubmitEditing={()=>this.props.navigation.navigate('SearchPage',{text:this.state.text})}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
    },
    textInputStyle:{
        backgroundColor:'#F3F4F6',
        width:ScreenUtils.scaleSize(610),
        alignItems:'flex-start',
        height:ScreenUtils.scaleSize(74),
        borderRadius:ScreenUtils.scaleSize(7),
        justifyContent:'center',
        paddingTop:ScreenUtils.scaleSize(10),
        marginRight:ScreenUtils.scaleSize(32)
    },
    textStyle:{
        fontSize:10,
        alignItems:'center',
        justifyContent:'center'
    }
});