import { Product } from "./utils/types";

export const BASE_URL = 'http://localhost:8080/api'

export enum Colors {
  "primary" = "#004AAD",
  "secondary" = "#38B6FF",
  "tertiary" = "#64CBFF",
  "quaternary" = "#F4F4F4",
  "quinary" = "#64CB92",
  "danger" = "danger",
  "warning" = "warning",
}

export const productList: Product[] = [
  {
    productName: "BeMyStep",
    description:
      "An accessory to the white cane designed to help with navigation",
    imageUrl:
      "https://www.red-dot.org/fileadmin/_processed_/9/f/csm_36-06601-2020-4_9c1ee7f0ef.jpg",
    quantityInStock: 11,
    price: 129.99,
  },
  {
    productName: "CAN GO Cane",
    description: "A white cane equipped with sensors for obstacle detection",
    imageUrl:
      "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2022/05/06-90753069-smart-cane.jpg",
    quantityInStock: 12,
    price: 139.99,
  },
  {
    productName: "Earpeace",
    description: "Cutting edge technology earphone for hearing disabilities",
    imageUrl:
      "https://www.kind.com/globalassets/bilder---2880-x-1620/hearing-aid-behind-the-ear_kindduro_02-2023_2880x1620.png?w=720&h=405&mode=crop&anchor=topleft",
    quantityInStock: 13,
    price: 149.99,
  },
  {
    productName: "X9 Electric Wheelchair",
    description: "This innovative new design includes an automatic reclining backrest, and automatic lifting leg rests that can work together or independently of each other.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr0lwxYEatK7dtalbVsApV8MY8xBNCYOrPGQ&usqp=CAU",
    quantityInStock: 0,
    price: 459.99,
  },
];

