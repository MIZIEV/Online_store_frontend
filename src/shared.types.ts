export type CardProps = {
  id: number,
  brand: string;
  model: string;
  description: string;
  price: number;
  pictureURL: string;
};

export type Category = {
  id: number;
  categoryName: string;
}