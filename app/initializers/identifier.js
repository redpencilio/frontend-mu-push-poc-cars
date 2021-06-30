export function initialize(appInstance) {
  // appInstance.inject('route', 'foo', 'service:foo');
  fetch('uuid')
    .then((response) => response.json())
    .then((data) => {
    window.identifier = data.uuid;
    });
}

export default {
  initialize,
};
