import React from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { getWords, postWord } from '../api/api';
import { Word } from '../components/Word';

export default function Home() {
  const [words, setWords] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [inputWord, setInputWord] = React.useState('');
  const [inputTranslate, setInputTranslate] = React.useState('');
  const [isActiveButton, setIsActiveButton] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (inputWord === '' && inputTranslate === '') {
      setIsActiveButton(true);
    } else if (inputWord !== '' && inputTranslate !== '') {
      setIsActiveButton(false);
    }
  }, [inputWord, inputTranslate]);

  React.useEffect(() => {
    getWords().then(res => setWords(res)).finally(() => setIsLoading(false))
  }, []);

  const addWord = () => {
    newWord = {
      word: inputWord,
      translateWord: inputTranslate
    }

    postWord(newWord).then(() => getWords().then(res => setWords(res)));
    setInputWord('');
    setInputTranslate('');
    setModalVisible(false);
  };

  const deleteWord = (id) => {
    const newArray = words.filter(el => el.id !== id);
    setWords(newArray);
  };

  return (
    <View style={styles.view}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        style={styles.view}
        presentationStyle={'overFullScreen'}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text
              onPress={() => setModalVisible(false)}
              style={styles.modalClose}
            >
              &times;
            </Text>
            <TextInput
              placeholder='Введіть cлово на українській'
              style={styles.textInput}
              onChangeText={text => setInputWord(text.replace(/[^А-Яа-я]/ig, ''))}
              value={inputWord}
            />
            <TextInput
              placeholder='Введіть переклад'
              style={styles.textInput}
              onChangeText={text => setInputTranslate(text.replace(/[^A-Za-z]/ig, ''))}
              value={inputTranslate}
            />
            <Button
              title='Додати задачу'
              disabled={isActiveButton}
              onPress={() => addWord()}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.view}>
        <View style={styles.viewName}>
          <Text style={styles.textName}>word</Text>
          <Text> - </Text>
          <Text style={styles.textName}>translate</Text>
          <Text>
            &#128465;
          </Text>
        </View>
        {isLoading
          ? <ActivityIndicator size="large" />
          : <FlatList
              data={words}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Word word={item} deleteElement={deleteWord} />
              )}
            />
        }
      </View>
      <Button
        title={'Add word'}
        onPress={() => {
          setModalVisible(true)
        }}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingBottom: 10,
  },
  modalView: {
    marginTop: 55,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 201, 232, 0.7)',
  },
  modalContent: {
    backgroundColor: "blue",
    width: '80%',
    height: 200,
    padding: 10,
    borderRadius: 25,
    justifyContent: "space-around"
  },
  modalClose: {
    fontSize: 40,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: -50,
    right: -15
  },
  textInput: {
    backgroundColor: 'white',
    padding: 5,
    height: 30
  },
  textName: {
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
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  viewName: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center'
  },
})
