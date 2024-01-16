export interface User {
  emailAddress: string;
  isOnline: boolean;
  newsletter: boolean;
  profilePhoto?: string;
  role: string;
  username: string;
}

export interface Article {
  id?: string;
  productName: string;
  productCategory: string;
  product: string;
  price: number;
  targetAudience: string;
  stock: number;
  description: string;
  image: string;
}

export interface Comment {
  id?: string;
  userComment: string;
  image?: string;
  likes: string[];
  dislikes: string[];
}
