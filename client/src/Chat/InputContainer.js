import React, { Component } from 'react';

class InputContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sender: "",
            content: ""
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input 
                    placeholder="name" 
                    value={this.state.sender} 
                    onChange={(e) => {this.setState({sender: e.target.value})}}
                    required
                />
                <input 
                    placeholder="type your message here..." 
                    value={this.state.content}
                    onChange={(e) => {this.setState({content: e.target.value})}} 
                    required
                />
                <button type="submit">Send</button>
            </form>
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.state.sender, this.state.content);
        this.setState({
            sender: "",
            content: ""
        });
    }

}

export default InputContainer;