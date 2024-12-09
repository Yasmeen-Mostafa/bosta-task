import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { ShipmentState } from "./models/shipment-details-initial-state.interface";
import { getShipmentDetails } from "../../../common/api/shipment-details/shipment-details.api";

// Async thunk for fetching shipment details
export const fetchShipmentDetails = createAsyncThunk(
  "shipment/fetchDetails",
  ({ id, lang }: { id: number; lang: string }) => getShipmentDetails(id, lang)
);

export const shipmentReducer = (
  builder: ActionReducerMapBuilder<ShipmentState>
) => {
  builder
    .addCase(fetchShipmentDetails.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchShipmentDetails.fulfilled, (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchShipmentDetails.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch shipment details";
    });
};
