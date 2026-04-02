export interface FlowerItem {
  id: string;
  type: string;
  trays: number;      // Số khay
  pots: number;       // Số chậu trong mỗi khay
  unitPrice: number;  // Đơn giá mỗi chậu
  label: string;      // Tên hoa trong chậu
}

export interface Floor {
  id: string;
  name: string;
  items: FlowerItem[];
}

export interface OrderState {
  customerName: string;
  floors: Floor[];
  isCollapsed: boolean;
}

export const FLOWER_TYPES = [
  "Thược dược",
  "Cúc đại đóa",
  "Hoa ly",
  "Hoa hồng",
  "Hoa lan",
  "Cúc họa mi"
];
