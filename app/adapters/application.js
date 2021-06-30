import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  // namespace = 'api';
  host = 'http://localhost';

  buildURL(...args) {
    return `${super.buildURL(...args)}`;
  }

  get headers() {
    return {
      'MU-TAB-ID': window.identifier,
    };
  }
}
