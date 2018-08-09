import React, { Component } from 'react';
import '../App.min.css';

export class Home extends Component {
    displayName = Home.name
    
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <p class="sub-title">and welcome to the over complex react ToDo checklist</p>
                <p>What this project includes:</p>
                <ul>
                    <li>ASP.NET Core and C# for cross-platform server-side code</li>
                    <li>React for client-side code</li>
                    <li>SASS for layout and styling -- to do </li>
                    <li>Logging with NLog</li>
                    <li>Entity Framework and MySQL</li>
                    <li>HTML5 Browser Notifications</li>
                </ul>

                ToDo:
                <ul>
                    <li>OAuth</li>
                    <li>SASS / style</li>
                    <li>Edit/Delete ToDoItems</li>
                    <li>Browser Notifications when reminders are hit</li>
                    <li>Add date/time picker</li>
                    <li>Comment code(js, c#)</li>
                    <li>Unit testing(C# and js)</li>
                    <li>___</li>
                </ul>
            </div>
        );
    }
}
