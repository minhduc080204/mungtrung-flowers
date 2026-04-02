import React from 'react';
import type { Floor, FlowerItem as FlowerItemType } from '../types';
import { FlowerItem } from './FlowerItem';
import { PlusCircle, Trash } from 'lucide-react';

interface Props {
  floor: Floor;
  onAddItem: () => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateItem: (itemId: string, updates: Partial<FlowerItemType>) => void;
  onRemoveFloor: () => void;
  floorTotal: number;
}

export const FloorCard: React.FC<Props> = ({
  floor,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  onRemoveFloor,
  floorTotal
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 flex justify-between items-center border-b border-slate-200">
        <h3 className="font-bold text-slate-800">{floor.name}</h3>
        <button
          onClick={onRemoveFloor}
          className="text-red-500 flex items-center gap-1 text-xs font-medium hover:bg-red-50 px-2 py-1 rounded"
        >
          <Trash size={14} /> Xóa tầng
        </button>
      </div>

      <div className="p-4">
        {floor.items.map(item => (
          <FlowerItem
            key={item.id}
            item={item}
            onUpdate={(updates) => onUpdateItem(item.id, updates)}
            onRemove={() => onRemoveItem(item.id)}
          />
        ))}

        <button
          onClick={onAddItem}
          className="w-full py-3 mt-2 flex items-center justify-center gap-2 text-blue-600 bg-blue-50 border border-dashed border-blue-300 rounded-lg font-medium text-sm hover:bg-blue-100 transition-colors"
        >
          <PlusCircle size={18} /> Thêm loại hoa
        </button>

        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-sm text-slate-500 font-medium">Tổng tiền tầng:</span>
          <span className="text-lg font-bold text-slate-800">{floorTotal.toLocaleString()} đ</span>
        </div>
      </div>
    </div>
  );
};
