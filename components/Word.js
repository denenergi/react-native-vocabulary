import React from 'react';
import { deleteWord } from '../api/api';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Word = ({ word, deleteElement }) => {

  const deleteWordButton = (id) => {
    deleteWord(id).then(() => deleteElement(id));
  };

  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        {word.word}
      </Text>
      <Text> - </Text>
      <Text style={styles.text}>
        {word.translateWord}
      </Text>
      <TouchableOpacity onPress={() => deleteWordButton(word.id)}>
        <Text>
          &#128465;
        </Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center'
  },
  text: {
    width: '35%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    margin: 5,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
})