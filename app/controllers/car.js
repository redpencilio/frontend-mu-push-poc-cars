import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CarController extends Controller {
  @service store;
  @tracked brand = '';
  @tracked carModel = '';

  @action
  createCar(event) {
    event.preventDefault();
    const car = this.store.createRecord('car', {
      brand: this.brand,
      model: this.carModel,
    });
    car.save();

    this.brand = '';
    this.carModel = '';
  }

  @action
  removeCar(car, event) {
    event.preventDefault();
    car.destroyRecord();
  }
}
