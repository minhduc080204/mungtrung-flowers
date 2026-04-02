export interface FlowerItem {
  id: string;
  type: string;        // Changed to string for manual input
  trays: number;      // Số khay
  pots: number;       // Số chậu trong mỗi khay
  unitPrice: number;  // Đơn giá mỗi chậu
}

export interface OrderState {
  customerName: string;
  items: FlowerItem[]; // Flattened: no more floors
  isCollapsed: boolean;
}

export const FLOWER_TYPES = []; // No longer needed for dropdown but can keep empty for now or remove
