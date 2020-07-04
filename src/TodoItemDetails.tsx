import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from './actions';

export interface ITodoItemDetailsProps {
  id: number;
  onBack: () => void;
}

const TodoItemDetails: React.SFC<ITodoItemDetailsProps> = (props) => {
  const dispatch = useDispatch();
  const { data, error } = useSelector(actions.todoItems.get.dataAndErrorSelector({ dispatch, invokeAtFirstRun: true, data: props.id }));

  return (
    <React.Fragment>
      <div className="row my-3">
        <div className="col-12">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {props.onBack()}}
          >
            Back
          </button>
        </div>
      </div>
      {(data !== undefined ? (
        <React.Fragment>
          <div className="row">
            <div className="col-3 text-right">
              Title:
            </div>
            <div className="col-9 text-left">
              <b>{data.title}</b>
            </div>
          </div>
          <div className="row">
            <div className="col-3 text-right">
              Checked:
            </div>
            <div className="col-9 text-left">
              <b>{data.checked ? 'Yes' : 'No'}</b>
            </div>
          </div>
        </React.Fragment>
      ) : (error !== undefined ? (
        <div className="row">
          <div className="col-12">
            Error retrieving data: <b>{error?.toString()}</b>
          </div>
        </div>
      ) : (
          <div className="row">
            <div className="col-12">
              ...
            </div>
          </div>
        ))
      )}
    </React.Fragment>
  );
};

export default TodoItemDetails;
