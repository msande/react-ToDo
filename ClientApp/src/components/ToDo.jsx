import React, { Component } from 'react';
import { AlertService } from '../services/AlertService';
import { NotificationService } from '../services/NotificationService';

const alertService = new AlertService();
const notificationService = new NotificationService();

export class ToDo extends React.Component {
    displayName = ToDo.name

    constructor(props) {
        super(props);
        
        this.state = { todoItems: [], loading: true };
        this.load();
    }

    load() {
        fetch('api/ToDo/Get')
            .then(response => response.json())
            .then(data => {
                this.setState({ todoItems: data, loading: false });
            });
    }
    
    handleBlur(event) {

        let finditem = this.state.todoItems.find(x => x.id === event.currentTarget.id);
        let newName = String.prototype.trim.call(event.currentTarget.value);

        if (finditem.name === newName) {
            return;
        }

        finditem.name = newName;

        

        fetch('api/ToDo/Save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finditem)
        }).then((response) => {
            if (response.status === 200) {
                alertService.save('Saved');

                this.setState({ todoItems: this.state.todoItems });
            } else {
                alertService.error('Sorry, an error occurred.');
            }
        });
    }

    handleFocus(event) {
        event.target.select();
    }

    delete(item) {
        let finditem = this.state.todoItems.find(x => x.id === item.id);
        finditem.isDeleted = true;

        fetch('api/ToDo/Delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then((response) => {
            if (response.status === 200) {
                alertService.save('Deleted');

                let index = this.state.todoItems.map(x => x.id).indexOf(item.id);
                console.log(this.state.todoItems);
                this.state.todoItems.splice(index, 1)
                
                this.setState({ todoItems: this.state.todoItems });
            } else {
                alertService.error('Sorry, an error occurred.');
            }
        });
    }

    renderItems = (todoItems) => {
        return (
            <div className="todo-items">
                <div>
                    {todoItems.map((item) =>
                        <div className="item" key={item.id}>
                            <input id={item.id} type="text" defaultValue={item.name}
                                onBlur={this.handleBlur.bind(this)}
                                onFocus={this.handleFocus.bind(this)}/>
                            <span className="item-delete" onClick={this.delete.bind(this, item)}>X</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <h1>ToDo:</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {this.state.loading ? <p><em>Loading...</em></p> : this.renderItems(this.state.todoItems)}
            </div>
        );
    }
}