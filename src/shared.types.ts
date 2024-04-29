export type CardProps = {
  id: number;
  brand: string;
  model: string;
  description: string;
  price: number;
  mainPictureURL: string;
  categoryId?: string;
  rating: number;
  quantity: number;
  image: string;
  used: boolean;
};

export type Category = {
  id: number;
  categoryName: string;
};

export type BlogProps = {
  id: number;
  blogPictureUrl: string;
  title: string;
  text: string;
};