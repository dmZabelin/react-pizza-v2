import { createSlice } from '@reduxjs/toolkit';

export interface IFilterSlice {
  categoryId: number;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortBy: (state, action) => {
      state.sort = action.payload;
    },
    setFilters: (state, action) => {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSortBy, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
