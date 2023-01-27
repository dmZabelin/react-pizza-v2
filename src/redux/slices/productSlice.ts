import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Status } from '../../@types/enums';

export type TParams = Record<string, string | number>

export type TProductItem = {
  id: number
  imageUrl: string
  title: string
  price: number
  category: number
  rating: number
  sizes: number[]
  types: number[]
}

export interface IProductSlice {
  items: TProductItem[],
  status: string,
}

const initialState: IProductSlice = {
  items: [],
  status: '',
};

export const fetchProductItems = createAsyncThunk<TProductItem[], TParams>('product/fetchProductItems', async (params) => {
  const { order, cat, search, categoryId, currentPage } = params;
  const { data } = await axios.get<TProductItem[]>(
    `https://63a9b662594f75dc1dbe1f39.mockapi.io/items?page=${currentPage}&limit=4${search}${
      categoryId > 0 ? `&category=${categoryId}` : ''
    }&sortBy=${cat}&order=${!order ? 'asc' : order}`,
  );
  return data;
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductItems.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchProductItems.fulfilled, (state, action: PayloadAction<TProductItem[]>) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProductItems.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export default productSlice.reducer;
