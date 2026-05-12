export interface Plant {
  id: number;
  name: string;
  tagline: string;
  price: string;
  image: string;
}

export const plants: Plant[] = [
  {
    id: 1,
    name: "Peperomia argyreia",
    tagline: "Purify the air in your home by absorbing carbon monoxide.",
    price: "Rs. 1,299/-",
    image: "/plant1.png",
  },
  {
    id: 2,
    name: "Monstera deliciosa",
    tagline: "Excellent for filtering out indoor pollutants.",
    price: "Rs. 999/-",
    image: "/plant2.png",
  },
  {
    id: 3,
    name: "Philodendron 'Moonlight'",
    tagline: "A beautiful succulent that brings good luck.",
    price: "Rs. 309/-",
    image: "/plant3.png",
  },
  {
    id: 4,
    name: "Dieffenbachia 'Camille'",
    tagline: "Hardy, easy to care for, and striking appearance.",
    price: "Rs. 359/-",
    image: "/plant4.png",
  },
  {
    id: 5,
    name: "Aglaonema 'silver bay'",
    tagline: "Fast-growing vine that thrives in low light.",
    price: "Rs. 749/-",
    image: "/plant5.png",
  },
  {
    id: 6,
    name: "Clusia rosea 'Green Shield'",
    tagline: "Glossy leaves that add bold texture to any room.",
    price: "Rs. 1,499/-",
    image: "/plant6.png",
  },
  {
    id: 7,
    name: "Snake Plant (Sansevieria trifasciata)",
    tagline: "Elegant white blooms and great air-cleaning benefits.",
    price: "Rs. 1,199/-",
    image: "/plant7.png",
  },
  {
    id: 8,
    name: "juniper bonsai",
    tagline: "Iconic split leaves for a lush, tropical vibe.",
    price: "Rs. 1,899/-",
    image: "/plant8.png",
  },
];
