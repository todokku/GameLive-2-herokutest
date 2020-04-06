import React, { Component } from 'react';

class MessagesContainer extends Component {

    render() {
        return(
            <div>

                {this.props.messages.map((message, index) => {
                    return (
                        <div key={index}>
                            <div>{message.sender}</div>
                        </div>
                    );
                })}

            </div>
        )
    }

}

export default MessagesContainer;