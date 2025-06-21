import React, { createContext, useContext, useState } from 'react';

type LikeContextType = {
  likedPins: Set<string>;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
};

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export const LikeProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedPins, setLikedPins] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedPins(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const isLiked = (id: string) => likedPins.has(id);

  return (
    <LikeContext.Provider value={{ likedPins, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLike must be used within a LikeProvider');
  }
  return context;
};
