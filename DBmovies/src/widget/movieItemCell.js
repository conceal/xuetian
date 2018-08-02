import React, {Component} from 'react';
import {TouchableHighlight, View, Image, Text, StyleSheet} from 'react-native';
import Color from "../common/color";

export default class MovieItemCell extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    let {movie} = this.props;
    let hasAverageScore = (movie.rating.average !== 0);
    // let {navigate} = this.props.navigation;
    return (
      <View>
        <View style={styles.container}>
          <Image
            source={{uri: movie.images.large}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
            {
              hasAverageScore ?
                (<View style={styles.horizontalView}>
                  <Text style={styles.titleTag}>评分：</Text>
                  <Text style={styles.score}>{movie.rating.average}</Text>
                </View>) :
                (<View style={styles.horizontalView}>
                  <Text style={styles.titleTag}>暂无评分</Text>
                </View>)
            }
            <View style={styles.horizontalView}>
              <Text style={styles.titleTag}>导演：</Text>
              <Text style={styles.name}>{movie.directorNames}</Text>
            </View>
            <View style={styles.horizontalView}>
              <Text style={styles.titleTag}>主演：</Text>
              <Text style={styles.name}>{movie.actorNames}</Text>
            </View>
          </View>
        </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Color.separatorColor
  },
  thumbnail: {
    width: 110,
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'left',
  },
  year: {
    textAlign: 'left',
    color: '#777777',
    marginTop: 10,
  },
  horizontalView: {
    flexDirection: 'row',
    marginTop: 10
  },
  titleTag: {
    color: '#666666',
  },
  score: {
    color: '#ff8800',
    fontWeight: 'bold',
  },
  name: {
    color: '#333333',
    flex: 1
  },
});