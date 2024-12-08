import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface TrackingInfo {
  provider: string;
  Type: string;
  ScheduleDate: string;
  CurrentStatus: {
    state: string;
    code: number;
    timestamp: string;
  };
  TrackingNumber: string;
  CreateDate: string;
  DropOffAddress: {
    firstLine: string;
    city: {
      _id: string;
      name: string;
    };
    zone: {
      _id: string;
      name: string;
    };
    district: string;
    buildingNumber: string;
    secondLine: string;
  };
  PromisedDate: string;
  isEditableShipment: boolean;
  nextWorkingDay: {
    dayDate: string;
    dayName: string;
  }[];
  collectedFromBusiness: string;
  canRequestPOSMachine: boolean;
  canPayOnline: boolean;
  isOnlinePaymentFeatureEnabled: boolean;
}

interface ShipmentState {
  details: TrackingInfo | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ShipmentState = {
  details: null,
  isLoading: false,
  error: null,
};

// Async thunk for fetching shipment details
export const fetchShipmentDetails = createAsyncThunk(
  "shipment/fetchDetails",
  async ({ id, lang }: { id: number; lang: string }) => {
    const response = await axios.get(
      `https://tracking.bosta.co/shipments/track/${id}`,
      {
        headers: {
          "x-requested-by": "Bosta",
        },
        params: {
          lang: lang,
        },
      }
    );
    return response.data;
  }
);

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
        state.error =
          action.error.message || "Failed to fetch shipment details";
      });
  },
});

export default shipmentSlice.reducer;
