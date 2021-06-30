import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    return this.store
      .findAll('car')
      .then((cars) => cars.sortBy('model'))
      .then((cars) => cars.sortBy('brand'));
  }
}
