export default class NetUtils {
    fetchNetRepository(url,data){
        return new Promise((resolve,reject)=>{
            fetch(url,{
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include'
            })
                .then(response=>response.json())//解析方式arrayBuffer、json、text、blob、formData
                .then(result=>{
                    resolve(result);//获取到的数据处理
                })
                .catch(error=>{
                    reject(error);//错误处理
                })
        })
    }
}