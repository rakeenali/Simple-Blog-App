export interface IBlog {
  _id?: String;
  description: String;
  createdAt?: Date;
  createdBy?: {
    name: string;
    email: string;
    _id: string;
  };
}
