import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { getResult } from '../api/api';
import SelectList from 'react-native-dropdown-select-list'

export default function Results() {
  const [results, setResults] = React.useState([]);
  const [selected, setSelected] = React.useState('');
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    getResult().then(res => setResults(res))
  }, []);

  React.useEffect(() => {
    const res = results.find(el => el.time === selected);

    if (selected !== '') {
      setResult(res.answers);
    }
  }, [selected]);

  console.log(results)

  return (

    <View>
      <View style={styles.view}>
        <SelectList
          setSelected={setSelected}
          data={results.map(el => el.time)}
          placeholder={'Select the result'}
          search={false}
        />
      </View>
      {/* {result.l}
      <FileList 
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId} /> */}
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
});