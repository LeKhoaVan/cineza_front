import Home from "../pages/Home";
import Rap from "../pages/Rap";
import VTDL from "../pages/VTDL";
import VTDLLevel from "../pages/VTDLLevel";
import VTDLDetail from "../pages/VTDLDetail";
import User from "../pages/User";
import UserLevel from "../pages/UserLevel";
import Sidebar from "../components/Layouts/Sidebar";
import UserDetail from "../pages/UserDetail";
import SidebarHierarchyStructure from "../components/Layouts/SideBarHierarychStructure";
import HierarchyStructure from "../pages/HierarchyStructure";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import PromotionHeader from "../pages/PromotionHeader";
import PromotionLine from "../pages/PromotionLine";
import Room from "../pages/Room";
import Seat from "../pages/Seat";
import Movie from "../pages/Movie";
import OtherProduct from "../pages/OtherProduct";
import PriceHeader from "../pages/PriceHeader";
import Price from "../pages/Price";
import Show from "../pages/Show";
import Ticket from "../pages/Ticket";
import TicketBook from "../pages/TicketBook";
import Order from "../pages/Order";
import Statistics from "../pages/Statistics";

const publicRouter = [
  // { path: "/login", componet: Login, layout: DefaultLayout, sidebar: Sidebar },
  { path: "/home", componet: Home, layout: DefaultLayout, sidebar: Sidebar },
  {
    path: "/hierarchy-structure",
    componet: HierarchyStructure,
    layout: DefaultLayout,
    sidebar: SidebarHierarchyStructure,
  },
  {
    path: "/vtdl",
    componet: VTDL,
    layout: DefaultLayout,
    sidebar: SidebarHierarchyStructure,
  },
  {
    path: "/users",
    componet: UserLevel,
    layout: DefaultLayout,
    sidebar: SidebarHierarchyStructure,
  },
  {
    path: "/user-level",
    componet: User,
    layout: DefaultLayout,
    sidebar: SidebarHierarchyStructure,
  },
  {
    path: "/vtdl/level",
    componet: VTDLLevel,
    layout: DefaultLayout,
    sidebar: SidebarHierarchyStructure,
  },
  {
    path: "/rap",
    componet: Rap,
    layout: DefaultLayout,
    sidebar: Sidebar,
  },
  {
    path: "/rap/code",
    componet: Room,
    layout: DefaultLayout,
    sidebar: Sidebar,
  },
  {
    path: "/room/code",
    componet: Seat,
    layout: DefaultLayout,
    sidebar: Sidebar,
  },
  {
    path: "/text",
    componet: UserDetail,
    layout: DefaultLayout,
    sidebar: SidebarHierarchyStructure,
  },
  {
    path: "/promotions",
    componet: PromotionHeader,
    layout: DefaultLayout,
    sidebar: SidebarHierarchyStructure,
  },
  {
    path: "/promotion/code",
    componet: PromotionLine,
    layout: DefaultLayout,
    sidebar: SidebarHierarchyStructure,
  },
  { path: "/movie", componet: Movie, layout: DefaultLayout, sidebar: Sidebar },
  {
    path: "/other-product",
    componet: OtherProduct,
    layout: DefaultLayout,
    sidebar: Sidebar,
  },
  {
    path: "/price",
    componet: PriceHeader,
    layout: DefaultLayout,
    sidebar: Sidebar,
  },
  {
    path: "/price/code",
    componet: Price,
    layout: DefaultLayout,
    sidebar: Sidebar,
  },
  { path: "/show", componet: Show, layout: DefaultLayout, sidebar: Sidebar },
  {
    path: "/ticket",
    componet: Ticket,
    layout: DefaultLayout,
    sidebar: Sidebar,
  },
  {
    path: "/order",
    componet: Order,
    layout: DefaultLayout,
    sidebar: Sidebar,
  },
  {
    path: "/book-ticket",
    componet: TicketBook,
    layout: DefaultLayout,
    sidebar: Sidebar,
  },
  {
    path: "/statistics",
    componet: Statistics,
    layout: DefaultLayout,
    sidebar: Sidebar,
  }
];

const privateRouter = [];

export { publicRouter, privateRouter };
