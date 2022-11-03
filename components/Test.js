import React, { useState } from 'react'
import { Button, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { postResult } from '../api/api';

export const Test = ({ word, setPage }) => {
  const [answer, setAnswer] = useState([]);
  const [radio, setRadio] = useState('');

  const addAnswer = () => {
    const data = {
      word: word.translateWord,
      rightAnswer: radio === word.word
    }

    setAnswer(state => ([...state, data]));
  }

  const timeAnswer = new Date().toLocaleString();

  if (answer.length === 10) {
    const result = {
      answers: answer,
      time: timeAnswer
    }
    postResult(result)
  }

  return (
    <View style={styles.view}>
      <View>
        <Text style={styles.textSubTitle}>{`${answer.length + 1}/10`}</Text>
        <Text style={styles.textTitle}>{word.translateWord}</Text>
      </View>
      <View style={styles.viewButtons}>
        <View style={styles.viewButton}>
          <Button
            title={word.check1}
            onPress={() => setRadio(word.check1)}
          />
        </View>
        <View style={styles.viewButton}>
          <Button
            title={word.check2}
            onPress={() => setRadio(word.check2)}
          />
        </View>
        <View style={styles.viewButton}>
          <Button
            title={word.check3}
            onPress={() => setRadio(word.check3)}
          />
        </View>
        <View style={styles.viewButton}>
          <Button
            title={word.check4}
            onPress={() => setRadio(word.check4)}
          />
        </View>
      </View>

      {answer.length === 10 && <Navigate replace to="/result" />}
      <Button
        disabled={radio === ''}
        title={answer.length !== 9 ? 'Відповісти' : 'Закінчити тест'}
        onPress={() => {
          setPage();
          addAnswer();
          setRadio('')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 30,
  },
  textSubTitle: {
    alignSelf: 'flex-end',
    marginRight: 30,
  },
  viewButtons: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  viewButton: {
    width: '45%',
    marginBottom: 20,
  }
})