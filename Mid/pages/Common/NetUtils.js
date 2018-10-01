export default class NetUtils {
  fetchData(url, data){
    return new Promise((resolve, reject)=> {
      fetch(url,{
        method:'Post',
        body:JSON.stringify(data),
        credentials:'include',
      })
          .then((response)=> response.json())
          .then((result)=> {
            resolve(result);  //处理获取到的数据
          })
          .catch((error)=> {
            reject(error);  //错误处理
          })
    })
  }
}
