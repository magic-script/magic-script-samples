import key from './GooglePolyApiKey.js';

export default function query (keywords) {
  let pageToken = '';
  return {
    async next () {
      let response = await fetch(makeSearchURL(key, keywords, pageToken));
      if (response.status >= 400) {
        throw new Error(`Response invalid ( ${response.status} )`);
      }
      let data = await response.json();
      if (!data) {
        return { done: true };
      }
      if (data.error) throw new Error(data.error);
      pageToken = data.nextPageToken;
      return {
        done: false,
        value: data
      };
    },
    [Symbol.asyncIterator] () { return this; }
  };
}

// Returns a query URL based on the given data...
function makeSearchURL (key, keywords, pageToken) {
  var baseURL = 'https://poly.googleapis.com/v1/assets?';
  var url = baseURL + 'key=' + encodeURIComponent(key);
  url += '&curated=true';
  url += '&pageSize=30';
  url += '&maxComplexity=MEDIUM';
  url += '&orderBy=BEST';
  url += '&format=OBJ';
  if (keywords) {
    url += '&keywords=' + encodeURIComponent(keywords);
  }
  if (pageToken) {
    url += '&pageToken=' + pageToken;
  }
  print('query url', url);
  return url;
}
