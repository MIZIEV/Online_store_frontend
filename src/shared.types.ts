export type CardProps = {
  id: number,
  brand: string;
  model: string;
  description: string;
  price: number;
  pictureURL: string;
  categoryId?: string;
  rating: number;
};

export type Category = {
  id: number;
  categoryName: string;
}