export interface RentingOrderItem {
  id: number;
  rentingPrice: string;
  rentingUnit: 'D' | 'W' |'M';
  currency: string;
  startDate: string;
  endDate: string;
  vehicleId: number;
  state: 'O'|'A'|'D';
  requesterId: number;
}
