import React , { Component } from 'react';
import {ListView , View , Image , Text , StyleSheet , TouchableOpacity} from 'react-native';

var ImageData  = require ('./Demo.json');


export default class listView extends Component {
    
    constructor(props) {
        super(props);
        var getSectionData = (dataBlob , sectionID) => {
            return dataBlob[sectionID];
        };
        var getRowData = (dataBlob , sectionID , rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        }
        this.state={
            datasource:new ListView.DataSource({
                getSectionData:getSectionData,
                getRowData:getRowData,
                rowHasChanged:(r1 , r2) => r1 !== r2,
                sectionHeaderHasChanged:(s1 , s2) => s1 !== s2,
            })
        }
    }
    
    render() {
        return(
            <View style={styles.container}>
                {/*头部*/}
                <View style={styles.headerStyle}>
                    <Text style={styles.headTextStyle}>图片展示</Text>
                </View>
                <ListView
                    dataSource={this.state.datasource}
                    renderRow={(rowData)=>this.renderRow(rowData)}
                    renderSectionHeader={this.renderSectionHeader}
                
                />
                {/* <Text>niahodafgvrdfgrstghverdergh4trbfserh</Text> */}
            </View>

        );
    };

    renderSectionHeader(SectionData , sectionID){
        return(
            <View style={styles.headStyle}>
                <Text style={{marginLeft:5}}>{SectionData}</Text>
            </View>
        )
    }

    renderRow(rowData, sectionID, rowID) {
        return (
              <TouchableOpacity>
                  <View style={styles.rowStyle}>
                      <Image source={{uri:rowData.icon}} style={styles.rowImageStyle}/>
                      <Text style={styles.nameStyle}>{rowData.name}</Text>
                  </View>
              </TouchableOpacity>
        )
    }
    componentDidMount(){
        this.loadData();
    }

    loadData = ()=> {
        //拿到json数据中的data数组
        let JsonData = ImageData.data;
        //定义变量
        let dataBlob = {},   //dataBlob相当于一个对象
            sectionIDs = [],
            rowIDs = [],
            images = [];  //    一组image数组
            //遍历数组中对应的数据并存入相应的变量内
            for(var i = 0 ; i < JsonData.length ; i++) {
                //1、将组号存在sectionIDs中
                sectionIDs.push(i);
                //2、将每组头部需要的内容存在dataBlob中
                dataBlob[i] = JsonData[i].title;
                //3、取出这一组所有的数据
                images = JsonData[i].images;
                rowIDs[i] = [];
                for(var j = 0 ; j < images.length ; j++) {
                    rowIDs[i].push(j);
                    dataBlob[i+':'+j] = images[j];
                }

            };

            this.setState({
                datasource:this.state.datasource.cloneWithRowsAndSections(dataBlob , sectionIDs , rowIDs)
            });
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        height:64,
        backgroundColor:'orange',
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        flex:1
    },
    headStyle:{
        height:20,
        backgroundColor:'#e8e8e8',
        justifyContent:'center',
    },
    headTextStyle:{
        fontSize:15,
        color:'white',
    },
    sectionStyle:{
        backgroundColor:'#e8e8e8',
        height:25,
        justifyContent:'center'
    },
    sectionTextStyle:{
        marginLeft:10,
    },
    rowStyle:{
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'#e8e8e8',
    },
    rowImageStyle: {
        width:100,
        height:100
    },
    nameStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:5,
        color:'red'
    }
})