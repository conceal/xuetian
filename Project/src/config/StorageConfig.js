import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native'

let storage = new Storage({
  //最大容量，默认值1000条数据循环存储
  size:100,

  //存储引擎：对于RN使用AsyncStorage，
  //如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend:AsyncStorage,

  //数据过期时间
  defaultExpires: 1000 * 3600 * 24,

  //读写时在内存中缓存数据，默认开启
  enableCache: true,
});

export default storage;
