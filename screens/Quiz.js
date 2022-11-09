import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { getWords } from '../api/api';
import { Test } from '../components/Test';
import shuffle from '../helpers/helpers';

export default function Quiz({ navigation }) {
  const [shuffleWords, setShuffleWords] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [startQuiz, setStartQuiz] = React.useState(false);

  function start() {
    getWords().then(res => setShuffleWords(shuffle(res))).finally(() => setStartQuiz(true));
  }

  const handlerAnsver = () => {
    setPage(state => state + 1)
  }

  const zeroing = () => {
    setPage(0);
    setStartQuiz(false);
  }

  return (
    <View style={styles.view}>
      {startQuiz
        ? <Test word={shuffleWords[page]} setPage={handlerAnsver} navigation={navigation} zeroing={zeroing} startQuiz={startQuiz}/>
        : <View style={styles.buttonStart}>
            <Button
              title='      Start quiz      '
              onPress={() => start()}
            />
        </View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 10,
    display: 'flex'
  },
  buttonStart: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '60%',
    marginTop: '80%'
  }
})