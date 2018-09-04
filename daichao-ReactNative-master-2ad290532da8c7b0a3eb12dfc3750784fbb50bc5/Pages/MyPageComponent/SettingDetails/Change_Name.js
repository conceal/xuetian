import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Dimensions
} from 'react-native';
import * as ScreenUtils from "../../Common/ScreenUtils";
let width = Dimensions.get('window');
export default class Change_Name extends Component {
    static navigationOptions = ({navigation}) =>({
        headerTitle: '修改昵称',
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center'
        },
        headerRight: (
            <TouchableOpacity
                onPress={()=>navigation.state.params.navigatePress()}
            >
                <Text style={{color:'black',fontSize:ScreenUtils.setSpText(18),marginRight:ScreenUtils.scaleSize(25)}}>完成</Text>
            </TouchableOpacity>
        ),
        headerStyle: {
            marginTop: StatusBar.currentHeight
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            switchState: true,
        };
    }
    componentDidMount(){
        this.props.navigation.setParams({navigatePress:this._complete})
    }
    _complete =()=> {
        const { navigate } = this.props.navigation;
        navigate('Setting');
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='white'
                />
                <TextInput
                    style={styles.input}
                    placeholder='请输入昵称'
                    clearButtonMode='always'
                    underlineColorAndroid='transparent'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6'
    },
    input:{
        backgroundColor:'white',
        padding:ScreenUtils.scaleSize(20),
        height:ScreenUtils.scaleSize(90),
        width:0.9*width,
        marginTop:ScreenUtils.scaleSize(30)
    }
});