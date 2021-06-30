import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CarComponent extends Component {
  @service store;
  @tracked brand = '';
  @tracked model = '';

  @action
  updateCar(id, event) {
    event.preventDefault();
    let brand = this.brand;
    let model = this.model;
    this.store.findRecord('car', id).then(function (car) {
      if (brand != '') {
        car.brand = brand;
      }
      if (model != '') {
        car.model = model;
      }
      car.save();
    });

    this.brand = '';
    this.model = '';
  }
}
