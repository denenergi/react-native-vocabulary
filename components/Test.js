import React, { useState } from 'react'
import { Button, Text, View } from 'react-native';
import { postResult } from '../api/api';

export default function Test({ word, setPage }) {
  const [answer, setAnswer] = useState([]);
  const [radio, setRadio] = useState('');

  const addAnswer = () => {
    const data = {
      word: word.translateWord,
      rightAnswer: radio === word.word
    }

    setAnswer(state => ([...state, data]))
    console.log(data, radio)
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
    <View>
      <Text>123</Text>
      <View>
        <Text>{`слово - ${word.translateWord}`}</Text>
        <Text>{`${answer.length + 1}/10`}</Text>
      </View>
        <Text>Виберіть правильний переклад</Text>
        <View>
          <Button
            title={word.check1}
            onClick={() => setRadio(word.check1)}
          />
          <Button
            title={word.check2}
            onClick={() => setRadio(word.check2)}
          />
          <Button
            title={word.check3}
            onClick={() => setRadio(word.check3)}
          />
          <Button
            title={word.check4}
            onClick={() => setRadio(word.check4)}
          />
        </View>

        {answer.length === 10 && <Navigate replace to="/result" />}
        <Button
          disabled={radio === ''}
          className="button is-info submit-button"
          type="submit"
          onClick={() => {
            setPage();
            addAnswer();
            setRadio('')
          }}
        >
          {answer.length !== 9 ? 'Відповісти' : 'Закінчити тест'}
        </Button>
    </View>
  )
}