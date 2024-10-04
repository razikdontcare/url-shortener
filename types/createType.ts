export type CreateBody = {
  target: string;
  randomId: boolean;
  id: string;
};

export type CreateResponse = {
  id: string;
  target: string;
  url: string;
  _createdAt: number;
  _updatedAt: number;
  message: string;
};
