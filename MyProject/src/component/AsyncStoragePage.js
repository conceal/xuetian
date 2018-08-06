import React, {Component} from 'react';
import {StyleSheet, Text, View , TextInput , AsyncStorage} from 'react-native';
import  Toast ,{DURATION} from 'react-native-easy-toast';
const KEY = 'text';
export default class AsyncStoragePage extends Component {
  render(){
    return(
        <View style={styles.container}>
          <TextInput
              style={{height:40 , borderWidth:1 , margin:2}}
              onChangeText={text => this.text=text}
          />
          <View style={{flexDirection:'row'}}>
            <Text style={styles.tips} onPress={()=>this.onSave()}>保存</Text>
            <Text style={styles.tips} onPress={()=>this.onRemove()}>移除</Text>
            <Text style={styles.tips} onPress={()=>this.onFetch()}>取出</Text>
          </View>
          <Toast ref={toast=>this.toast=toast}/>
        </View>
    )
  }

  onSave(){
  AsyncStorage.setItem(KEY , this.text , (error)=>{
    if(!error){
        this.toast.show('保存成功' , DURATION.LENGTH_SHORT);
    }else {
        this.toast.show('保存失败' , DURATION.LENGTH_SHORT);
    }
  }
  )
  }

  onRemove(){
    AsyncStorage.removeItem(KEY ,(error)=>{
      if(!error){
        this.toast.show('移除成功' , DURATION.LENGTH_SHORT);
      }else {
        this.toast.show('移除失败' , DURATION.LENGTH_SHORT);
      }
    } )
  }

  onFetch(){
    AsyncStorage.getItem(KEY , (error , result) => {
      if(!error){
        if(result !==' ' && result !== null){
          this.toast.show('取出内容为：' + result);
        }else {
          this.toast.show('取出内容为不存在：')
        }
      }
    })
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  tips:{
    fontSize:29,
    margin: 5,
  }
})


