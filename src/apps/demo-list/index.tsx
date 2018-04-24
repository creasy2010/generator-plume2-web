import React from 'react';
import { StoreProvider } from 'plume2';
import AppStore from './store';
import Content from './components/list';

@StoreProvider(AppStore)
export default class PartnerIntention extends React.Component {
  store: AppStore;

  componentDidMount() {
    this.store.init();
  }

  render() {
    return <Content />;
  }
}
