export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = {
  email: string;
  password: string;
  name: string;
  role: string;
};
export type UserPremium = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: String;
  blog: [];
  reviews: [];
};
export type Blogs = {
  id: number;
  title: String;
  intro: String;
  image: String;
  video?: String;
  createdAt: string;
  category: string;
  blog: String;
  saved: boolean;
  liked: boolean;
  userPremiumId?: number;
  userId?: number;
  reviews: [];
};

export type Reviews = {
  id: number;
  blogId: number;
  userPremiumId: number;
  content: string;
};
