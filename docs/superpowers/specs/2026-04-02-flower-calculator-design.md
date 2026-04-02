# Thiết kế Form Tính Tiền Hoa - Mừng Trung Flowers (Phiên bản Đơn giản)

## Tổng quan
Ứng dụng giúp người dùng nhanh chóng nhập thông tin đơn hàng hoa theo từng loại, tự động tính toán tổng tiền và hiển thị tóm tắt chi tiết. Phiên bản này đã loại bỏ khái niệm "Tầng" để tối giản quy trình nhập liệu.

## Mục tiêu thiết kế
- **Giao diện phẳng:** Loại bỏ các tầng (floors), chỉ còn một danh sách các loại hoa trực tiếp.
- **Nhập liệu linh hoạt:** Loại hoa được nhập thủ công bằng text input thay vì chọn từ danh sách có sẵn.
- **Hiển thị chi tiết:** Tóm tắt sau khi xác nhận sẽ hiển thị đầy đủ công thức tính: `Số khay x Số chậu x Đơn giá`.
- **Tối ưu Mobile:** Bỏ thanh tiêu đề dính (sticky header) để tăng không gian hiển thị, thu nhỏ nút xác nhận để cân đối giao diện.

## Kiến trúc & Công nghệ
- **Framework:** React 19 (TypeScript).
- **Styling:** Tailwind CSS.
- **State Management:** React `useState` quản lý danh sách `FlowerItem`.

## Cấu trúc dữ liệu
```typescript
interface FlowerItem {
  id: string;
  type: string;        // Tên loại hoa (nhập text thủ công)
  trays: number;      // Số khay
  pots: number;       // Số chậu trong mỗi khay
  unitPrice: number;  // Đơn giá mỗi chậu
}

interface OrderState {
  customerName: string;
  items: FlowerItem[];
  isCollapsed: boolean;
}
```

## Các thành phần giao diện (Components)
1. **Header:** Hiển thị tên ứng dụng (không còn sticky).
2. **CustomerInput:** Nhập tên khách hàng.
3. **FlowerList:** Danh sách các loại hoa trực tiếp trong main view.
4. **FlowerItemRow:** Dòng nhập liệu cho một loại hoa (nhập tên hoa, số khay, số chậu, đơn giá).
5. **SummaryFooter:** Tổng tiền và nút "Xác nhận & Hoàn tất" (kích thước nhỏ hơn).

## Luồng hoạt động
1. Người dùng nhập tên khách hàng.
2. Thêm các loại hoa vào danh sách.
3. Nhập tên hoa thủ công, số lượng và đơn giá.
4. Nhấn "Xác nhận & Hoàn tất":
   - Form nhập liệu ẩn đi.
   - Hiển thị danh sách tóm tắt: `[Tên hoa]: [Khay] khay x [Chậu] chậu x [Đơn giá] đ = [Thành tiền] đ`.
5. Tổng tiền hiển thị ở footer.

## Kiểm thử & Xác nhận
- Kiểm tra tính toán: `Thành tiền mỗi loại = số khay * số chậu * đơn giá`.
- Kiểm tra giao diện: Đảm bảo header cuộn theo trang và nút xác nhận có kích thước hợp lý.
- Kiểm tra dữ liệu: Tên hoa nhập tay phải được lưu đúng.
