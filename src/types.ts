export interface FlowerItem {
  id: string;
  type: string;        // Manual text input
  trays: number;      // Số khay
  pots: number;       // Số chậu trong mỗi khay
  unitPrice: number;  // Đơn giá mỗi chậu
}

export interface OrderState {
  customerName: string;
  items: FlowerItem[];
  isCollapsed: boolean;
}

export const CURRENTCY_DEFAULT = 'CZK';
