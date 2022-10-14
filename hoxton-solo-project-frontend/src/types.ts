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
  export type Jobs = {
      id: number;
      title: string;
      location: string;
      details: [];
      jobSummary: string;
      jobDescription: string;
      createdAt: string;
      companyId: number;
      jobApplication: [];
    };
  export type Company = {
    id:number,
    name:string,
    imageURL: string,
    rating: number,
    about:string,
    address: string,
    email : string,
    website :string,
    reviews: []
    jobs: []
    };
  
    export type Reviews = {
      id: number;
      companyId: number;
      userId: number;
      rating: number;
      content: string;
    };