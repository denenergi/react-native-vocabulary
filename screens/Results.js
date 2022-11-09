import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getResult } from '../api/api';
import SelectList from 'react-native-dropdown-select-list'

export default function Results({ route }) {
  const [results, setResults] = React.useState([]);
  const [selected, setSelected] = React.useState('');
  const [result, setResult] = React.useState();
  const [setErrorMesage] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const params = route.params;

  React.useEffect(() => {
    if(typeof route.params == 'object') {
      setResult(params?.answer);
    }
  }, [params]);

  React.useEffect(() => {
    onRefresh();
  }, [result])

  React.useEffect(() => {
    getResult().then(res => setResults(res)).catch(error => setErrorMesage(error));
  }, []);

  React.useEffect(() => {
    const res = results.find(el => el.time === selected);

    if (selected !== '' && res !== undefined) {
      setResult(res.answers);
    }
  }, [selected]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getResult().then(res => setResults(res)).then(() => setRefreshing(false));
  }, []);

  return (

    <View style={styles.view}>
      <View style={styles.selectList}>
        <SelectList
          setSelected={setSelected}
          data={results.map(el => el.time)}
          placeholder={'Select the result'}
          search={false}
        />
      </View>
      {result?.length > 0 &&
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