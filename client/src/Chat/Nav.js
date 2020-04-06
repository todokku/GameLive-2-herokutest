import React, { Component } from 'react';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return(
            <nav>
                <form onSubmit={this.handleSubmit}>
                    <button type="submit">Send</button>
                </form>
            </nav>
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit();
        
    }

}

export default Nav;