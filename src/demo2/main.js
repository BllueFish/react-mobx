/**
 * Created by misslee on 2017/11/20.
 */
//import App from './app';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, autorun } from 'mobx';
import { observer } from 'mobx-react';

class Todo{
    id =  Math.random();
    @observable content;
    @observable finished = false;
    constructor(content){
        this.content = content;
    }

    finish(){
        this.finished = true;
    }
}

class TodoList{
    @observable todos = [];

    @computed get finishedList(){
        return this.todos.filter(todo => todo.finished);
    }

    @computed get unFinishedList(){
        return this.todos.filter(todo => !todo.finished);
    }

    addTodo(content){
        if(content){
            this.todos.push(new Todo(content));
        }
    }
}

@observer
class TodoListView extends Component{

    onChange = event =>{
        this.value =  event.target.value;
    }

 /*   onClick = () =>{
        console.log(this);
        this.todoList.addTodo(this.value);
    }*/

    render(){
        const { todoList }  = this.props;
         //let onChange = (event) => {this.value = event.target.value;}     //this是组件本身
         let onClick = () => { todoList.addTodo(this.value) }

        return(
            <div>
                <h2>添加任务</h2>
                /*! 调用外部函数中注意this指向!*/
                <input type="text" value={ this.value } onChange={ this.onChange.bind(this) }/>
                <button type="button" onClick={ onClick }>添加</button>
                <h2>未完成任务</h2>
                <ol>
                    { todoList.unFinishedList.splice(0).map((todo,index) =>
                        <TodoView todo={todo} key={todo.id}/>
                    )}
                </ol>
                <h2>已完成任务</h2>
                <ol>
                    { todoList.finishedList.splice(0).map((todo,index) =>
                        <FinishView todo={todo} key={todo.id}/>
                    )}
                </ol>
            </div>
        );
    }
}

@observer
class TodoView extends Component{
   render(){
       let { todo } = this.props;
       return (
        <li>
           <input
               type="checkbox"
               checked={todo.finished}
               onClick={todo.finish.bind(todo)}
           />{todo.content}
       </li>)
   }
}

class FinishView extends Component{
    render(){
        let { todo } = this.props;
        let style = {
            textDecoration:'line-through'
        };
        return(
            <li style={ style }>{ todo.content }</li>
        );
    }
}


var store = new TodoList();
store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code"),
    new Todo("hello word"),
    new Todo("123")
);

store.todos[2].finish();
const body = document.body;

ReactDOM.render(
    <TodoListView todoList={store}/>,
    body
);