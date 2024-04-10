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
};

export type Category = {
  id: number;
  categoryName: string;
};
