export type Phone = {
  id: number;
  brand: string;
  model: string;
  os: string;
  osVersion: number;
  resolution: string;
  screenSize: number;
  mainCamera: string;
  frontCamera: number;
  processor: string;
  producingCountry: string;
  countOfCores: number;
  ram: number;
  rom: number;
  weight: number;
  batteryCapacity: number;
  countOfSimCard: number;
  price: number;
  mainPictureURL: string;
  rating: number;
  voteCount: number;
  used: boolean;
  colors: Color[];
  romList: PhoneRom[];
  phonePictureURLS: PictureUrl[];
  communicationStandardList: CommunicationStandard[];
};


export type BlogProps = {
  id: number;
  blogPictureUrl: string;
  title: string;
  text: string;
  createdAt: string
};

export type Color = {
  id: number,
  colorName: string
}

export type Comment = {
  id: number,
  commentText: string,
  createdAt: string,
  authorName: string
  authorEmail: string;
}

export type PhoneDistinctCharacteristics = {
  screenSize: number[];
  resolution: string[];
  processor: string[];
  countOfCores: number[];
  ram: number[];
  rom: number[];
  batteryCapacity: number[];
  countOfSimCard: number[];
};

export type PhoneRom = {
  id: number;
  romSize: number;
  price: number;
}

export type Order = {
  id: number;
  totalAmount: number;
  status: boolean;
  fullName: string;
  deliveryMethod: string;
  paymentMethod: string;
  createdAt: string;
  phoneList: SelectedPhone[];
  email: string;
}

export type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export type PhoneFeature = {
  id: number;
  feature: string
}

export type SelectedPhone = {
  id: number;
  brand: string;
  model: string;
  colorNameConverted: string;
  colorName: string;
  rom: string;
  price: number;
  quantity: number;
  image: string;
}

export type PictureUrl = {
  id: number;
  url: string;
}

export type CommunicationStandard = {
  id: number;
  standardName: string;
}