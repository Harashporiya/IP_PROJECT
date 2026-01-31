import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemList: [],
  totalQuantity: 0,
  showCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.itemList.find((item) => item._id === newItem._id);

      if (existingItem) {
        if (existingItem.quantity < existingItem.productQuantity) {
          existingItem.quantity++;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        }
      } else {
        state.itemList.push({
          _id: newItem._id,
          name: newItem.name,
          brand: newItem.brand,
          category: newItem.category,
          selectHostel: newItem.selectHostel,
          hostleName: newItem.hostleName,
          roomNumber: newItem.roomNumber,
          dayScholarContectNumber: newItem.dayScholarContectNumber,
          price: newItem.newAmount,
          prevPrice: newItem.prevAmount,
          totalPrice: newItem.newAmount,
          image: newItem.image,
          productQuantity: newItem.quantity, 
          quantity: 1,
        });
        state.totalQuantity++;
      }
    },

    removeFromCart: (state, action) => {
      const findItem = state.itemList.find((item) => item._id === action.payload._id);

      if (findItem) {
        if (findItem.quantity > 1) {
          findItem.quantity--;
          findItem.totalPrice -= findItem.price;
        } else {
          state.itemList = state.itemList.filter((item) => item._id !== action.payload._id);
          state.totalQuantity--;
        }
      }
    },

    updateCart: (state, action) => {
    
      let items = [];
      
      
      if (action.payload.item && Array.isArray(action.payload.item)) {
        items = action.payload.item;
      } else if (action.payload.items && Array.isArray(action.payload.items)) {
        items = action.payload.items;
      } else if (action.payload.product) {
       
        return; 
      } else if (Array.isArray(action.payload)) {
        items = action.payload;
      } else {
       
        return;
      }
      
      
      state.itemList = items.map(item => ({
        _id: item.productId || item._id,
        name: item.name,
        brand: item.brand,
        category: item.category,
        selectHostel: item.selectHostel,
        hostleName: item.hostleName,
        roomNumber: item.roomNumber,
        dayScholarContectNumber: item.dayScholarContectNumber,
        price: item.price,
        prevPrice: item.prevPrice,
        totalPrice: item.totalPrice,
        image: item.image,
        productQuantity: item.productQuantity,
        quantity: item.quantity,
      }));
      
      state.totalQuantity = items.length;
    },
    
    setShowCart: (state) => {
      state.showCart = !state.showCart;
    },
    
    initializeCart: (state, action) => {
      const items = action.payload?.item || action.payload?.items || [];
      
      state.itemList = items.map(item => ({
        _id: item.productId || item._id,
        name: item.name,
        brand: item.brand,
        category: item.category,
        selectHostel: item.selectHostel,
        hostleName: item.hostleName,
        roomNumber: item.roomNumber,
        dayScholarContectNumber: item.dayScholarContectNumber,
        price: item.price,
        prevPrice: item.prevPrice,
        totalPrice: item.totalPrice,
        image: item.image,
        productQuantity: item.productQuantity,
        quantity: item.quantity,
      }));
      
      state.totalQuantity = items.length;
    },
  },
});

export const { addToCart, removeFromCart, setShowCart, updateCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;
