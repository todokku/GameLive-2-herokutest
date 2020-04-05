import React, { Component } from 'react';
import MessagesContainer from './MessagesContainer';
import InputContainer from './InputContainer';
import './ChatPage.css';
import openSocket from 'socket.io-client';

class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            socket: openSocket("https://project-gamelive.herokuapp.com/")
        };

        this.state.socket.on("new-message", (message) => {
            let currentMessages = this.state.messages;
            currentMessages.push(message);
            this.setState({
                messages: currentMessages
            });
        });
    }

    componentDidMount() {
        fetch("/api/message", {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((resJson) => {
            this.setState({
                messages: resJson
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <div>
                
                <div width={4} />

                <div width={8}>
                    <div className="messages-container">
                        {this.state.messages.length > 0 ?
                        <MessagesContainer messages={this.state.messages}/>
                        :
                        <div />
                        }
                    </div>
                    <div>
                        <InputContainer handleSubmit={this.handleSubmit}/>
                    </div>
                </div>

                <div width={4} />

            </div>
        );
    }

    handleSubmit = (sender, content) => {

        let reqBody = {
            sender: sender,
            content: content
        }

        fetch("/api/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        }).then((res) => {
            return res.json();
        }).then((resJson) => {
            this.state.socket.emit("new-message", resJson);
        }).catch((err) => {
            console.log(err);
        });
    }

}

export default ChatPage;