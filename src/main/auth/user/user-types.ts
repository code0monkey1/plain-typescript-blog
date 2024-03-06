export type User ={
  name:string,
  username:string,
  passwordHash:string,
  id:string
}

export type UserProps = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
