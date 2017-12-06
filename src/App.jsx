import React, { Component } from 'react';
import TodoList from './TodoList'; 


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      priority: '',
      todos: []
    }
    this.count = 0;
    this.selectOnChange = this.selectOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.handleSave=this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  selectOnChange(event) {
    this.setState({ priority: event.target.value });
  }

  handleChange(event) {
    this.setState({ text: event.target.value })
  }

  handleClick(event) {
    event.preventDefault();
    // this.state.text empty = return false
    if(this.state.text == ''){
      return false
      
    }

    const newTodo = {
      id: this.count++,
      text: this.state.text,
      priority: this.state.priority,
      isEditing: false
    }

    //get everything from this.state.todos how to clone array
    let allTodos = this.state.todos;

    //push a newTodo inside oldTodos
    allTodos.push(newTodo);

    this.setState({ todos: allTodos });
    
  }

  changeStatus(id) {
    //todos[]
    const index = this.state.todos.findIndex((todo) => todo.id === id);
    const allTodos = this.state.todos;

    allTodos[index].isEditing = true;

    this.setState({todos: allTodos});
  }

  handleDelete(id) {
    const index =this.state.todos.findIndex((todo) => todo.id===id);
    const allTodos= this.state.todos;
    allTodos.splice(index, 1);
    this.setState({todos:allTodos});
  }

  handleSave(text, priority, id){
const index =this.state.todos.findIndex((todo) => todo.id===id);
const todoLi=this.state.todos;

todoLi[index].isEditing=false;
todoLi[index].text= text;
todoLi[index].priority =priority;

this.setState({todos: todoLi});

}

  render() {
   
    return (
      <div className='container'>
        <h1 className="text-white font-weight-bold">Very Simple Todo App</h1>
        <p className="text-white font-weight-light">Track all the things</p>
        <hr />
        <div className="row">
          <div className="col-4">
            <div className="card" className="card text-left">
              <h6 className="card-header pl-3 pt-3">Add New Todo</h6>
              <div className="card-block">
                <h6 className="font-weight-bold">I want to..</h6>
                <textarea onChange={this.handleChange} className="form-control create-todo-text" id="exampleFormControlTextarea1" rows="3"></textarea>

                <h6 className="font-weight-bold"> How much of a priority is this?</h6>
                <select className="form-control mb-5 create-todo-priority" onChange={this.selectOnChange}>
                  <option value={''}>Select a Priority</option>
                  <option value={1} >Low</option>
                  <option value={2} >Mid</option>
                  <option value={3} >High</option>
                </select>

                <button className="btn btn-success btn-block create-todo" value='submit' onClick={this.handleClick}>
                  Add
                </button>
              </div>
            </div>
          </div>


          <div className="col-8">
            <div className="card mb-5" >

              <div className="card-header" >
                View Todos
              </div>

              <div className="alert alert-info mb-0">
                <h5 className="card-title">Welcome to Very Simple Todo App!</h5>
                <p className="card-text  font-italic">Get started now by adding a new todo on the left.</p>
              </div>
              <ul>
                {
                this.state.todos.map(todo => (
                  <TodoList key={todo.id} onEdit={this.changeStatus} onSave={this.handleSave} onDelete={this.handleDelete} todo={todo} />
                  ))
                }
              </ul>

            </div>
          </div>

        </div>
      </div>
    );
  }
}




export default App;
