import React, { Component } from 'react';

class InputContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                
                <button type="submit">Send</button>
            </form>
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit();
        
    }

}

export default InputContainer;