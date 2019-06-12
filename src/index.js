import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { observable, action, computed } from 'mobx';
import {observer} from 'mobx-react'

import cssobj from './index.scss';



class Todo{
    id = Math.random();
    @observable title = '';
    @observable finished = false;
    @action.bound checkedToggle(){
        this.finished = !this.finished;
    }
    constructor(title){
        this.title= title;
    }

}

class Store{
   @observable todolist = []
   @action.bound addTodo(title){
       this.todolist.unshift( new Todo(title) );
   }

//    这有问题。。。。。
   @computed get left(){
       return this.todolist.filter( item => !item.finished)
   }
}

const store = new Store();

class ToDoItem extends Component {

    handleChange = ()=>{
        this.props.todo.checkedToggle();
    }
    

    render(){
        let cssname = this.props.todo.finished ? cssobj.finished : ''
        return(
            <div>
                <input 
                    type="checkbox"  
                    checked={this.props.todo.finished}
                    onChange={this.handleChange}/>
                <span className={ cssname  } > {this.props.todo.title} </span>
        </div>
        )
    }
    
}

// 就算没有用到可观察数据，也可以用 @observer修饰一下，也没啥副作用
@observer
class App extends Component{
    constructor(props){
        super(props);
        this.state={
            inputVal:''
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        let store = this.props.store;
        let inputValue = this.state.inputVal;
        if(inputValue ==='' ){
            return
        }
        store.addTodo(inputValue);
        this.setState({
            inputVal:''
        })

    }

    handleChange = (e)=>{
        if(e.target.value ===''){
            return
        }
        this.setState({
            inputVal:e.target.value
        })
    }

   

    render(){
        let store=this.props.store;
       
        let todolist = store.todolist;
        return(
            <div className={cssobj.main} >
                <div className={cssobj.header}>
                    <form onSubmit={this.handleSubmit}>
                        <input className={cssobj.input}
                            placeholder='What need to be finished?'
                            type="text" 
                            value={this.state.inputVal} 
                            onChange={this.handleChange} />
                        
                        <input className={cssobj['btn-submit']} type="submit" value='提交' />
                    </form>
                </div>

                <ul className= {cssobj['todo-list']} >
                {
                    todolist.map( item=>{
                        return <li className= {cssobj['todo-item']} key={item.id} >
                                <ToDoItem todo={item}/>
                        </li>
                    } )
                }    
                </ul>   

                <div className={cssobj.footer}>
                    {store.left.length} item(s) unshift
                </div>
            </div>
        )
    }
}



ReactDOM.render( <App store={store} /> , 
    
    document.getElementById('app') )