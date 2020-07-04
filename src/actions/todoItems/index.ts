import { createActionAndReducer } from 'react-async-action-reducer';
import { ITodoItem, ITodoItemEntry } from '../../types';

let todoItemId: number = 0;

// NOTE: in real application, this would be stored on server side
let localItems: ITodoItemEntry[] = [
  { id: ++todoItemId, title: 'Sample pending item', checked: false, },
  { id: ++todoItemId, title: 'Sample done item', checked: true },
];

const wait = (ms: number): Promise<void> => {
  const promise = new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
  return promise;
};

const DELAY = 200;

export const list = createActionAndReducer<{}, ITodoItemEntry[]>({
  prefix: 'todoItems.list',
  perform: async (data?: {}) => {
    // simulate delayed retrieval of data
    await wait(DELAY);
    return localItems;
  },
});

export const get = createActionAndReducer<number, ITodoItemEntry | undefined>({
  prefix: 'todoItems.get',
  dataIsKey: true,
  perform: async (data?: number) => {
    // simulate delayed retrieval of data
    await wait(DELAY);
    const matching = localItems.filter(row => row.id === data);
    if (matching.length === 1) {
      return matching[0];
    } else {
      return undefined;
    }
  },
});

export const create = createActionAndReducer<ITodoItem, ITodoItemEntry>({
  prefix: 'todoItems.create',
  // trigger a refresh of the list
  clearOtherData: [list.prefix],
  perform: async (data?: ITodoItem) => {
    const dataEntry: ITodoItemEntry = {
      id: ++todoItemId,
      ...(data as ITodoItem),
    };

    // simulate delayed applying of changes
    await wait(DELAY);
    localItems.push(dataEntry);
    return dataEntry;
  },
});

export const update = createActionAndReducer<ITodoItemEntry, void>({
  prefix: 'todoItems.update',
  // trigger a refresh of the list or get operations on change
  clearOtherData: [list.prefix, get.prefix],
  perform: async (data?: ITodoItemEntry) => {
    // simulate delayed applying of changes
    await wait(DELAY);

    if (data) {
      localItems = localItems.map(row => row.id === data.id ? data : row);
    }
  },
});

export const remove = createActionAndReducer<ITodoItemEntry, void>({
  prefix: 'todoItems.remove',
  // trigger a refresh of the list or get operations on change
  clearOtherData: [list.prefix, get.prefix],
  perform: async (data?: ITodoItemEntry) => {
    // simulate delayed applying of changes
    await wait(DELAY);

    if (data) {
      localItems = localItems.filter(row => row.id !== data.id);
    }
  },
});

export const todoItems = {
  list,
  get,
  create,
  update,
  remove,
  reducers: {
    ...list.reducer,
    ...get.reducer,
    ...create.reducer,
    ...update.reducer,
    ...remove.reducer,
  }
};
