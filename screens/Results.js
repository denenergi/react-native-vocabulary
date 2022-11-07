import React from 'react'
import { View, Text } from 'react-native';
import { getResult } from '../api/api';
import { Dropdown } from 'react-native-element-dropdown';

export default function Results() {
  const [results, setResults] = React.useState([]);
  const [selected, setSelected] = React.useState();
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);

  React.useEffect(() => {
    getResult().then(res => setResults(res))
  }, []);

  return (
    <View>
      <Text>Результат</Text>
      {/* <View>
        {!!selected && (
          <Text>
            Selected: label = {selected.id} and value = {selected.id}
          </Text>
        )}
        {results.length > 0 && 
        <Dropdown data={results}/>} */}
        {/* <select value={chooseAnswer} onChange={event => setChooseAnswer(event.target.value)} >
          <option>Історія перевірок</option>
          {answers.length > 0 &&
            (answers.map(answer => (
              <option key={answer.time} value={answer.time} >
                {answer.time}
              </option>
            ))
            )
          }
        </select> */}
      {/* </View> */}
      {/* {showAnser !== null && <ResultItem answer={showAnser} />} */}

    </View>


  )
}