import React , {Component} from 'react';
import { StyleSheet , View , TextInput , Text , Image} from 'react-native';

let Dimensions = require('Dimensions')
let {width} = Dimensions.get('window'); 

export default class App extends Component{
  render(){
    return(
        <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder='🔍搜索'
                    clearButtonMode='always'
                />
            </View>
            <View style={styles.LeftStyle}>
                <Image 
                    source={require('.././src/drawable/image00.png')}
                    style={styles.imageStyle}/>
                <Text style={styles.textStyle}>反馈</Text>
            </View>
        </View> 
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop:2,
        marginBottom:2,
    },
    textInputStyle:{
        backgroundColor:'white',
        width:width*0.85,
        alignItems:'flex-start'
    },
    LeftStyle:{
        marginTop:5,
        marginLeft:5
    },
    imageStyle:{
        width:width*0.1,
        height:30,
    },
    textStyle:{
        fontSize:10,
    }
})

