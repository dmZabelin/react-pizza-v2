import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getDataFromLS } from '../../utils/getDataFromLS';

export interface ICartSlice {
  totalPrice: number;
  items: TCartItem[];
}

export type TCartItem = {
  id: number;
  title: string;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
  price: number;
}

const { items, totalPrice } = getDataFromLS();

const initialState: ICartSlice = {
  totalPrice: totalPrice,
  items: items,
};

export function calcTotalPrice(items: TCartItem[]) {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem: (state, action: PayloadAction<TCartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        const currentPrice = findItem.price * findItem.count;
        state.totalPrice = state.totalPrice - currentPrice;
      }
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
