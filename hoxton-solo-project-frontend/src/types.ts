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
export type User = {
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
  image?: String;
  video?: String;
  createdAt: string;
  blog: String;
  userPremiumId?: number;
  userId?: number;
  reviews: [];
};

export type Reviews = {
  id: number;
  companyId: number;
  userId: number;
  rating: number;
  content: string;
};
