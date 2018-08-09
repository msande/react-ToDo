import React, { Component } from 'react';
import { AlertService } from '../services/AlertService';
import { NotificationService } from '../services/NotificationService';

const alertService = new AlertService();
const notificationService = new NotificationService();

export class ToDo extends React.Component {
    displayName = ToDo.name

    constructor(props) {
        super(props);

        this.save = this.save.bind(this);
        this.state = { todoItems: [], loading: true };
        this.loadItems();
    }

    loadItems() {
        fetch('api/ToDo/Get')
            .then(response => response.json())
            .then(data => {
                this.setState({ todoItems: data, loading: false });
            });
    }

    save() {
        //todo: make into a promise?
        fetch('api/ToDo/Save', {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.todoItems)
        }).then((response) => {
            if (response.status === 200) {
                alertService.save('Saved');
            } else {
                alertService.error('Sorry, an error occurred.');
            }
        });
    }

    handleChange(event) {
        let item = this.state.todoItems.find(x => x.id === event.currentTarget.id);
        item.name = event.currentTarget.value;
        this.setState({ todoItems: this.state.todoItems, loading: false });
    }

    renderItems = (todoItems) => {
        return (
            <div>
                <div>
                    {todoItems.map((item) =>
                        <div key={item.id}>
                            <input id={item.id} type="text" value={item.name} onChange={this.handleChange.bind(this)} />
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
                <button onClick={this.save}>Save</button>
            </div>
        );
    }
}