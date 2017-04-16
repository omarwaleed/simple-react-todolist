import React, { Component } from 'react';
// import ReactDom from 'react-dom';
import './App.css';

import $ from 'jquery';

class App extends Component {
    constructor(){
        super();
        this.state = {
            selected: 0,
            store: [
                {
                    name: 'Groceries',
                    todos: ['Apple','Oranges','Bananas']
                },
                {
                    name: 'Languages',
                    todos: ['Javascript','GoLang']
                }
            ]
        }
        this.update = this.update.bind(this);
        this.animate = this.animate.bind(this);
    }
    update(){
        console.log(this.btn, this.inputField.value, this.state.selected);
        let newStore = this.state.store.slice(0);
        if(this.inputField.value === "") return;
        if(this.btn === "list"){
            newStore.push({
                name: this.inputField.value,
                todos: []
            })
        } else {
            if(this.btn === "todo"){
                newStore[this.state.selected].todos.push(this.inputField.value);
            }
        }
        console.log(newStore);
        this.setState({store: newStore});
    }

    animate(){
        const todos = $('#todos');
        todos.hide();
        todos.show(1000);
    }

    render() {

        const spanStyle = {
            padding: '20px',
            backgroundColor: '#eee',
            border: '1px solid #ccc',
            borderRadius: '2px',
            width: '20px',
            textAlign: 'center'
        }
        const liStyle = {
            padding: '5px 20px',
            width: '400px',
            display: 'block'
        }

        const appStyle = {
            display: 'flex',
            flexDirection: 'column',
            width: '550px',
            justifyContent: 'center',
            margin: 'auto',
            paddingTop: '15px'
        }

        const btnStyle = {
            border: '2px solid #ddd',
            borderRadius: '3px',
            padding: '5px',
            backgroundColor: 'white',
            fontWeight: 'bold',
            // marginLeft: '3px'
        }

        const headerStyle = {
            fontSize: '26px',
            fontStyle: 'italic',
            width: '400px',
            border: '1px solid #eee',
            textAlign: 'center',
            padding: '10px 0px',
        }

        return (
          <div className="App" style={appStyle}>
            <div className="inputs">
                <input type="text" ref={(input)=>{this.inputField = input;}}/>
                <button onClick={()=>{this.btn = 'list'; this.update()}} style={btnStyle}>Add List</button>
                <button onClick={()=> {this.btn = 'todo'; this.update()}} style={btnStyle}>Add Todo</button>
            <br/>
            </div>
            <span style={headerStyle}>Lists</span>
            <ul id="lists">
                {this.state.store.map((list, index) =>{
                    return <List key={index.toString()} listName={list.name} onClick={()=>{this.setState({selected: index}); this.animate()}} />;
                })}
            </ul>
            <span style={headerStyle}>Todos</span>
            <div id="todos" className="todos">
                <ul className="todos vertical">
                    {this.state.store[this.state.selected].todos.map(function(todo, index){
                        return <li style={liStyle} key={'list'+index}><div style={{
                                width: '100%',
                                display: 'flex',
                                marginLeft: '-20px'
                            }}><span style={spanStyle}>{index}</span><Todo key={index} todoName={todo} /></div></li>;
                    })}
                </ul>
            </div>
          </div>
        );
    }
}
// ()=>{console.log(this); this.setState = {selected: index}
// class List extends Component {
//     render(){
//         // onClick={this.setState({selected: this.props.index})}
//         console.log(this);
//         return <li>{this.props.listName}</li>;
//     }
// }

function List(props){
    const listStyle = {
        display: 'flex',
        flex: '1',
        border: '1px solid #ccc',
        borderRadius: '2px',
        padding: '20px 40px',
        cursor: 'pointer',
        marginBottom: '10px'
    }
    return (
        <li onClick={props.onClick} style={listStyle} className="list-item">{props.listName}</li>
    );
}

const todoStyle = {
    padding: '20px 40px',
    border: '1px solid #ccc',
    borderRadius: '2px',
    width: '350px'
}

const Todo = (props) => <span style={todoStyle}>{props.todoName}</span>

export default App;
