export interface User {
  id: string;
  email: string;
  username: string;
}

export interface ToDo {
  _id: string;
  title: string;
  description: string;
  status: string;
  ownerId: string | object;
  [x: string]: any;
}
