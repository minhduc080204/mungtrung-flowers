# Flower Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng ứng dụng tính tiền hoa Mừng Trung Flowers với giao diện 1 cột tối ưu mobile, hỗ trợ nhiều tầng và loại hoa, tự động tính toán và có khả năng thu gọn form sau khi hoàn tất.

**Architecture:** Sử dụng React `useState` để quản lý trạng thái đơn hàng phức tạp (nested floors and items). Sử dụng `useMemo` cho việc tính toán tổng tiền để tối ưu hiệu năng. Chia nhỏ UI thành các component tái sử dụng: `FloorCard`, `FlowerItemRow`, `OrderSummary`.

**Tech Stack:** React 19 (TS), Tailwind CSS, Lucide React (icons), clsx/tailwind-merge.

---

### Task 1: Cài đặt thư viện bổ trợ

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Cài đặt `lucide-react`, `clsx`, `tailwind-merge`**

Run: `npm install lucide-react clsx tailwind-merge`
Expected: Thư viện được cài đặt thành công và hiển thị trong `package.json`.

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install lucide-react, clsx, tailwind-merge"
```

---

### Task 2: Định nghĩa Types & Constants

**Files:**
- Create: `src/types.ts`

- [ ] **Step 1: Tạo file `src/types.ts` với các interface từ Spec**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/types.ts
git commit -m "feat: define order types and flower constants"
```

---

### Task 3: Hook Quản lý Trạng thái & Tính toán

**Files:**
- Create: `src/hooks/useOrder.ts`

- [ ] **Step 1: Implement `useOrder` hook với các logic CRUD tầng và loại hoa**

```typescript
import { useState, useMemo } from 'react';
import { OrderState, Floor, FlowerItem } from '../types';

export function useOrder() {
  const [order, setOrder] = useState<OrderState>({
    customerName: '',
    floors: [{
      id: crypto.randomUUID(),
      name: 'Tầng 1',
      items: [{
        id: crypto.randomUUID(),
        type: 'Thược dược',
        trays: 0,
        pots: 0,
        unitPrice: 0,
        label: ''
      }]
    }],
    isCollapsed: false
  });

  const totals = useMemo(() => {
    let total = 0;
    const floorTotals = order.floors.map(floor => {
      const floorTotal = floor.items.reduce((sum, item) => 
        sum + (item.trays * item.pots * item.unitPrice), 0);
      total += floorTotal;
      return floorTotal;
    });
    return { floorTotals, grandTotal: total };
  }, [order.floors]);

  // Implement functions: addFloor, removeFloor, addItem, removeItem, updateItem, setCustomerName, toggleCollapse
  // ... chi tiết implementation trong bước Act
  return { order, setOrder, totals };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useOrder.ts
git commit -m "feat: implement useOrder hook for state management"
```

---

### Task 4: UI Components - FlowerItem & FloorCard

**Files:**
- Create: `src/components/FlowerItem.tsx`
- Create: `src/components/FloorCard.tsx`

- [ ] **Step 1: Tạo `FlowerItem` component với input tối ưu mobile**

- [ ] **Step 2: Tạo `FloorCard` component hiển thị danh sách loại hoa**

- [ ] **Step 3: Commit**

```bash
git add src/components/FlowerItem.tsx src/components/FloorCard.tsx
git commit -m "feat: add FlowerItem and FloorCard components"
```

---

### Task 4: UI Hoàn thiện & App Integration

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Cập nhật `App.tsx` sử dụng `useOrder` và hiển thị form đầy đủ**

- [ ] **Step 2: Implement trạng thái Thu gọn (Summary view)**

- [ ] **Step 3: Kiểm tra giao diện trên Mobile (responsive)**

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: complete flower calculator implementation"
```
