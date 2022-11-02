const BASE_URL = 'https://635a7db56f97ae73a62e37dc.mockapi.io';

function wait(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request(
  url,
  method,
  data,
) {
  const options = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // we wait for testing purpose to see loaders
  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const fetchRequest = {
  get:(url) => request(url),
  post: (url, data) => request(url, 'POST', data),
  delete: (url) => request(url, 'DELETE'),
};

export const getWords = () => {
  return fetchRequest.get(`/words`);
};

export const postWord = (word) => {
  return fetchRequest.post('/words', word);
};

export const deleteWord = (wordId) => {
  return fetchRequest.delete(`/words/${wordId}`);
};

export const getResult = () => {
  return fetchRequest.get(`/results`);
};

export const postResult = (result) => {
  return fetchRequest.post('/results', result);
};