import { useState, useMemo, useCallback } from 'react';
import type { OrderState, FlowerItem } from '../types';

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
    const floorTotals = order.floors.map(floor => {
      return floor.items.reduce((sum, item) => 
        sum + (item.trays * item.pots * item.unitPrice), 0);
    });
    const grandTotal = floorTotals.reduce((sum, current) => sum + current, 0);
    return { floorTotals, grandTotal };
  }, [order.floors]);
  const setCustomerName = useCallback((name: string) => {
    setOrder(prev => ({ ...prev, customerName: name }));
  }, []);

  const addFloor = useCallback(() => {
    setOrder(prev => ({
      ...prev,
      floors: [
        ...prev.floors,
        {
          id: crypto.randomUUID(),
          name: `Tầng ${prev.floors.length + 1}`,
          items: [{
            id: crypto.randomUUID(),
            type: 'Thược dược',
            trays: 0,
            pots: 0,
            unitPrice: 0,
            label: ''
          }]
        }
      ]
    }));
  }, []);

  const removeFloor = useCallback((floorId: string) => {
    setOrder(prev => {
      const remainingFloors = prev.floors.filter(f => f.id !== floorId);
      const updatedFloors = remainingFloors.map((f, idx) => ({
        ...f,
        name: `Tầng ${idx + 1}`
      }));
      return {
        ...prev,
        floors: updatedFloors
      };
    });
  }, []);

  const addItem = useCallback((floorId: string) => {
    setOrder(prev => ({
      ...prev,
      floors: prev.floors.map(f =>
        f.id === floorId
          ? {
              ...f,
              items: [
                ...f.items,
                {
                  id: crypto.randomUUID(),
                  type: 'Thược dược',
                  trays: 0,
                  pots: 0,
                  unitPrice: 0,
                  label: ''
                }
              ]
            }
          : f
      )
    }));
  }, []);

  const removeItem = useCallback((floorId: string, itemId: string) => {
    setOrder(prev => ({
      ...prev,
      floors: prev.floors.map(f =>
        f.id === floorId
          ? { ...f, items: f.items.filter(i => i.id !== itemId) }
          : f
      )
    }));
  }, []);

  const updateItem = useCallback((floorId: string, itemId: string, updates: Partial<FlowerItem>) => {
    setOrder(prev => ({
      ...prev,
      floors: prev.floors.map(f =>
        f.id === floorId
          ? {
              ...f,
              items: f.items.map(i => i.id === itemId ? { ...i, ...updates } : i)
            }
          : f
      )
    }));
  }, []);

  const toggleCollapse = useCallback(() => {
    setOrder(prev => ({ ...prev, isCollapsed: !prev.isCollapsed }));
  }, []);

  return {
    order,
    totals,
    setCustomerName,
    addFloor,
    removeFloor,
    addItem,
    removeItem,
    updateItem,
    toggleCollapse
  };
}
