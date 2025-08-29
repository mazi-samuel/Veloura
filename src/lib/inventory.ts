// Inventory Management System
import { api } from './api';

export interface InventoryItem {
  id: string;
  productId: string;
  shadeId?: string;
  sku: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  reorderPoint: number;
  reorderQuantity: number;
  cost: number;
  lastRestocked: string;
  location: string;
  expirationDate?: string;
  batchNumber?: string;
  supplier: {
    id: string;
    name: string;
    contactInfo: string;
  };
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';
}

export interface StockMovement {
  id: string;
  inventoryItemId: string;
  type: 'inbound' | 'outbound' | 'adjustment' | 'reservation' | 'release';
  quantity: number;
  reason: string;
  orderId?: string;
  userId?: string;
  timestamp: string;
  notes?: string;
}

export interface LowStockAlert {
  id: string;
  inventoryItemId: string;
  productName: string;
  shadeName?: string;
  currentQuantity: number;
  reorderPoint: number;
  severity: 'warning' | 'critical';
  createdAt: string;
  acknowledged: boolean;
}

export interface InventoryForecast {
  productId: string;
  shadeId?: string;
  currentStock: number;
  avgDailySales: number;
  forecastedRunOutDate: string;
  recommendedOrderQuantity: number;
  confidence: number;
}

class InventoryService {
  // Get inventory for a specific product/shade
  async getInventory(productId: string, shadeId?: string): Promise<InventoryItem | null> {
    try {
      const response = await fetch(`/api/inventory?productId=${productId}${shadeId ? `&shadeId=${shadeId}` : ''}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch inventory');
      }

      const data = await response.json();
      return data.inventory;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      return null;
    }
  }

  // Get all inventory items with filtering
  async getAllInventory(filters?: {
    status?: string;
    location?: string;
    lowStock?: boolean;
    productId?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    items: InventoryItem[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(`/api/inventory/all?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch inventory');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching all inventory:', error);
      throw error;
    }
  }

  // Check if product/shade is available for purchase
  async checkAvailability(productId: string, shadeId?: string, quantity: number = 1): Promise<{
    available: boolean;
    availableQuantity: number;
    estimated_restock?: string;
  }> {
    try {
      const inventory = await this.getInventory(productId, shadeId);
      
      if (!inventory) {
        return { available: false, availableQuantity: 0 };
      }

      const available = inventory.availableQuantity >= quantity;
      
      return {
        available,
        availableQuantity: inventory.availableQuantity,
        estimated_restock: !available ? this.estimateRestockDate(inventory) : undefined,
      };
    } catch (error) {
      console.error('Error checking availability:', error);
      return { available: false, availableQuantity: 0 };
    }
  }

  // Reserve inventory for checkout
  async reserveInventory(items: Array<{
    productId: string;
    shadeId?: string;
    quantity: number;
  }>, userId: string, orderId?: string): Promise<{
    success: boolean;
    reservations: Array<{
      productId: string;
      shadeId?: string;
      quantity: number;
      reserved: boolean;
      reason?: string;
    }>;
  }> {
    try {
      const response = await fetch('/api/inventory/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          userId,
          orderId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reserve inventory');
      }

      return await response.json();
    } catch (error) {
      console.error('Error reserving inventory:', error);
      throw error;
    }
  }

