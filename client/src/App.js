import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ChatPage from './Chat/ChatPage';


class App extends Component {

	render() {
		return (
			<Router>
        		<Switch>
          			<Route exact path="/" component={ChatPage} />
        		</Switch>
    		</Router>
		);  
	}
}

export default App;
