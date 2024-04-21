export interface User {
  id?: string;
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
  username: string;
  profilePhoto?: string;
  userComment: string;
  likes: string[];
  dislikes: string[];
  commentPhoto: string;
}

export interface ShoppingCart {
  id?: string;
  image: string;
  productName: string;
  price: number;
  targetAudience: string;
  product: string;
  quantity: number;
}

export interface Address {
  id?: string;
  nameOfAddressCard: string;
  firstName: string;
  lastName: string;
  postal: string;
  streetName: string;
  houseNumber: string;
  city: string;
  country: string;
  gender: string;
  nameOfAddressCardCreatedAt: Date;
}
