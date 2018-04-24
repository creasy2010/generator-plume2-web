import React from 'react';
import { Relax } from 'plume2';
import { IList } from 'src/typings/globalType';

@Relax
export default class List extends React.Component {
  props: {
    relaxProps?: {
      listData: IList;
    };
  };

  static relaxProps = {
    listData: 'listData'
  };

  render() {
    const { listData } = this.props.relaxProps;
    return <div>{listData.map(item => <a key={item}>item</a>)}</div>;
  }
}
