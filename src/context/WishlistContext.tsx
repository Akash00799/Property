"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PropertyPlot } from "@/types/property";
import { DEMO_PROPERTIES } from "@/data/properties";

interface WishlistContextType {
  wishlistIds: string[];
  wishlistPlots: PropertyPlot[];
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("terra_wishlist_ids");
      if (stored) {
        setWishlistIds(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      let updated: string[];
      if (prev.includes(id)) {
        updated = prev.filter((item) => item !== id);
      } else {
        updated = [...prev, id];
      }
      try {
        localStorage.setItem("terra_wishlist_ids", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const clearWishlist = () => {
    setWishlistIds([]);
    try {
      localStorage.removeItem("terra_wishlist_ids");
    } catch {
      // ignore
    }
  };

  const isInWishlist = (id: string) => wishlistIds.includes(id);

  const wishlistPlots = DEMO_PROPERTIES.filter((p) => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistPlots,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        count: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
