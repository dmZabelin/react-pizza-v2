import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: '',
};

export const fetchProductItems = createAsyncThunk('product/fetchProductItems', async (params) => {
  const { order, cat, search, categoryId, currentPage } = params;
  const { data } = await axios.get(
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
      state.status = 'loading';
    });
    builder.addCase(fetchProductItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchProductItems.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const { setItems } = productSlice.actions;
export default productSlice.reducer;
