# Thiết kế Form Tính Tiền Hoa - Mừng Trung Flowers

## Tổng quan
Ứng dụng giúp người dùng (đặc biệt là trên điện thoại di động) có thể nhanh chóng nhập thông tin đơn hàng hoa theo từng tầng và từng loại hoa, sau đó tự động tính toán tổng tiền và hiển thị tóm tắt.

## Mục tiêu thiết kế
- **Mobile First:** Giao diện 1 cột duy nhất, các nút bấm lớn, dễ chạm.
- **Tính toán thời gian thực:** Tổng tiền cập nhật ngay khi thay đổi số lượng hoặc đơn giá.
- **Trạng thái thu gọn:** Giảm bớt sự rườm rà của form nhập liệu sau khi đã có kết quả tính toán.

## Kiến trúc & Công nghệ
- **Framework:** React 19 (TypeScript).
- **Styling:** Tailwind CSS (Responsive).
- **State Management:** React `useState` và `useMemo` để quản lý danh sách tầng và tính toán tổng tiền.

## Cấu trúc dữ liệu
```typescript
interface FlowerItem {
  id: string;
  type: string;        // Loại hoa (select)
  trays: number;      // Số khay
  pots: number;       // Số chậu trong mỗi khay
  unitPrice: number;  // Đơn giá mỗi chậu
  label: string;      // Tên hoa trong chậu (ghi chú màu sắc/đặc điểm)
}

interface Floor {
  id: string;
  name: string;       // Tên tầng (Tầng 1, Tầng 2, ...)
  items: FlowerItem[];
}

interface OrderState {
  customerName: string;
  floors: Floor[];
  isCollapsed: boolean; // Trạng thái thu gọn/mở rộng form
}
```

## Các thành phần giao diện (Components)
1. **Header:** Hiển thị tên ứng dụng và trạng thái đơn hàng.
2. **CustomerInput:** Ô nhập tên khách hàng lớn ở trên cùng.
3. **FloorList:** Danh sách các tầng, mỗi tầng là một Card.
4. **FlowerItemRow:** Mỗi dòng nhập liệu cho một loại hoa bên trong tầng.
5. **SummaryFooter:** Hiển thị tổng tiền và nút "Hoàn tất / Chỉnh sửa".

## Luồng hoạt động
1. Người dùng nhập tên khách hàng.
2. Mặc định có 1 Tầng với 1 Loại hoa.
3. Người dùng có thể:
   - Thêm tầng mới (Nút "+ Thêm Tầng").
   - Thêm loại hoa vào một tầng (Nút "+ Thêm loại hoa").
   - Xóa tầng hoặc xóa loại hoa bất kỳ.
4. Khi nhấn "Hoàn tất":
   - Form nhập liệu ẩn đi (thu gọn).
   - Hiển thị danh sách tóm tắt (Tầng -> Loại hoa -> Thành tiền).
   - Tổng tiền hiển thị nổi bật.
5. Khi nhấn "Chỉnh sửa":
   - Form nhập liệu hiện lại đầy đủ để thay đổi thông tin.

## Kiểm thử & Xác nhận
- Kiểm tra tính toán: `Thành tiền mỗi tầng = số khay * số chậu * đơn giá`. `Tổng tiền = Σ Thành tiền mỗi tầng`.
- Kiểm tra Responsive: Đảm bảo giao diện không bị vỡ trên các màn hình từ 320px trở lên.
- Kiểm tra thao tác: Các ô input `number` phải gọi bàn phím số trên mobile.
