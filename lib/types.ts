export interface GasRecord {
  refill_id?: number;
  distance: number;
  litres: number;
  price: number;
  created_on: string | null;
}

export interface ResponseObj {
  body: string;
  headers: { [key: string]: string };
  status?: number;
}
