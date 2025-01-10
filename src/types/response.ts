export interface User {
  _id: string;
  email: string;
  username: string;
  [x: string]: any;
}

export interface ToDo {
  _id: string;
  title: string;
  description: string;
  status: string;
  ownerId: string | object;
  [x: string]: any;
}
