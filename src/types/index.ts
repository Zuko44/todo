export interface Task {
  id: number;
  body: string;
  done: boolean;
}

export enum FilterTasks {
  All = 1,
  InWork,
  Done,
}
