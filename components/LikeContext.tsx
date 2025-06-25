import React, { createContext, useContext, useState, ReactNode } from 'react';

type LikeContextType = {
  likedPins: string[];
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
};

const LikeContext = createContext<LikeContextType | undefined>(undefined);

type LikeProviderProps = {
  children: ReactNode;
};

export const LikeProvider = ({ children }: LikeProviderProps) => {
  const [likedPins, setLikedPins] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedPins(prev => {
      if (prev.includes(id)) {
        return prev.filter(pinId => pinId !== id); // entfernen
      } else {
        return [id, ...prev]; // hinzufügen oben (neueste zuerst)
      }
    });
  };

  const isLiked = (id: string) => likedPins.includes(id);

  return (
    <LikeContext.Provider value={{ likedPins, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = (): LikeContextType => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLike must be used within a LikeProvider');
  }
  return context;
};
