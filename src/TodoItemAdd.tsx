import React, { useState } from 'react';

import { actions } from './actions';
import { useDispatch } from 'react-redux';

const TodoItemAdd: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode !== 13) {
      return;
    }

    actions.todoItems.create({ title: value, checked: false })(dispatch);
    setValue('');
  };

  return (
    <div className="row">
      <div className="col-2 text-right">
        <span>
          Add new entry:
        </span>
      </div>
      <div className="col-9">
        <input
          placeholder="Add new todo item"
          style={{ width: '100%' }}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="col-1">

      </div>
    </div>
  );
};

export default TodoItemAdd;