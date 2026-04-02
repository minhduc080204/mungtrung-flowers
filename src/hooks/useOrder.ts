import { useState, useMemo, useCallback } from 'react';
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
    setOrder(prev => ({
      ...prev,
      floors: prev.floors.filter(f => f.id !== floorId)
    }));
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
