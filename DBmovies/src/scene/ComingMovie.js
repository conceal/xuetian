import React , {Component} from 'react';
import {StyleSheet , View ,  Text , FlatList , ActivityIndicator , TouchableOpacity} from 'react-native';
import {queryMovies , comingMovies} from '../common/services'
import MovieItemCell from '../widget/movieItemCell';

export default class PlayingMovies extends Component{
    constructor(props) {
        super(props);
        this.state = {
            movieList:[],   //电影列表数据源
            loaded:false,   //又来控制loading的显示 
        }
    }

    render(){
        if(!this.state.loaded){
            return(
                <View style={styles.loadingView}>
                    <ActivityIndicator animating={true} size="small"/>
                    <Text style={{color:'#666666' , paddingLeft:10}}>努力加载中</Text>
                </View>
            )
        }
        return(
            <FlatList 
                data={this.state.movieList}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
            />
        )
    }

    renderItem = (item) => {
        return (
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Details' , {movie:item.item})}>
                <MovieItemCell movie={item.item}/>
            </TouchableOpacity>
        )
    }


    //根据routeName来判断当前是哪一个界面，react-navigation可以通过navigation.state.routeName来获取
    componentDidMount(){
            this.loadComingMovies();
    }

    /**
     * 获取正在热映的电影的网络数据
     */
    loadComingMovies(){
        let that = this;
        fetch(comingMovies('北京' , 0 , 20))
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if(json == null) {
                    that.setState({
                        loaded:true,
                    });
                    return
                }
                let movies = [];
                for(let idx in json.subjects) {
                    let movieItem = json.subjects[idx];
                    let directors = "";
                    for(let index in movieItem.directors) {
                        let director = movieItem.directors[index];
                        if(directors === ""){
                            directors = directors + director.name;
                        }else{
                            directors = directors + " " + director.name;
                        }
                    }
                     movieItem["directorNames"] = directors;
  
        let actors = "";
        for (let index in movieItem.casts) {
          let actor = movieItem.casts[index];
          if (actors === "") {
            actors = actors + actor.name
          } else {
            actors = actors + " " + actor.name
          }
        }
                    movieItem["actorNames"] = actors;
                    movies.push(movieItem);
                }
                that.setState({
                    movieList:movies,
                    loaded:true,
                })
            }).catch((error) => {
                console.log("加载失败");
                that.setState({
                    loaded:true,
                })
            }).done();
    }
}

const styles = StyleSheet.create({
    loadingView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
    }
})