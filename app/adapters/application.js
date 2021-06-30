import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = 'http://localhost';

  get headers() {
    return {
      'MU-TAB-ID': window.identifier,
    };
  }
}
