import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

export default class Store {
  static namespace = 'demo1store';
  @observable count = 0;

  @action increment = () =>{
      this.count++;
  }

  @action decrement = () =>{
      this.count--;
  }
}
