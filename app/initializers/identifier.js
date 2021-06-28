export function initialize(appInstance) {
  // appInstance.inject('route', 'foo', 'service:foo');
  let identifier = new Date().toString();
  appInstance.register('identifier:main', identifier);
  window.identifier = identifier;
}

export default {
  initialize,
};
