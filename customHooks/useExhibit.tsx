import React, { createContext, useContext, useState } from "react";

interface ExhibitContextType {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    total: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
    items: object[];
    setItems: React.Dispatch<React.SetStateAction<object[]>>;
  }
  
  const Context = createContext<ExhibitContextType | null>(null);

const  ContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [items, setItems] = useState<object[]>([]);

  return <Context.Provider value={{quantity, setQuantity, total, setTotal, items, setItems}}>{children}</Context.Provider>;
};

export default ContextProvider;

export const useExhibit = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error("useExhibit must be used within a ContextProvider");
    }
    return context;
};
