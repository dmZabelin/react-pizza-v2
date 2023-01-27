import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TSort = {
  name: string;
  sortProperty: 'price_desc' | 'price_asc' | 'rating' | 'title';
}

export interface IFilterSlice {
  categoryId: number;
  sort: TSort,
}

const initialState: IFilterSlice = {
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
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSortBy: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilterSlice>) => {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSortBy, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
