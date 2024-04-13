import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toppings: ['pepperoni'],
  gluten: true,
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    toggleGluten(state) {
      state.gluten = !state.gluten
    },
    addTopping: (state, action) => {
      console.log(state)
      console.log(action)
      state.toppings = [...state.toppings, action.payload]
    },
  }
});

export const { toggleGluten, addTopping} = pizzaSlice.actions

export default pizzaSlice.reducer