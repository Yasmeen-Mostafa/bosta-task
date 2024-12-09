import axios from "axios";
import { BaseURL } from "../constants/constant";
import { TrackingInfo } from "./models/interfaces/tracking-info.interface";

export const getShipmentDetails: (
  id: number,
  lang: string
) => Promise<TrackingInfo> = async (id: number, lang: string) => {
  const response = await axios.get(`${BaseURL}/shipments/track/${id}`, {
    headers: {
      "x-requested-by": "Bosta",
    },
    params: {
      lang: lang,
    },
  });

  return response.data;
};
