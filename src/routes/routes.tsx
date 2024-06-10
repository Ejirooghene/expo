import { createBrowserRouter } from "react-router-dom";
import Collections from "../pages/home/collections/main";
import {
  Dashboard,
  Arts,
  Shoes,
  Furnitures,
  Bags,
  Hats,
  Favorite,
  PersonalCareProducts,
  WeldingAndFab
} from "../pages/home";
import Cart from "../pages/home/Cart";
import Auth from "../pages/auth/main";
import Landing from "../pages/Landing";
import Payment from "../pages/home/Payment";
import Preferences from "../pages/home/Preferences";
import Products from "../pages/Products";
import OfflineCart from "../pages/OfflineCart";
import FashionDesign from "../pages/home/collections/FashionDesign";
import Others from "../pages/home/collections/Others";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/products", element: <Products /> },
  { path: "/cart", element: <OfflineCart /> },
  { path: "/auth", element: <Auth /> },
  { path: "/preferences", element: <Preferences /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "collections",
        element: <Collections />,
        children: [
          { path: "arts", element: <Arts /> },
          { path: "shoes", element: <Shoes /> },
          { path: "bags", element: <Bags /> },
          { path: "furnitures", element: <Furnitures /> },
          { path: "hats-design", element: <Hats /> },
          { path: "personal-care-products", element: <PersonalCareProducts /> },
          { path: "welding-and-fabrication", element: <WeldingAndFab /> },
          { path: "Fashion-Designing", element: <FashionDesign /> },
          { path: "Others", element: <Others /> },
        ],
      },
      { path: "cart", element: <Cart /> },
      { path: "payment", element: <Payment /> },
      { path: "favorite", element: <Favorite /> },
    ],
  }
]);

export default router;
