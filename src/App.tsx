import { clsx, type ClassValue } from 'clsx';
import { Edit3, Flower2, PlusCircle, ReceiptText } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { FlowerItem } from './components/FlowerItem';
import { useOrder } from './hooks/useOrder';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function App() {
  const {
    order,
    totals,
    setCustomerName,
    addItem,
    removeItem,
    updateItem,
    toggleCollapse
  } = useOrder();

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header - Not Sticky as per Spec */}
      <header className="bg-white px-4 py-8 border-b border-slate-100">
        <div className="max-w-md mx-auto flex flex-col items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
            <Flower2 size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center">Mừng Trung Flowers</h1>
          <p className="text-slate-400 text-sm font-medium">Hệ thống tính tiền hoa chuyên nghiệp</p>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 animate-in fade-in duration-500">
        {/* Customer Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-8">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tên khách hàng</label>
          <input
            type="text"
            value={order.customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nhập tên khách hàng..."
            className="w-full border-none text-2xl font-bold outline-none text-slate-800 placeholder:text-slate-200"
          />
        </div>

        {order.isCollapsed ? (
          /* Summary View */
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <ReceiptText size={20} className="text-blue-600" />
                Đơn hàng hoàn tất
              </h2>
              <button
                onClick={toggleCollapse}
                className="text-blue-600 text-sm font-bold flex items-center gap-1.5 bg-white px-4 py-1.5 rounded-full border border-blue-100 shadow-sm hover:bg-blue-50 transition-colors"
              >
                <Edit3 size={14} /> Chỉnh sửa
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6 pb-4 border-b border-dashed border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Khách hàng</p>
                <p className="text-xl font-black text-blue-900">{order.customerName || '(Chưa nhập tên)'}</p>
              </div>

              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={item.id} className="relative pl-4 border-l-2 border-blue-100">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-800">{idx + 1}. {item.type || 'Loại hoa chưa đặt tên'}</h3>
                    </div>
                    <div className="flex flex-col text-sm text-slate-500">
                      <span className="font-medium">
                        {item.trays} khay × {item.pots} chậu × {item.unitPrice.toLocaleString()} kus
                      </span>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">Thành tiền</span>
                        <span className="font-black text-slate-900">{(item.trays * item.pots * item.unitPrice).toLocaleString()} kus</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Edit View */
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1 mb-2">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Danh sách loại hoa</h2>
              <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{order.items.length} LOẠI</span>
            </div>
            
            {order.items.map((item) => (
              <FlowerItem
                key={item.id}
                item={item}
                onUpdate={(updates) => updateItem(item.id, updates)}
                onRemove={() => removeItem(item.id)}
              />
            ))}

            <button
              onClick={addItem}
              className="w-full py-5 flex items-center justify-center gap-3 text-blue-600 bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-2xl font-black text-sm hover:bg-blue-50 hover:border-blue-300 transition-all active:scale-[0.99]"
            >
              <PlusCircle size={20} /> Thêm Loại Hoa Mới
            </button>
          </div>
        )}
      </main>

      {/* Sticky Bottom Summary */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-20">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tổng cộng</p>
              <p className="text-2xl font-black text-slate-900 leading-none mt-1">
                {totals.grandTotal.toLocaleString()} <span className="text-xs font-bold text-slate-400">kus</span>
              </p>
            </div>
          </div>

          <button
            onClick={toggleCollapse}
            className={cn(
              "w-full py-2.5 rounded-xl font-black text-base shadow-lg transition-all active:scale-[0.97] flex items-center justify-center gap-2",
              order.isCollapsed
                ? "bg-slate-900 text-white shadow-slate-200"
                : "bg-green-600 text-white shadow-green-200"
            )}
          >
            {order.isCollapsed ? (
              <>
                <Edit3 size={20} />
                Quay lại chỉnh sửa
              </>
            ) : (
              'Xác nhận & Hoàn tất'
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
