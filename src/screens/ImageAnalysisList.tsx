import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const MAX_ITEMS =15;
interface FlatListType  {
  id:number,
  defect: string, 
  elem2: number, 
  percentage: number, 
  feedback: string|any,
  isSelected: boolean
}
export const ImageAnalysisList = () => {
  
  const [feedbackItem, setFeedbackItem ]= useState<string[]>([]);
  const [flatListData, setFlatListData] = useState<FlatListType[]> ([]);

  useEffect(() => {
    const data = [] ;
    const feedback = Array(MAX_ITEMS).fill('');
    setFeedbackItem(feedback); 
    for (var i=0 ; i< MAX_ITEMS; i++) {
      const defect = 'Defect '+i+ ' header';
      const percent = Math.round(Math.random()*1000)/10 ;
      const item = { id:i,defect: defect, elem2: 200, percentage: percent, feedback: feedback[i], isSelected: false}
      data.push(item) ;
    }
    setFlatListData(data);
    console.log('useEffect data: ', data[0]);
  }, []);

  const onItemPress = (item: FlatListType, index: number) => {
    item.isSelected = !item.isSelected;
    const newSelected = flatListData.map((elem) => elem.id === item.id ? item: {...elem,isSelected:false});
    setFlatListData(newSelected);
  }
  const onChangeInput = (index:number, value:string) => {
    const newFeedback = [...feedbackItem];
    newFeedback[index] = value;
    setFeedbackItem(newFeedback);
  }
  const SecondColumn = (element:any) => {
    const {item } = element;
    return (
      <View style={[[styles.aColoum, { flex: 2 }]]}>
        <View style={{ height: "50%" }}>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={styles.textLabel} >Type </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text numberOfLines={1} style={styles.textContent} >{item.defect}</Text>
          </View>
        </View>
        <View style={{ height: "50%" }}>
          <View style={{ flexDirection: 'row', padding: 1, }}>
            <View style={styles.midColumn}>
              <View style={{ height: '50%', alignItems: 'center' }}>
                <Text numberOfLines={1} style={styles.textLabel2}>Unknown</Text>
                <Text numberOfLines={1} style={styles.textLabel2}>Label</Text>
              </View>
              <View style={{ height: '50%' }}>
                <Text style={styles.textContent} >{item.elem2}</Text>
              </View>
            </View>
            <View style={styles.midColumn}>
              <View style={{ height: '50%', justifyContent: 'center' }}>
                <Text style={styles.textLabel} >%</Text>
              </View>
              <View style={{ height: '50%' }}>
                <Text style={styles.textContent} >{item.percentage}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  const renderElements = (element:any) => {
    const { item, index } = element ;
    return (
      <TouchableOpacity
        onPress={() => onItemPress(item, index)}
      >
        <View style={styles.itemContainer}>
          <View style={[styles.aColoum, { flex: 1.5, justifyContent: 'center' }]}>
            <Image
              style={styles.imageItem}
              source={require('../assets/bean0.jpg')} />
          </View>
          <SecondColumn item={item}/>
          <View style={[styles.aColoum, { flex: 3, borderLeftWidth: 0.5, borderColor: 'black' }]}>
            <Text style={styles.textLabel} >Feedback</Text>
            <View style={styles.paramViewInput}>
              <TextInput
                style={styles.paramTextInput}
                onChangeText={(text) => onChangeInput(index, text)}
                value={feedbackItem[index]}
                multiline={true}
                blurOnSubmit={true}
                placeholder="Your feedback goes here ..."
                onSubmitEditing={() =>console.log('> onSubmitEditing on index:', index)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // main component
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={flatListData}
        renderItem={({ item, index }) => renderElements({ item, index })}
        keyExtractor={(item,index) => index.toString()}
        contentContainerStyle={{ borderRadius: 6 }}
      />
    </SafeAreaView>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',    
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
  },
  aColoum: {
    flexDirection: 'column',
    paddingVertical: 1,
  },
  imageItem: {
    width: 80, 
    height: 80 ,
  },
  textLabel: {
    color: 'black' ,
    fontSize: 10,
  },
  textLabel2: {
    color: 'black' ,
    fontSize: 10,
    lineHeight: 10,
  },
  textContent: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold'
  },
  paramViewInput: {
    flexDirection: 'row',
    marginTop: 2,
    marginLeft: 1,
  },
  paramTextInput: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 11,
  },
  midColumn: { 
    flexDirection: 'column', 
    borderWidth: 0.5, 
    width: "50%", 
    alignItems: 'center' }
});
