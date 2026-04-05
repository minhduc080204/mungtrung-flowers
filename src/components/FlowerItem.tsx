import React from 'react';
import { type FlowerItem as FlowerItemType } from '../types';
import { Trash2 } from 'lucide-react';

interface Props {
  item: FlowerItemType;
  onUpdate: (updates: Partial<FlowerItemType>) => void;
  onRemove: () => void;
}

export const FlowerItem: React.FC<Props> = ({ item, onUpdate, onRemove }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 mb-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-3">
        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Loại hoa</label>
        <input
          type="text"
          value={item.type}
          onChange={(e) => onUpdate({ type: e.target.value })}
          placeholder="Nhập tên loại hoa..."
          className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 text-base focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Khay</label>
          <input
            type="number"
            inputMode="numeric"
            value={item.trays || 0}
            onChange={(e) => onUpdate({ trays: Number(e.target.value) })}
            placeholder="Số lượng khay..."
            className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-center bg-slate-50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Chậu</label>
          <input
            type="number"
            inputMode="numeric"
            value={item.pots || 0}
            onChange={(e) => onUpdate({ pots: Number(e.target.value) })}
            placeholder="Số lượng chậu..."
            className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-center bg-slate-50"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Đơn giá</label>
          <input
            type="number"
            inputMode="numeric"
            value={item.unitPrice || 0}
            onChange={(e) => onUpdate({ unitPrice: Number(e.target.value) })}
            placeholder="Đơn giá..."
            className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-center font-bold text-green-700 bg-slate-50"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
        <div className="text-sm font-bold text-slate-800">
          <span className="text-slate-500 font-normal mr-1">Thành tiền:</span>
          {(item.trays * item.pots * item.unitPrice).toLocaleString()} kus
        </div>
        <button
          onClick={onRemove}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};
