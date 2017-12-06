import React, { Component } from 'react'


class TodoList extends Component {
    constructor(props) {
        super(props);

        this.selectOnChange = this.selectOnChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editHandler=this.editHandler.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);

        this.state = {
            text: '',
            priority: ''
        }
    }

    selectOnChange(event) {
        this.setState({ priority: event.target.value });
    }

    handleChange(event) {
       this.setState({ text: event.target.value});
        //this.props.handleChange(this.props.todo.text)
    }

    editHandler(){
        this.setState ({text: this.props.todo.text});
        this.props.onEdit(this.props.todo.id);
    }

    onDelete() {
        this.props.onDelete(this.props.todo.id);
    }

    onSave() {
        //text, priority, id
        this.props.onSave(this.state.text, this.state.priority, this.props.todo.id); 
    }


    render() {
        if (this.props.todo.priority == 2) {
            var priority = 'alert-warning';
        } else if (this.props.todo.priority == 3) {
            var priority = 'alert-danger';
        } else {
            var priority = 'alert-success'; 
        }
        if (this.props.todo.isEditing === true) {
            return (
                <div className="alert alert-success mb-0 clearfix" >
                    <h6 className="font-weight-bold">Description</h6>
                    <textarea className="form-control update-todo-text" defaultValue={this.props.todo.text} id="exampleFormControlTextarea1" rows="1" onChange={this.handleChange}></textarea>
                    <h6 className="font-weight-bold mt-3 update-todo-priority">Priority</h6>
                    <select className="form-control" defaultValue={this.props.todo.priority} onChange={this.selectOnChange}>
                    <option value={''}>Select a Priority</option>
                        <option value="1">Low Priority</option>
                        <option value="2">Mid Priority</option>
                        <option value="3">High Priority</option>
                    </select>
                    <button type="button" className="btn btn-success pull-right mr-3 update-todo " onClick={this.onSave}>Save</button>
                </div>)
        }else {
            return (
                <li className={`alert ${priority}`}>
                    <input className="form-check-input ml-1" type="checkbox" id="inlineCheckbox2" />
                    {this.props.todo.text}

                    <button className="pull-right mr-2 delete-todo" onClick={this.onDelete}>
                        Delete
                        <i className="fa fa-trash ml-1" aria-hidden="true"></i>
                    </button>
                    <button className="pull-right mr-3 edit-todo" onClick={this.editHandler}>
                        Edit
                        <i className="fa fa-pencil-square-o ml-1" aria-hidden="true"></i>
                    </button>
                </li>);
        }
    }
}
export default TodoList;
