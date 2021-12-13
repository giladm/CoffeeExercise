import React from 'react';
import { SafeAreaView } from 'react-native';

import { ImageAnalysisList } from "./src/screens/ImageAnalysisList";

const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <ImageAnalysisList />
    </SafeAreaView>
  );
};


export default App;
