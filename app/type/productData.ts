import { StaticImageData } from "next/image";

export interface ProductCardItem {
  id: number;
  name: string;
  description: string;
  rating: number;
  price: string;
  imgSrc: string | StaticImageData;
}
