import { calcTotalPrice } from '../redux/slices/cartSlice';

export function getDataFromLS() {
  const storage = localStorage.getItem('items');
  const items = storage ? JSON.parse(storage) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items, totalPrice
  }
}