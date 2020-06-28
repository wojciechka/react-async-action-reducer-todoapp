// generic interface for item with an id
export interface IEntry {
  id: number;
};

// todo item, without the id property
export interface ITodoItem {
  title: string;
  checked: boolean;
};

// todo item with id property
export type ITodoItemEntry = ITodoItem & IEntry;
