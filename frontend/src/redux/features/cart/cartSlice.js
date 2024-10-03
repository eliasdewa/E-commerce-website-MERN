import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find((product) => product._id === action.payload._id)
      if (!isExist) {
        state.products.push({...action.payload, quantity: 1})
      } else {
        toast.error("Item already added to cart")
      }
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotalPrice = setGrandTotalPrice(state);
    },
  },
})

// Utilities functions
// TODO: if doesn't work, Check at 4:09:24
export const setSelectedItems = (state) => {
  return state.products.reduce((total, product) => Number(total + product.quantity))
}

export const setTotalPrice = (state) => {
  return state.products.reduce((total, product) => Number(total + product.quantity * product.price))
}

export const setTax = (state) => {
  return setTotalPrice(state) * state.taxRate
}

export const setGrandTotalPrice = (state) => {
  return setTotalPrice(state) + setTax(state)
}

// Action creators are generated for each case reducer function
export const { addToCart, decrement, incrementByAmount } = cartSlice.actions;

export default cartSlice.reducer