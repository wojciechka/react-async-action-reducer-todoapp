import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { reducers } from './reducers';

import './App.css';

import TodoItemAdd from './TodoItemAdd';
import TodoItemsList from './TodoItemsList';

import 'bootstrap/dist/css/bootstrap.min.css';

let store = createStore(reducers);

const App: React.SFC = () => {
  return (
    <Provider store={store}>
      <div className="App mx-4 my-2">
        <TodoItemAdd />
        <TodoItemsList />

      </div>
    </Provider>
  );
};

export default App;
