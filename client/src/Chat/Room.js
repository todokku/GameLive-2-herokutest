import React, { Component } from 'react';

class Room extends Component {

    render() {
        return(
            <div className="container_rooms">

                {this.props.rooms.map((room, index) => {
                    return (
                        <div className="room" key={index}>
                            <div>Room {index + 1}</div>
                            {room.players.map((player, index)=>{
                                return (
                                    <div key={index + 1}>{player}</div>
                                )
                            })}
                            <div>{room.code}</div>
                        </div>
                    );
                })}

            </div>
        )
    }

}

export default Room;