import { clsx, type ClassValue } from 'clsx';
import { Edit3, Flower2, PlusCircle, ReceiptText } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { FloorCard } from './components/FloorCard';
import { useOrder } from './hooks/useOrder';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function App() {
  const {
    order,
    totals,
    setCustomerName,
    addFloor,
    removeFloor,
    addItem,
    removeItem,
    updateItem,
    toggleCollapse
  } = useOrder();

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Flower2 size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Mừng Trung Flowers</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4">
        {/* Customer Input */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Khách hàng</label>
          <input
            type="text"
            value={order.customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nhập tên khách hàng..."
            className="w-full border-none text-xl font-medium outline-none text-slate-800 placeholder:text-slate-300"
          />
        </div>

        {order.isCollapsed ? (
          /* Summary View */
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <ReceiptText size={18} className="text-blue-600" />
                Tóm tắt đơn hàng
              </h2>
              <button
                onClick={toggleCollapse}
                className="text-blue-600 text-sm font-medium flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-blue-200 shadow-sm"
              >
                <Edit3 size={14} /> Chỉnh sửa
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-slate-500">Khách hàng:</p>
                <p className="text-lg font-bold text-slate-800">{order.customerName || '(Trống)'}</p>
              </div>

              <div className="space-y-4">
                {order.floors.map((floor, idx) => (
                  <div key={floor.id} className="border-t border-slate-100 pt-3">
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="font-bold text-slate-700">{floor.name}</h3>
                      <span className="font-bold text-slate-800">{totals.floorTotals[idx].toLocaleString()} đ</span>
                    </div>
                    <ul className="space-y-1">
                      {floor.items.map(item => (
                        <li key={item.id} className="text-sm text-slate-600 flex justify-between">
                          <span>
                            {item.type}
                            {item.label && <span className="text-slate-400"> ({item.label})</span>}:
                            <span className="ml-1 font-medium">{item.trays} khay × {item.pots} chậu</span>
                          </span>
                          <span className="text-slate-400">{(item.trays * item.pots * item.unitPrice).toLocaleString()} đ</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Edit View */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {order.floors.map((floor, idx) => (
              <FloorCard
                key={floor.id}
                floor={floor}
                floorTotal={totals.floorTotals[idx]}
                onAddItem={() => addItem(floor.id)}
                onRemoveItem={(itemId) => removeItem(floor.id, itemId)}
                onUpdateItem={(itemId, updates) => updateItem(floor.id, itemId, updates)}
                onRemoveFloor={() => removeFloor(floor.id)}
              />
            ))}

            <button
              onClick={addFloor}
              className="w-full py-4 mb-8 flex items-center justify-center gap-2 text-slate-600 bg-white border-2 border-dashed border-slate-200 rounded-xl font-bold text-sm hover:border-slate-300 transition-colors"
            >
              <PlusCircle size={20} /> Thêm Tầng Mới
            </button>
          </div>
        )}
      </main>

      {/* Sticky Bottom Summary */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Tổng cộng đơn hàng:</p>
              <p className="text-3xl font-black text-slate-900 leading-none">
                {totals.grandTotal.toLocaleString()} <span className="text-lg">đ</span>
              </p>
            </div>
            {!order.isCollapsed && (
              <p className="text-xs text-slate-400 font-medium">
                {order.floors.length} tầng, {order.floors.reduce((acc, f) => acc + f.items.length, 0)} loại hoa
              </p>
            )}
          </div>

          <button
            onClick={toggleCollapse}
            className={cn(
              "w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-[0.98]",
              order.isCollapsed
                ? "bg-slate-800 text-white"
                : "bg-green-600 text-white"
            )}
          >
            {order.isCollapsed ? 'Quay lại chỉnh sửa' : 'Xác nhận & Hoàn tất'}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
