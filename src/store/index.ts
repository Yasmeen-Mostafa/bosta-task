import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./features/shipmentDetails/slice";

const store = configureStore({
  reducer: {
    shipment: shipmentReducer, // Add the shipment slice
  },
});

export type RootState = ReturnType<typeof store.getState>; // Type for the state
export type AppDispatch = typeof store.dispatch; // Type for dispatch

export default store;
