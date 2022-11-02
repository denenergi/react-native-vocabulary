import React from 'react';
import { View, Text, Button } from 'react-native';
import { getWords } from '../api/api';
import { Test } from '../components/Test';
import shuffle from '../helpers/helpers';

export default function Quiz() {
  const [shuffleWords, setShuffleWords] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [startQuiz, setStartQuiz] = React.useState(false);

  // React.useEffect(() => {
  //   getWords().then(res => setShuffleWords(shuffle(res))).finally(() => setStartQuiz(true))
  // }, [startQuiz]);

  function start() {
    getWords().then(res => setShuffleWords(shuffle(res))).then(() => setStartQuiz(true))
  }

  const handlerAnsver = () => {
    setPage(state => state + 1)
  }

  return (
    <View>
      <Text>Перевірка слів</Text>
      <Button
        title='Start quiz'
        onPress={() => start()}
      />
      <View>
      {startQuiz && <Test word={shuffleWords[page]} setPage={handlerAnsver} />}
      </View>
    </View>
  )
}