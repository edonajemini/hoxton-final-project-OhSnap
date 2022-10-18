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
  export type Blogs = {
      id: number;
      title: string;
      intro: string;
      reviews: [];
      user?: string;
      userPremium?: string;
      createdAt: string;
      image: string;
      video:string;
      jobApplication: [];
    };

    export type Reviews = {
      id: number;
      companyId: number;
      userId: number;
      rating: number;
      content: string;
    };