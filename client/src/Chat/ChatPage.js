import React, { Component } from 'react';
import Room from './Room';
import Nav from './Nav';
import './ChatPage.css';
import openSocket from 'socket.io-client';
import Modal from 'react-modal';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

class ChatPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            socket: openSocket("https://project-gamelive.herokuapp.com/"),
            popo: false,
            username: ""
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
        let token = localStorage.getItem("username")
        if(!token){
            this.setState({popo: true})
        }
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
        this.setState({showModal: true})
        Modal.setAppElement('#root')
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    submitName = () => {
        if(this.state.username){
          localStorage.setItem("username", this.state.username.replace(/\s+/g, " ").trim())
          this.setState({popo: false})
        } else {
          alert("nelson")
        }
    }

    render() {
        return(
            <div>
                <Nav handleSubmit={this.handleSubmit}/>
                <Modal 
                    isOpen={this.state.popo}
                    style={customStyles}
                    overlayClassName="Overlay"
                >
                    <div>
                        <input 
                            type="text"  
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            name="username"
                            required
                        />
                        <button onClick={this.submitName}>Submit</button>
                    </div>
                </Modal>
                    <div>
                        {this.state.rooms.length > 0 ?
                        <Room rooms={this.state.rooms}/>
                        :
                        <div />
                        }
                    </div>
            </div>
        );
    }

    handleSubmit = () => {

        let reqBody = {
            player: "pepe"
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