import React from 'react';
import Calculator from './src/screens/calculator'
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

 
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
 
          <Calculator></Calculator>
 
      </SafeAreaView>
    </>
  );
};
 
export default App;
