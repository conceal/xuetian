// import React, {Component} from 'react';
// import {TouchableHighlight, View, Image, Text, StyleSheet , ActivityIndicator} from 'react-native';
// import Color from "../common/color";

// export default class MovieItemCell extends Component {
 
//   render() {
//     if(!this.state.loaded){
//       return this.renderLoadingView()
//     }
//     let film = this.state.film;
//     let movie = this.props;
//     return(
//       <View>
//         <View style={styles.container}>
//           <Image style={styles.imageStyle}  source={{uri:movie.images.large}}/>
//           <View style={styles.rightContainer}>
//             <Text style={styles.titleStyle}>{movie.title}</Text>
//             <Text style={styles.yearStyle}>{movie.year}</Text>
//             {
//               movie.rating.average != 0 ? 
//               (
//                 <View style={style.horizontalView}>
//                   <Text style={styles.titleTagStyle}>评分：</Text>
//                   <Text style={styles.scoreStyle}>{movie.rating.average}</Text>
//                 </View> 
//               ) : (
//                 <View style={styles.horizontalView}>
//                     <Text style={styles.titleTagStyle}>暂无评分</Text>
//                 </View>
//               )
//             }
//             <View style={styles.horizontalView}>
//               <Text style={styles.titleTagStyle}>导演：</Text>
//               <Text style={styles.name}>{movie.directorNames}</Text>
//             </View>
//             <View style={styles.horizontalView}>
//                 <Text style={styles.titleTagStyle}>主演：</Text>
//                 <Text style={styles.name}>{movie.actorNames}</Text>
//             </View>
//             <View style={styles.horizontalView}>
//               <Text style={styles.titleTagStyle}>类型：</Text>
//               <Text style={styles.name}>{this.state.movieType}</Text>
//             </View>
//             <View style={styles.horizontalView}>
//               <Text styles={styles.titleTagStyle}>国家/地区：</Text>
//               <Text style={styles.name}>{this.state.country}</Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.container}>
//             <Text style={styles.wishLabel}>想看({film.wish_count})</Text>
//             <Text style={styles.wishLabel}>看过({film.collect_count})</Text>
//         </View>
//         <View style={styles.summaryContainer}>
//             <Text style={styles.titleStyle}>剧情简介</Text>
//             <Text style={styles.summaryStyle}>{film.summary}</Text>
//         </View>
//       </View>
//     )
//   }
//   renderLoadingView = ()=> {
//     return(
//       <View style={styles.loadingStyle}>
//         <ActivityIndicator animating={true} size='small'/>
//         <Text style={styles.loadTextStyle}>努力加载中</Text>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//     flexDirection:'row',
//     justifyContent:'center',
//   },
//   rightContainer:{
//     flex:1,
//     flexDirection:'row',
//     paddingLeft:5,
//     paddingTop:5,
//     paddingBottom:5,
//   },
//   titleStyle:{
//     fontSize:16,
//     fontWeight:'bold',
//     color:'#333333',
//     textAlign:'left',
//   },
//   yearStyle:{
//     textAlign:'left',
//     color:'#777777',
//     marginTop:10,
//   },
//   horizontalView:{
//     flexDirection:'row',
//     marginTop:10,
//   },
//   titleTagStyle:{
//     color:'#666666'
//   },
//   scoreStyle:{
//     color:'#ff8800',
//     fontWeight:'bold',
//   },
//   name:{
//     color:'#333333',
//     flex:1,
//   },
//   wishLabel:{
//     fontSize:16,
//     color:'#444444',
//     marginTop:10,
//     marginBottom:10,
//     marginLeft:20,
//     marginRight:20,
//   },
//   summaryContainer:{
//     marginTop:10,
//     backgroundColor:'#F5FCFF',
//     padding:5
//   },
//   summaryStyle:{
//     marginTop: 10, 
//     lineHeight: 30, 
//     fontSize: 15
//   },
//   loadingStyle:{
//     flex:1,
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems:'center',
//   },
//   loadTextStyle:{
//     color:'#666666',
//     paddingLeft:10,
//   },
  
// })