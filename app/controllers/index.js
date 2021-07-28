import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service store;
  @service pushUpdatesWs;
  cars = this.store.findAll('car');

  constructor() {
    super(...arguments);
    this.pushUpdatesWs.addPollCallbackFunction((data, type, realm) => {
      // Push-update for type cache-clear means the cache has cleared and we need to update a variable
      if (
        realm.value === 'http://cache' &&
        type.value === 'http://cache-clear-event' &&
        data.path === '/cars/'
      ) {
        console.log('Checking cars');
        // Clear the local cache of cars
        this.store.unloadAll('car');
        // And reload the cars from the database
        this.set('cars', this.store.findAll('car', { reload: true }));
      }
    });
    this.subscribeToCacheClears();
  }

  subscribeToCacheClears() {
    fetch(`/cache_clear/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'MU-TAB-ID': window.identifier,
      },
      body: JSON.stringify({ path: '/cars/', method: 'GET', query: '' }),
    });
  }
}
