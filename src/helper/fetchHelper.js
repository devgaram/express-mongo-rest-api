import fetch from 'node-fetch';

class FetchHelper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  put(url, params = {}, headers = {}) {
    return fetch(`${this.baseURL}${url}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...params,
      }),
      headers: {
        ...headers,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  }

  delete(url, params = {}, headers = {}) {
    return fetch(`${this.baseURL}${url}`, {
      method: 'DELETE',
      body: JSON.stringify({
        ...params,
      }),
      headers: {
        ...headers,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  }
}

export default FetchHelper;
