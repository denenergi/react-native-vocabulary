import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getResult } from '../api/api';
import SelectList from 'react-native-dropdown-select-list'

export default function Results() {
  const [results, setResults] = React.useState([]);
  const [selected, setSelected] = React.useState('');
  const [result, setResult] = React.useState([]);
  const [errorMesage, setErrorMesage] = React.useState();

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     getResult().then(res => setResults(res)).catch(error => setErrorMesage(error));
  //   }, 300)
  // }, []);

  React.useEffect(() => {
    const res = results.find(el => el.time === selected);

    if (selected !== '' && res !== undefined) {
      setResult(res.answers);
    }
  }, [selected]);

  const z = () => {
    return getResult().then(res => setResults(res)).catch(error => setErrorMesage(error))
  }

  return (

    <View style={styles.view}>
      <View style={styles.selectList}>
        <SelectList
          setSelected={setSelected}
          data={results.map(el => el.time)}
          placeholder={'Select the result'}
          search={false}
          onPress={() => z()}
        />
      </View>
      {result.length > 0 &&
        <FlatList
          data={result}
          renderItem={({ item }) => (
            <Text
              keyExtractor={(item) => item.id}
              item={item}
              style={[styles.result, { backgroundColor: item.rightAnswer ? 'green' : 'red' }]}
            >
              {item.word}
            </Text>
          )}
        />
      }
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
  result: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 5
  },
  selectList: {
    marginBottom: 40,

  }
});