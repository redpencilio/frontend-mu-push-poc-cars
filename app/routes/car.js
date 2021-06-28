import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CarRoute extends Route {
  @service store;

  async model() {
    console.log(`ID is: ${window.identifier}`);
    return this.store.findAll('car');
  }
}
