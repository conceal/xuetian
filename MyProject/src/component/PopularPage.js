import React, {Component} from 'react';
import {StyleSheet, Text, View , ListView , RefreshControl} from 'react-native';
import DataRepository from '../widget/Network';
import ScrollableTabView , {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import RepositoryCell from '../widget/RepositoryCell';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';

export default class PopularPage extends Component {
  render() {
    return (
        <ScrollableTabView
            tabBarBackgroundColor="#2196F3"
            tabBarInactiveTextColor='mincream'
            tabBarActiveTextColor='white'
            tabBarUnderlineStyle={{backgroundColor:'#e7e7e7' , height:2}}
            renderTabBar={()=><ScrollableTabBar/>}
        >
          <PopularTab tabLabel="Java">JAVA</PopularTab>
          <PopularTab tabLabel="iOS">IOS</PopularTab>
          <PopularTab tabLabel="Android">Android</PopularTab>
          <PopularTab tabLabel="JavaScript">JS</PopularTab>

        </ScrollableTabView>
    );
  }
}

class PopularTab extends Component{
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state ={
      jsonData:' ',
      dataSource:new ListView.DataSource({rowHasChanged:(r1 , r2) => r1!==r2}),
      isLoading:false,
    }
  };

  componentDidMount(){
    this.loadData();
  }
  loadData = ()=>{
    this.setState({
      isLoading: true,
    })
    let url = URL+this.props.tabLabel+QUERY_STR;
    this.dataRepository.fetchNetRepository(url)
        .then((jsonData)=>{
          this.setState({
            dataSource:this.state.dataSource.cloneWithRows(jsonData.items),
            isLoading:false,
          })
        })
        .catch((error)=> {
          console.log(error);
        })
    }
    render(){
      return(
          <View style={{flex:1}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(data)=>this.renderRow(data)}
              refreshControl={
                <RefreshControl
                    refreshing={this.state.isLoading}
                    onRefresh={()=>this.loadData()}
                    colors={['#2196F3']}
                    tintColor={'#2196F3'}
                    title={'loading....'}
                    titleColor={'#2196F3'}
                />
              }
            />
          </View>
      )
    }

    renderRow(data){
      return(
          <RepositoryCell data={data}/>
    )
    }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  tips:{
    fontSize:30,
  }
})
