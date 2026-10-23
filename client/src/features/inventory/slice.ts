import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InventoryType } from './types';

const initialState: InventoryType = {
  selectedOrderId: null,
  productType: null,
  isOpenProductForm: false,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setOrderId(state, action: PayloadAction<number | null>) {
      state.selectedOrderId = action.payload;
    },
    setProductType(state, action: PayloadAction<string | null>) {
      state.productType = action.payload;
    },
    setOpenProductForm(state, action: PayloadAction<boolean>) {
      state.isOpenProductForm = action.payload;
    },
  },
});

export const { setOrderId, setProductType, setOpenProductForm } = inventorySlice.actions;
export default inventorySlice.reducer;
