import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers/rootReducer'
// import usersReducer from './reducers/usersReducer'
// import evalItemsReducer from './reducers/evalItemsReducer'
// import chartFilterReducer from './reducers/chartFilterReducer'

// const rootReducer = combineReducers({
//   users: usersReducer, evalItems: evalItemsReducer, chartFilter: chartFilterReducer
// })

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))


ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
