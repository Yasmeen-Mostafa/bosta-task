import { createSlice } from "@reduxjs/toolkit";
import { ShipmentState } from "./models/shipment-details-initial-state.interface";
import { shipmentReducer } from "./reducer";

const initialState: ShipmentState = {
  details: null,
  isLoading: false,
  error: null,
};

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {},
  extraReducers: shipmentReducer,
});

export default shipmentSlice.reducer;
