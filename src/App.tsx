import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { reducers } from './reducers';

import './App.css';

import TodoItemAdd from './TodoItemAdd';
import TodoItemDetails from './TodoItemDetails';
import TodoItemsList from './TodoItemsList';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ITodoItemEntry } from './types';

let store = createStore(reducers);

const App: React.SFC = () => {
  const [item, setItem] = useState<ITodoItemEntry | undefined>();
  return (
    <Provider store={store}>
      <div className="App mx-4 my-2">

        {item !== undefined ? (
          <React.Fragment>
            <TodoItemDetails
              onBack={() => setItem(undefined)}
              id={item.id}
            />
          </React.Fragment>
        ) : (
            <React.Fragment>
              <TodoItemAdd />
              <TodoItemsList
                onRowSelected={setItem}
              />
            </React.Fragment>
          )}
      </div>
    </Provider>
  );
};

export default App;
