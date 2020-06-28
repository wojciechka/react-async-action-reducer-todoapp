Demo application for [react-async-action-reducer](https://github.com/wojciechka/react-async-action-reducer) repository. This is a todo application demo that shows how a list, create, update and delete can be implemented.

The application keeps the state as a JavaScript variable, but in real life the logic to perform

The following code shows how a simple action can be created, using the `createActionAndReducer` method from [react-async-action-reducer](https://github.com/wojciechka/react-async-action-reducer). 

```typescript
export const list = createActionAndReducer<{}, ITodoItemEntry[]>({
  prefix: 'todoItems.list',
  perform: async (data?: {}) => {
    // retrieve list of items and return it, as async method
  },
});
```

See [src/actions/todoItems/index.ts](https://github.com/wojciechka/react-async-action-reducer-todoapp/blob/951be37/src/actions/todoItems/index.ts#L21-L28) for complete implementation.

The `prefix` option specifies what prefix should be used for redux action types. The above code generates all of the required redux actions, wrappers that can then be invoked (by providing `dispatch` method to it) as well as all of the reducers that can then be used in `combineReducers` code.

The method supports TypeScript and expect providing type for input (that is passed to the `perform` method) as well and output that the `perform` method should return a promise to.

The following is an example of changing the list of todo applications:

```typescript
export const create = createActionAndReducer<ITodoItem, ITodoItemEntry>({
  prefix: 'todoItems.create',
  // trigger a refresh of the list
  clearOtherData: [list.prefix],
  perform: async (data?: ITodoItem) => {
    // perform change and return the newly created item
  },
});
```

See [src/actions/todoItems/index.ts](https://github.com/wojciechka/react-async-action-reducer-todoapp/blob/951be37/src/actions/todoItems/index.ts#L30-L45) for complete implementation.

The `clearOtherData` option causes a successful invocation of this action to invalidate any data stored by another action and reducer created by [react-async-action-reducer](https://github.com/wojciechka/react-async-action-reducer) - this will also trigger a re-fetch of the list in most cases.

This simplifies building reactive application - simply calling the actions to modify data will also re-trigger fetching of the data if any component is currently using it.

Generating a set of reducers for all the actions simply requires combining the `.reducer` property of objects returned by `createActionAndReducer` - such as:

```typescript
  reducers: {
    ...list.reducer,
    ...create.reducer,
    ...update.reducer,
    ...remove.reducer,
  }
```

This can then be passed to `combineReducers` method in redux.

See [src/actions/todoItems/index.ts](https://github.com/wojciechka/react-async-action-reducer-todoapp/blob/951be37/src/actions/todoItems/index.ts#L80-L85) and [src/reducers/index.ts](https://github.com/wojciechka/react-async-action-reducer-todoapp/blob/951be37fd605ee7de76203744b677cde0b2908b9/src/reducers/index.ts#L5-L7) for complete implementation.

The above code generates all of the required actions and reducers.

With react hools, all that is needed to retrieve the list in a component is to do:

```
  const dispatch = useDispatch();
  const { data, error } = useSelector(actions.todoItems.list.dataAndErrorSelector({ dispatch, invokeAtFirstRun: true }));
```

See [src/TodoItemsList.tsx](https://github.com/wojciechka/react-async-action-reducer-todoapp/blob/951be37fd605ee7de76203744b677cde0b2908b9/src/TodoItemsList.tsx#L8-L9) for complete implementation.

This uses the hooks functionality from `react` and `react-redux` packages to retrieve the list.

Object that `createActionAndReducer` creates returns multiple helper selector methods that can be used with `useSelector()` method to retrieve specific item or list.

Providing `invokeAtFirstRun` and `dispatch` options to the selector causes it to `dispatch()` a call of the action to retrieve the item if it is not yet retrieved to the redux global state.

The code above is all that's needed to build logic to fetch data from a backend, `localStorage` or any other data provider - sync or async.

Applying changes in any component simply requires calling any of the modifying actions, then providing dispatch to it - such as:

```typescript
  const dispatch = useDispatch();
  const submitItem = (value: string) => {
    actions.todoItems.create({ title: value, checked: false })(dispatch);
  });
```

See [src/TodoItemAdd.tsx](https://github.com/wojciechka/react-async-action-reducer-todoapp/blob/951be37fd605ee7de76203744b677cde0b2908b9/src/TodoItemAdd.tsx#L7-L19) for complete implementation.
