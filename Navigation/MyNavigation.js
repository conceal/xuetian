import React , {Component } from 'react';
import {StyleSheet , Text} from 'react-native';
import {TabNavigator} from 'react-navigation';
import FirstScreen from './TabNavigation/FirstScreen';
import SecondScreen from './TabNavigation/SecondScreen';
import { DrawerItems , SafeAreaView} from 'react-navigation';
 
export default TabNavigator( 
    {
        First:{
            screen:FirstScreen,
        },
        Second:{
            screen:SecondScreen,
        },
    },
    {
        tabBarOptions:{
            showIcon:true
        },
    }
)


// const CustomDrawerContentComponent = (props) => (
//     <ScrollView>
//       <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
//         <DrawerItems {...props} />
//       </SafeAreaView>
//     </ScrollView>
//   );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });