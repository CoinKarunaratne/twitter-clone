export type PostsType = {
  title: string;
  id: string;
  updatedAt?: string;
  user: {
    name: string;
    image: string;
    email: string;
    id: string;
  };
  Comment?: {
    createdAt: string;
    id: string;
    title: string;
    postId: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      nam: string;
    };
  }[];
};
