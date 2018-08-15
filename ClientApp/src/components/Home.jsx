import React, { Component } from 'react';

export class Home extends Component {
    displayName = Home.name
    
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <p className="sub-title">and welcome to the over complex ToDo react app</p>
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
                    <li>Make http calls into service: https://github.com/bradymholt/aspnet-core-react-template/blob/master/client-react/services/RestUtilities.ts </li>
                    <li>OAuth</li>
                    <li>SASS / style</li>
                    <li>Edit/Delete ToDoItems</li>
                    <li>Browser Notifications when reminders are hit</li>
                    <li>Add date/time picker</li>
                    <li>Comment code(js, c#)</li>
                    <li>Unit testing(C# and js)</li>
                    <li>Get working on old ie</li>
                    <li>Reorder items</li>
                    <li>Clean up C# namespaces</li>
                    <li>___</li>
                </ul>
            </div>
        );
    }
}
