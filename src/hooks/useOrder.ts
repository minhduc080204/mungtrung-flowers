import { useState, useMemo, useCallback } from 'react';
import type { OrderState, FlowerItem } from '../types';

export function useOrder() {
  const [order, setOrder] = useState<OrderState>({
    customerName: '',
    items: [{
      id: crypto.randomUUID(),
      type: '',
      trays: 0,
      pots: 0,
      unitPrice: 0
    }],
    isCollapsed: false
  });

  const totals = useMemo(() => {
    const grandTotal = order.items.reduce((sum, item) => 
      sum + (item.trays * item.pots * item.unitPrice), 0);
    return { grandTotal };
  }, [order.items]);

  const setCustomerName = useCallback((name: string) => {
    setOrder(prev => ({ ...prev, customerName: name }));
  }, []);

  const addItem = useCallback(() => {
    setOrder(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: crypto.randomUUID(),
          type: '',
          trays: 0,
          pots: 0,
          unitPrice: 0
        }
      ]
    }));
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setOrder(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== itemId)
    }));
  }, []);

  const updateItem = useCallback((itemId: string, updates: Partial<FlowerItem>) => {
    setOrder(prev => ({
      ...prev,
      items: prev.items.map(i => i.id === itemId ? { ...i, ...updates } : i)
    }));
  }, []);

  const toggleCollapse = useCallback(() => {
    setOrder(prev => ({ ...prev, isCollapsed: !prev.isCollapsed }));
  }, []);

  return {
    order,
    totals,
    setCustomerName,
    addItem,
    removeItem,
    updateItem,
    toggleCollapse
  };
}
