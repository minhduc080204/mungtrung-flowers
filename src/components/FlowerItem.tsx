import React from 'react';
import { type FlowerItem as FlowerItemType, FLOWER_TYPES } from '../types';
import { Trash2 } from 'lucide-react';

interface Props {
  item: FlowerItemType;
  onUpdate: (updates: Partial<FlowerItemType>) => void;
  onRemove: () => void;
}

export const FlowerItem: React.FC<Props> = ({ item, onUpdate, onRemove }) => {
  return (
    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-3 last:mb-0">
      <div className="mb-3">
        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Loại hoa</label>
        <select
          value={item.type}
          onChange={(e) => onUpdate({ type: e.target.value })}
          className="w-full p-2 border border-slate-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {FLOWER_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Số khay</label>
          <input
            type="number"
            inputMode="numeric"
            value={item.trays || ''}
            onChange={(e) => onUpdate({ trays: Number(e.target.value) })}
            placeholder="0"
            className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Số chậu/khay</label>
          <input
            type="number"
            inputMode="numeric"
            value={item.pots || ''}
            onChange={(e) => onUpdate({ pots: Number(e.target.value) })}
            placeholder="0"
            className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Đơn giá/chậu</label>
          <input
            type="number"
            inputMode="numeric"
            value={item.unitPrice || ''}
            onChange={(e) => onUpdate({ unitPrice: Number(e.target.value) })}
            placeholder="0"
            className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium text-green-700"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tên trong chậu</label>
          <input
            type="text"
            value={item.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            placeholder="Màu sắc..."
            className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-top border-slate-200">
        <div className="text-sm font-bold text-slate-700">
          Thành tiền: {(item.trays * item.pots * item.unitPrice).toLocaleString()} đ
        </div>
        <button
          onClick={onRemove}
          className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
