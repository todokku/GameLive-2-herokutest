import React, { Component } from 'react';

class MessagesContainer extends Component {

    render() {
        return(
            <div>

                {this.props.messages.map((message, index) => {
                    return (
                        <div key={"c" + index}>
                            <div as="b">{message.sender}</div>
                            <div>{message.content}</div>
                        </div>
                    );
                })}

            </div>
        )
    }

}

export default MessagesContainer;