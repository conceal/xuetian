import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Dimensions,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import NetUtils from "./Common/NetUtils";
let {width} = Dimensions.get('window');
let {height} = Dimensions.get('window');
let url ='http://47.98.148.58/app/dcPublic/checkInfoChange.do';
export default class GuidePage extends Component{
    constructor(props){
        super(props);
        this.utils = new NetUtils;
        this.state={
            img1:'',
            img2:'',
            img3:''
        }
    }
    componentDidMount(){
        this.onLoad()
    }
    onLoad() {
        this.utils.fetchNetRepository(url)
            .then(result => {
                this.setState({
                    img1:result.data.yindaoye1,
                    img2:result.data.yindaoye2,
                    img3:result.data.yindaoye3
                });
            })
    }
    render(){
        return(
            <View style={{height:height,width:width}}>
                <Swiper
                    style={styles.wrap}
                    loop={false}
                    autoplay={false}
                    horizontal={true}
                    paginationStyle={{bottom:30}}
                    dotStyle={styles.notactive}
                    activeDotStyle={styles.active}
                >
                    <Image resizemode={'contain'} style={styles.image} source={{uri:this.state.img1}}/>
                    <Image resizemode={'contain'} style={styles.image} source={{uri:this.state.img2}}/>
                    <ImageBackground
                        style={styles.image}
                        source={{uri:this.state.img3}}
                    >
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={()=>this.props.navigation.replace('First')}
                            style={styles.button}
                        >
                            <View>
                                <Text>立即体验</Text>
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>
                </Swiper>
            </View>

        )
    }
}
const styles= StyleSheet.create({
    wrap:{
    },
    image:{
        width:width,
        height:height,
        flex:1,
        flexDirection:'column-reverse',
        alignItems:'center',
        paddingBottom:30
    },
    button:{
        backgroundColor:'#FFE059',
        borderRadius:10,
        width:width/2,
        height:45,
        marginBottom:36,
        alignItems:'center',
        justifyContent:'center'
    },
    notactive: {
        backgroundColor:'gray',
        height:10,
        width:10,
        borderRadius:5,
    },
    active: {
        backgroundColor:'#FFE059',
        height:10,
        width:23,
        borderRadius:5,
    },
});