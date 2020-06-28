import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from './actions';
import { ITodoItem, ITodoItemEntry } from './types';

const TodoItemsList: React.SFC = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector(actions.todoItems.list.dataAndErrorSelector({ dispatch, invokeAtFirstRun: true }));

  const handleCheckboxToggle = (row: ITodoItemEntry) => (event: React.ChangeEvent<HTMLInputElement>) => {
    actions.todoItems.update({
      ...row,
      checked: !row.checked,
    })(dispatch);
  };

  return (
    data !== undefined ? (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <h1>Todo items</h1>
          </div>
        </div>
        {data.map(row => (
          <div className="row" key={row.id.toString()}>
            <div className="col-2 text-right">
              <input
                type="checkbox"
                checked={row.checked}
                onChange={handleCheckboxToggle(row)}
              />
            </div>
            <div className="col-9 text-left">
              <span style={{textDecoration: (row.checked ? 'line-through' : 'inherit')}}>
                {row.title}
              </span>
            </div>
            <div className="col-1">

            </div>
          </div>
        ))}
      </React.Fragment>
    ) : (error !== undefined ? (
      <div className="row">
        <div className="col-12">
          Error retrieving data: <b>{error.toString()}</b>
        </div>
      </div>
    ) : (
        <div className="row">
          <div className="col-12">
            ...
        </div>
        </div>
      ))
  );
};

export default TodoItemsList;