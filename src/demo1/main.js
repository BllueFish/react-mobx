/**
 * Created by misslee on 2017/11/17.
 */
import React from 'react';
import { Provider } from 'mobx-react';
import ReactDOM from 'react-dom';
import App from './app';
import { observable, action } from 'mobx';
import Store from '../stores/demo1';

var store = new Store();
console.log(store);
const div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(
    <Provider demo1store={store}>
       <App />
     </Provider>,
    div
);
