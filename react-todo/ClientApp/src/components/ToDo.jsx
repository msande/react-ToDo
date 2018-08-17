import React, { Component } from 'react';
import { AlertService } from '../services/AlertService';
import { NotificationService } from '../services/NotificationService';
import { v4 } from 'uuid';

const notificationService = new NotificationService();

export class ToDo extends React.Component {
    displayName = ToDo.name

    constructor(props) {
        super(props);

        this.state = { todoItems: [], loading: true };
        this.add = this.add.bind(this);
        this.load();
    }

    add() {
        let newGuid = v4();
        this.state.todoItems = [...this.state.todoItems, { id: newGuid, name: '' }];
        this.setState({ todoItems: this.state.todoItems });
    }

    async load() {

        let headers = new Headers();
        headers.set('Authorization', `Bearer ${sessionStorage.getItem('JWT')}`);
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');

        await fetch('api/ToDo/GetItems', {
            headers: headers
        }).then(response => response.json())
        .then(data => {
            this.setState({ todoItems: data, loading: false });
        });
    }

    async save(finditem) {

        let headers = new Headers();
        headers.set('Authorization', `Bearer ${sessionStorage.getItem('JWT')}`);
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        debugger;
        await fetch('api/ToDo/Save', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(finditem)
        }).then((response) => {
            if (response.status === 200) {
                AlertService.save('Saved');
                this.setState({ todoItems: this.state.todoItems });
            } else {
                AlertService.error('Sorry, an error occurred.');
            }
        });
    }

    delete(item) {
        let finditem = this.state.todoItems.find(x => x.id === item.id);
        finditem.isDeleted = true;

        let headers = new Headers();
        headers.set('Authorization', `Bearer ${sessionStorage.getItem('JWT')}`);
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');

        fetch('api/ToDo/Delete', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(item)
        }).then((response) => {
            if (response.status === 200) {
                AlertService.save('Deleted');

                let index = this.state.todoItems.map(x => x.id).indexOf(item.id);
                console.log(this.state.todoItems);
                this.state.todoItems.splice(index, 1)

                this.setState({ todoItems: this.state.todoItems });
            } else {
                AlertService.error('Sorry, an error occurred.');
            }
        });
    }

    async handleBlur(event) {

        let finditem = this.state.todoItems.find(x => x.id === event.currentTarget.id);
        let newName = String.prototype.trim.call(event.currentTarget.value);

        if (finditem.name === newName) {
            return;
        }

        finditem.name = newName;

        await this.save(finditem);
    }

    handleFocus(event) {
        event.target.select();
    }

    renderItems = (todoItems) => {
        return (
            <div className="todo-items">
                <button onClick={this.add}>add</button>
                <div>
                    {todoItems.map((item) =>
                        <div className="item" key={item.id}>
                            <input
                                id={item.id}
                                type="text"
                                defaultValue={item.name}
                                onBlur={this.handleBlur.bind(this)}
                                onFocus={this.handleFocus.bind(this)}
                                autoFocus="true"
                            />
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