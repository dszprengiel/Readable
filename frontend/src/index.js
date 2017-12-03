import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import PostDetail from './components/PostDetail';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers'; 
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<Route path="/:filter?/" exact render={(props) => <App {...props} />} />
				<Route path="/*/:id" render={(props) => <PostDetail {...props} />} />		
			</div>
		</Router>
	</Provider>, document.getElementById('root'));