import { Store, IOptions } from 'plume2';
import { fromJS } from 'immutable';
import ListActor from './actor/list-actor';
import { loadData } from './webapi';

export default class AppStore extends Store {
  constructor(props: IOptions) {
    super(props);
    if (__DEV__) {
      (window as any)._store = this;
    }
  }

  bindActor() {
    return [new ListActor()];
  }

  init = async () => {
    const listData = loadData();
    this.dispatch('listActor: init', fromJS(listData));
  };
}
