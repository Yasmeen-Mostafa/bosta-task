import { TrackingInfo } from "../../../../common/api/shipment-details/models/interfaces/tracking-info.interface";

export interface ShipmentState {
  details: TrackingInfo | null;
  isLoading: boolean;
  error: string | null;
}
