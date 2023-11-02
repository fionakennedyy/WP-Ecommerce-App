//abstract concept for Shopping Cart

import { type Product } from "@/model/products";
import { reactive } from "vue";

export type ShoppingCartItem = {
  product: Product;
  quantity: number;
};

export const cart = reactive([] as ShoppingCartItem[]);

export const getCart = () => cart;

export const addToCart = (product: Product) => {
  const item = cart.find((item) => item.product.id === product.id);
  if (item) {
    item.quantity++;
  } else {
    //
    cart.push({ product, quantity: 1 });
  }
};

export const removeFromCart = (product: Product, quantity?: number) => {
  const item = cart.find((item) => item.product.id === product.id);
  if (item) {
    // quantity is specified quantity or all items
    quantity = quantity ?? item.quantity;
    item.quantity--;
    if (item.quantity <= 0) {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }
  }
};

export const clearCart = () => {
    cart.splice(0, cart.length);
};

//1st time run, sum = 0, item is first item in our list
export const total = computed(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0));

export const count = computed(() => cart.reduce((sum, item) => sum + item.quantity, 0);
