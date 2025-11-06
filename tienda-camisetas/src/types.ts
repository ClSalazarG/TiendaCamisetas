export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export type Size = "S" | "M" | "L" | "XL";

export type CartItem = {
  product: Product;
  quantity: number;
  size: Size;
};

export type CartState = { items: CartItem[] };

export type CartContextValue = {
  state: CartState;
  addItem: (product: Product, qty?: number, size?: Size) => void;
  removeItem: (productId: string) => void;            // elimina todas las tallas de ese id
  removeLine: (productId: string, size?: Size) => void; // elimina solo esa talla
  increment: (productId: string, size?: Size) => void;
  decrement: (productId: string, size?: Size) => void;
  clear: () => void;
  total: number;
};

export type LoginValues = { email: string; password: string };
export type RegisterValues = { name: string; email: string; password: string; confirm: string };
