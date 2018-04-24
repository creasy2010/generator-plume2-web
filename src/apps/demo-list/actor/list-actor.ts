import { Actor, Action, IMap } from 'plume2';

export default class ListActor extends Actor {
  defaultState() {
    return {
      // 列表数据
      listData: []
    };
  }

  @Action('listActor: init')
  tableCount(state: IMap, listData) {
    return state.set('listData', listData);
  }
}
