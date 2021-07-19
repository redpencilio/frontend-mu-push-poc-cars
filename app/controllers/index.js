import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @service store;
  @service poll;
  id = window.identifier;
  cars = this.store.findAll('car');
  isPolling = false;
  isFetching = false;

  constructor() {
    super(...arguments);
    this.subscribeToCacheClears();
    this.startPolling();
  }

  subscribeToCacheClears(start) {
    fetch(`/cache_clear/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'MU-TAB-ID': window.identifier,
      },
      body: JSON.stringify({ path: '/cars/', method: 'GET', query: '' }),
    });
  }

  @action
  startPolling() {
    if (!this.isPolling) {
      this.isPolling = true;
      this.poll.addPoll({
        interval: 100,
        callback: () => {
          if (!this.isFetching) {
            this.isFetching = true;
            fetch(`/push-update/`, {
              headers: { 'MU-TAB-ID': window.identifier },
            })
              .then((response) => response.json())
              .then((resp) => {
                let type = resp.type;
                let realm = resp.realm;
                if (type) {
                  console.log(`Received push update : ${JSON.stringify(resp)}`);
                  console.log(new Date());
                  let data = resp.data;
                  if (realm.value === 'http://cache') {
                    // Push-update for type cache-clear means the cache has cleared and we need to update a variable
                    if (type.value == 'http://cache-clear-event') {
                      if (data.path === '/cars/') {
                        // Clear the local cache of cars
                        this.store.unloadAll('car');
                        // And reload the cars from the database
                        this.set(
                          'cars',
                          this.store.findAll('car', { reload: true })
                        );
                      }
                    }
                  }
                }
                this.isFetching = false;
              })
              .catch((err) => {
                this.isFetching = false;
                console.log(`An error occured: ${err}`);
              });
          }
        },
      });
    }
  }
}
