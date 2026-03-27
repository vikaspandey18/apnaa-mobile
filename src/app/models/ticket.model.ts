export interface TicketRespone {
  id: string;
  total_tickets?: number;
  title?: string;
  mrp?: string;
  sold_tickets?: number;
}

export interface MrpTicket {
  id: number;
  mrp: number; // or string if API sends string
}
