export interface TicketRespone {
  id: string;
  total_tickets?: number;
  title?: string;
  mrp?: string;
  rate?: string;
  sold_tickets?: number;
  description?: string;
}

export interface MrpTicket {
  id: number;
  mrp: number;
  rate: number; // or string if API sends string
}
