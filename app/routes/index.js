import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  identifier = false;

  async model() {
    console.log(`ID is: ${window.identifier}`);
    return this.store.findAll('car');
  }
}
