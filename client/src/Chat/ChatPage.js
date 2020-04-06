import React, { Component } from 'react';
import Room from './Room';
import Nav from './Nav';
import './ChatPage.css';
import openSocket from 'socket.io-client';

class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            socket: openSocket("https://project-gamelive.herokuapp.com/")
        };

        this.state.socket.on("new-room", (room) => {
            let currentRooms = this.state.rooms;
            currentRooms.push(room);
            this.setState({
                room: currentRooms
            });
        });
    }

    componentDidMount() {
        fetch("/api/room", {
            method: "GET"
        }).then((res) => {
            return res.json();
        }).then((resJson) => {
            this.setState({
                rooms: resJson
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return(
            <div>
                <Nav handleSubmit={this.handleSubmit}/>
               

                <div>
                    <div className="messages-container">
                        {this.state.rooms.length > 0 ?
                        <Room rooms={this.state.rooms}/>
                        :
                        <div />
                        }
                    </div>
                    
                        
                    
                </div>

            </div>
        );
    }

    handleSubmit = () => {

        let reqBody = {
            sender: "o si"
        }

        fetch("/api/room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        }).then((res) => {
            return res.json();
        }).then((resJson) => {
            this.state.socket.emit("new-room", resJson);
        }).catch((err) => {
            console.log(err);
        });
    }

}

export default ChatPage;