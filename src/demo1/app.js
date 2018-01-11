/**
 * Created by misslee on 2017/11/17.
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('demo1store') //注入store到props中
@observer
export default class App extends Component {
    render() {
      const { demo1store } = this.props;  //从props中取出store
      const { count }  = demo1store;
        return (
            <div>
                Counter:{ count }<br/>
                <button onClick={demo1store.increment}>+</button>
                <button onClick={demo1store.decrement}>-</button>
            </div>
        );
    }
}
