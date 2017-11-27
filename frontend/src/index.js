import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import PostDetail from './components/PostDetail';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
	<Router>
		<div>
			<Route path="/:filter?/" exact render={(props) => <App {...props} />} />
			<Route path="/*/:id" render={(props) => <PostDetail {...props} />} />		
		</div>
	</Router>, document.getElementById('root'));