  // Release reserved inventory (e.g., when checkout fails)
  async releaseReservation(items: Array<{
    productId: string;
    shadeId?: string;
    quantity: number;
  }>, userId: string, reason: string = 'Checkout cancelled'): Promise<boolean> {
    try {
      const response = await fetch('/api/inventory/release', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          userId,
          reason,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error releasing reservation:', error);
      return false;
    }
  }

  // Process inventory after successful order
  async processOrder(orderId: string, items: Array<{
    productId: string;
    shadeId?: string;
    quantity: number;
  }>): Promise<boolean> {
    try {
      const response = await fetch('/api/inventory/process-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          items,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error processing order inventory:', error);
      return false;
    }
  }

  // Update inventory levels
  async updateInventory(inventoryItemId: string, updates: {
    quantity?: number;
    reorderPoint?: number;
    reorderQuantity?: number;
    location?: string;
    status?: string;
  }): Promise<InventoryItem | null> {
    try {
      const response = await fetch(`/api/inventory/${inventoryItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update inventory');
      }

      const data = await response.json();
      return data.inventory;
    } catch (error) {
      console.error('Error updating inventory:', error);
      return null;
    }
  }

  // Add new inventory
  async addInventory(inventoryData: {
    productId: string;
    shadeId?: string;
    sku: string;
    quantity: number;
    reorderPoint: number;
    reorderQuantity: number;
    cost: number;
    location: string;
    expirationDate?: string;
    batchNumber?: string;
    supplierId: string;
  }): Promise<InventoryItem | null> {
    try {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to add inventory');
      }

      const data = await response.json();
      return data.inventory;
    } catch (error) {
      console.error('Error adding inventory:', error);
      return null;
    }
  }

  // Get stock movements history
  async getStockMovements(inventoryItemId?: string, filters?: {
    type?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    movements: StockMovement[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const queryParams = new URLSearchParams();
      if (inventoryItemId) queryParams.append('inventoryItemId', inventoryItemId);
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(`/api/inventory/movements?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch stock movements');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching stock movements:', error);
      throw error;
    }
  }

  // Get low stock alerts
  async getLowStockAlerts(acknowledged: boolean = false): Promise<LowStockAlert[]> {
    try {
      const response = await fetch(`/api/inventory/alerts?acknowledged=${acknowledged}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch low stock alerts');
      }

      const data = await response.json();
      return data.alerts;
    } catch (error) {
      console.error('Error fetching low stock alerts:', error);
      return [];
    }
  }

  // Acknowledge low stock alert
  async acknowledgeAlert(alertId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/inventory/alerts/${alertId}/acknowledge`, {
        method: 'POST',
      });

      return response.ok;
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      return false;
    }
  }

  // Get inventory forecast
  async getInventoryForecast(days: number = 30): Promise<InventoryForecast[]> {
    try {
      const response = await fetch(`/api/inventory/forecast?days=${days}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch inventory forecast');
      }

      const data = await response.json();
      return data.forecasts;
    } catch (error) {
      console.error('Error fetching inventory forecast:', error);
      return [];
    }
  }

  // Generate reorder report
  async generateReorderReport(): Promise<{
    items: Array<{
      inventoryItem: InventoryItem;
      recommendedQuantity: number;
      urgency: 'low' | 'medium' | 'high' | 'critical';
      estimatedCost: number;
    }>;
    totalCost: number;
  }> {
    try {
      const response = await fetch('/api/inventory/reorder-report');
      
      if (!response.ok) {
        throw new Error('Failed to generate reorder report');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating reorder report:', error);
      throw error;
    }
  }

  // Bulk inventory operations
  async bulkUpdateInventory(updates: Array<{
    inventoryItemId: string;
    quantity?: number;
    reorderPoint?: number;
    status?: string;
  }>): Promise<{
    success: boolean;
    updated: number;
    failed: number;
    errors: string[];
  }> {
    try {
      const response = await fetch('/api/inventory/bulk-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates }),
      });

      if (!response.ok) {
        throw new Error('Failed to bulk update inventory');
      }

      return await response.json();
    } catch (error) {
      console.error('Error bulk updating inventory:', error);
      throw error;
    }
  }

  // Private helper methods
  private estimateRestockDate(inventory: InventoryItem): string {
    // Simple estimation based on supplier lead time (default 7 days)
    const leadTimeDays = 7;
    const restockDate = new Date();
    restockDate.setDate(restockDate.getDate() + leadTimeDays);
    return restockDate.toISOString().split('T')[0];
  }

  // Real-time inventory sync
  subscribeToInventoryUpdates(productIds: string[], callback: (update: {
    productId: string;
    shadeId?: string;
    availableQuantity: number;
    status: string;
  }) => void): () => void {
    // WebSocket or Server-Sent Events implementation would go here
    // For now, return a cleanup function
    return () => {
      // Cleanup subscription
    };
  }
}

export const inventoryService = new InventoryService();

// Utility functions
export const getStockStatus = (inventory: InventoryItem): {
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  message: string;
  color: 'green' | 'yellow' | 'red';
} => {
  if (inventory.availableQuantity <= 0) {
    return {
      status: 'out_of_stock',
      message: 'Out of Stock',
      color: 'red',
    };
  }

  if (inventory.availableQuantity <= inventory.reorderPoint) {
    return {
      status: 'low_stock',
      message: `Only ${inventory.availableQuantity} left`,
      color: 'yellow',
    };
  }

  return {
    status: 'in_stock',
    message: 'In Stock',
    color: 'green',
  };
};

export const formatStockMovementType = (type: StockMovement['type']): string => {
  const types = {
    inbound: 'Stock Added',
    outbound: 'Stock Removed',
    adjustment: 'Inventory Adjustment',
    reservation: 'Reserved',
    release: 'Reservation Released',
  };
  
  return types[type] || type;
};

export default inventoryService;
