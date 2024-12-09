export interface TrackingInfo {
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
