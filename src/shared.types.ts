export type Phone = {
  id: number;
  brand: string;
  model: string;
  os: string;
  osVersion: number;
  resolution: string;
  mainCamera: string;
  frontCamera: number;
  processor: number;
  countOfCores: number;
  ram: number;
  rom: number;
  weight: number;
  batteryCapacity: number;
  countOfSimCard: number;
  price: number;
  mainPictureURL: string;
  rating: number;
  vote_count: number;
  used: boolean;
};


export type BlogProps = {
  id: number;
  blogPictureUrl: string;
  title: string;
  text: string;
};

export type Color = {
  id: number,
  colorName: string
}