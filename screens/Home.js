import React from 'react'
import { View, Text, Button, Modal, StyleSheet, TextInput } from 'react-native'

export default function Home() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [inputWord, setInputWord] = React.useState('');
  const [inputTranslate, setInputTranslate] = React.useState('');
  const [isActiveButton, setIsActiveButton] = React.useState(false);

  React.useEffect(() => {
    if (inputWord === '' && inputTranslate === '') {
      setIsActiveButton(true);
    } else if(inputWord !== '' && inputTranslate !== '') {
      setIsActiveButton(false);
    }
  }, [inputWord, inputTranslate])

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
              onChangeText={text => setInputWord(text)}
              value={inputWord}
            />
            <TextInput
              placeholder='Введіть переклад'
              style={styles.textInput}
              onChangeText={text => setInputTranslate(text)}
              value={inputTranslate}
            />
            <Button
              title='Додати задачу'
              disabled={isActiveButton}
              onPress={() => {
                addTodo({
                  id: uuid.v4(),
                  todo: input,
                }),
                  setInput('')
              }}
            />
          </View>
        </View>
      </Modal>
      <Text>
        Home
      </Text>
      <Button title={'Add word'} onPress={() => setModalVisible(true)} />
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
    flex: 1,
  },
  modalView: {
    marginTop: 55,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 201, 232, 0.1)',
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
  }
})
