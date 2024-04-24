// import { useMemo } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { shallow } from "zustand/shallow";

export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface Item {
  id: string;
  price: number;
  quantity: number;
}

export interface OfflineItem {
  id: string;
  imageUrl: string;
  desc: string;
  price: number;
  quantity: number;
}

type IData = {
  favData: IExhibit[];
  cartData: IExhibit[];
  addFavData: (data: IExhibit[]) => void;
  addCartData: (data: IExhibit[]) => void;
};

type Select = {
  selectAll: boolean;
  toggleSelectAll: () => void;
};

type Len = {
  cartLen: number;
  favLen: number;
  setCartLen: (val: number) => void;
  setFavLen: (val: number) => void;
};

type Profile = {
  info: IUser;
  setProfile: (info: IUser) => void;
  clearProfile: () => void;
};

interface Exhibit {
  total: number;
  quantity: number;
  items: Item[];
  addItem: (val: Item[] | Item) => void;
  updateItem: (id: string, quantity: number) => void;
  removeItem: (val: string) => void;
  addTotal: () => void;
  removeTotal: (id: string) => void;
  clearExhibit: () => void;
}

interface OfflineExhibit
  extends Omit<Exhibit, "items" | "addItem"> {
  items: OfflineItem[];
  addItem: (val: OfflineItem) => void;
}

export const useSelect = create<Select>((set) => ({
  selectAll: false,
  toggleSelectAll: () => set((state) => ({ selectAll: !state.selectAll })),
}));

export const useLen = create<Len>((set) => ({
  cartLen: 0,
  favLen: 0,
  setCartLen: (val) => set({ cartLen: val }),
  setFavLen: (val) => set({ favLen: val }),
}));

export const useProfile = create<Profile>()(
  persist(
    (set) => ({
      info: {
        _id: "",
        username: "",
        email: "",
      },
      setProfile: (profile) => set({ info: profile }),
      clearProfile: () =>
        set({
          info: {
            _id: "",
            username: "",
            email: "",
          },
        }),
    }),
    {
      name: "profile",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useExhibit = create<Exhibit>()(
  persist(
    (set) => ({
      total: 0,
      quantity: 0,
      items: [],
      addItem: (val) =>
        set((state) => {
          const newItems = Array.isArray(val)
            ? [...val]
            : [...state.items, val];
          shallow;
          return {
            items: newItems,
          };
        }),
      updateItem: (id, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity,
              };
            }
            return item;
          });
          shallow;

          return { items: [...newItems] };
        }),
      removeItem: (id: string) =>
        set((state) => {
          const newItems =
            id !== "" ? state.items.filter((item) => item.id !== id) : [];
          shallow;
          // state.addTotal()
          return {
            total: newItems.length === 0 ? 0 : state.total,
            quantity: newItems.length === 0 ? 0 : state.quantity,
            items: newItems,
          };
        }),
      addTotal: () =>
        set((state) => {
          const result = state.items.reduce(
            (acc, curr) => {
              const totalPrice = acc.total + curr.price * curr.quantity;
              const totalQuantity = acc.totalQuantity + curr.quantity;
              return { total: totalPrice, totalQuantity: totalQuantity };
            },
            { total: 0, totalQuantity: 0 }
          );
          shallow;
          return {
            ...state,
            total: result.total,
            quantity: result.totalQuantity,
          };
        }),
      removeTotal: (id) =>
        set((state) => {
          let total = state.total;
          const item = state.items.find((item) => item.id !== id);
          if (item) {
            total -= item.price * item.quantity;
          }

          return { ...state, total };
        }),
      // clearExhibit: () => set({ total: 0, quantity: 0, items: [] }),
      clearExhibit: () => {
        // localStorage.removeItem("exhibit");
        set({ total: 0, quantity: 0, items: [] });
      },
    }),
    {
      name: "exhibit",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useData = create<IData>((set) => ({
  favData: [],
  cartData: [],
  addFavData: (data) => set({ favData: data }),
  addCartData: (data) => set({ cartData: data }),
}));

export const useOfflineExhibit = create<OfflineExhibit>()(
  persist(
    (set) => ({
      total: 0,
      quantity: 0,
      items: [],
      addItem: (val) =>
        set((state) => {
          const existingObj = state.items.find((item) => item.id === val.id);
          if (existingObj) {
            return {}
          }

          const newItems = [...state.items, val];
          return {
            items: newItems,
          };
        }),
      updateItem: (id, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity,
              };
            }
            return item;
          });
          shallow;

          return { items: [...newItems] };
        }),
      removeItem: (id: string) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return {
            // total: newItems.length === 0 ? 0 : state.total,
            // quantity: newItems.length === 0 ? 0 : state.quantity,
            items: newItems,
          };
        }),
      addTotal: () =>
        set((state) => {
          const result = state.items.reduce(
            (acc, curr) => {
              const totalPrice = acc.total + curr.price * curr.quantity;
              const totalQuantity = acc.totalQuantity + curr.quantity;
              return { total: totalPrice, totalQuantity: totalQuantity };
            },
            { total: 0, totalQuantity: 0 }
          );
          shallow;
          return {
            ...state,
            total: result.total,
            quantity: result.totalQuantity,
          };
        }),
      removeTotal: (id) =>
        set((state) => {
          let total = state.total;
          const item = state.items.find((item) => item.id !== id);
          if (item) {
            total -= item.price * item.quantity;
          }

          return { ...state, total };
        }),
        clearExhibit: () => {
          set({ total: 0, quantity: 0, items: [] });
        },
    }),
    {
      name: "offlineExhibit",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// [
//   {
//     "seller": "Will Smith",
//     "desc": "Famout painting",
//     "price": "40000",
//     "imageUrl": "",
//     "category":"art"
//   },
//   {
//     "seller": "Jeff Bezos",
//     "desc": "Famout painting",
//     "price": "75000",
//     "imageUrl": "",
//     "category": "art"
//   },
//   {
//     "seller": "Bill Gates",
//     "desc": "Famout painting",
//     "price": "340000",
//     "imageUrl": "",
//     "category": "art"
//   },
//   {
//     "seller": "Sam Smith",
//     "desc": "Famout painting",
//     "price": "605000",
//     "imageUrl": "",
//     "category": "art"
//   }
// ]
