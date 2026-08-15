'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, CustomizationSpec, ColorOption } from './types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ColorOption, customization?: CustomizationSpec, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kultzr_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse cart from storage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Sync cart to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('kultzr_cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (
    product: Product, 
    size: string, 
    color: ColorOption, 
    customization?: CustomizationSpec,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${size}-${color.name}-${customization ? JSON.stringify(customization.custom_text || '') : 'standard'}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.cart_item_id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cart_item_id: itemId,
            product,
            quantity,
            size,
            color,
            customization
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cart_item_id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cart_item_id === cartItemId ? { ...item, quantity: newQty } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
