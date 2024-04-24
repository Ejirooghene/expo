import { useQuery, useMutation } from "react-query";
import axios from "axios";

type IPayload = {
  userId: string;
  itemId: string | string[];
};

export const getExhibition = (category: string) => {
  const response = useQuery(category, async () => {
    const res = await axios(
      `https://expo-backend-wq1h.onrender.com/exhibit?category=${category}`
    );
    return res.data;
  });

  return response;
};

export const getOfflineExhibition = () => {
  const response = useQuery("exhibits", async () => {
    const res = await axios(
      `https://expo-backend-wq1h.onrender.com/exhibit?category=`
    );
    return res.data.sort(() => Math.random() - 0.5);
  }, { staleTime: Infinity});

  return response
};

export const addFavorite = () => {
  const { data, ...props } = useMutation(
    "addFavorite",
    async (payload: IPayload) => {
      const res = await axios.post(
        "https://expo-backend-wq1h.onrender.com/exhibit/favorite",
        payload
      );
      return res.data;
    }
  );

  return { data, ...props };
};

export const getFavorites = (id: string) => {
  const response = useQuery(["favorite", id], async () => {
    const res = await axios(`https://expo-backend-wq1h.onrender.com/exhibit/favorite?id=${id}`);
    return res.data;
  });

  return response;
};

export const addCart = () => {
  const { data, ...props } = useMutation(
    "addCart",
    async (payload: IPayload) => {
      const res = await axios.post(
        "https://expo-backend-wq1h.onrender.com/exhibit/cart",
        payload
      );
      return res.data;
    }
  );

  return { data, ...props };
};

export const getCart = (id: string) => {
  const response = useQuery(["cart", id], async () => {
    const res = await axios(`https://expo-backend-wq1h.onrender.com/exhibit/cart?id=${id}`);
    return res.data;
  });

  return response;
};

export const removeCart = () => {
  const response = useMutation("removeCart", async (payload: IPayload) => {
    const res = await axios.delete("https://expo-backend-wq1h.onrender.com/exhibit/cart", {
      data: payload,
    });
    return res.data;
  });

  return response;
};

export const addPurchase = () => {
  const response = useMutation(
    "addPurchase",
    async (payload: { userId: string; itemIds: string[] }) => {
      const res = await axios.post(
        "https://expo-backend-wq1h.onrender.com/exhibit/purchase",
        payload
      );
      return res.data;
    }
  );

  return response;
};

export const getPurchase = (id: string) => {
  const response = useQuery("purchase", async () => {
    const res = await axios(`https://expo-backend-wq1h.onrender.com/exhibit/purchase?id=${id}`);
    return res.data;
  });

  return response;
};

export const getRecommendation = (id: string) => {
  const response = useQuery(["recommend", id], async () => {
    const res = await axios(`https://expo-python.onrender.com/recommend/${id}`);
    return res.data;
  });

  return response;
};


export const addPreferences = () => {
  const response = useMutation("preferences", async (payload: {userId: string, preferences: string[]}) => {
    const res = await axios.post("https://expo-backend-wq1h.onrender.com/exhibit/preferences", payload)
    return res.data;
  });

  return response;
}