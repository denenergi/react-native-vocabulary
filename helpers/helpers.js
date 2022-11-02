export default function shuffle(array) {
  const shuffleArr = (array.sort(() => Math.random() - 0.5)).slice(0, 11);

  function random4Words(word) {
    const arr = [];
    arr.push(word);
    const shuffleArr = (array.sort(() => Math.random() - 0.5)).slice(0, 11);

    let count = 0;
    while (arr.length < 4) {
      if ((arr.every(item => item.id !== shuffleArr[count].id)) === true) {
        arr.push(shuffleArr[count])
      }
      count++;
    }

    return arr.sort(() => Math.random() - 0.5);
  }

  const newArray = [];

  for (let i = 0; i < shuffleArr.length; i++) {
    const shuffleWords = random4Words(shuffleArr[i]);
    newArray.push({
      ...shuffleArr[i],
      check1: shuffleWords[0].word,
      check2: shuffleWords[1].word,
      check3: shuffleWords[2].word,
      check4: shuffleWords[3].word,
    })
  }
  return newArray;
}