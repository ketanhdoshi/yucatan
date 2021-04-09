/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/* 
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js"; */

import Home from "../../appscreens/Home.js";
import PropertiesView from "../../features/properties/PropertiesView.js";
import MatchesView from "../../features/matches/MatchesView.js";
import ShortlistView from "../../appscreens/ShortlistView.js";
import Dashboard1 from "../../appscreens/Dashboard1.js";
import Dashboard2 from "../../appscreens/Dashboard2.js";
import PostView from "../../features/posts/PostView.js";
import UiButtonView from "../../appscreens/UiButtonView.js";
import UiFormView from "../../appscreens/UiFormView.js";
import UiGeneralView from "../../appscreens/UiGeneralView.js";
import {Icons} from "./screens/Icons.js";
import UserProfile from "./screens/UserProfile.js";
import TableView from "./screens/TableView.js";
import TextFont from "./screens/TextFont.js";
import Notifications from "./screens/Notifications.js";

const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Home,
    layout: "/main",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Home,
    layout: "/main",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/main",
  },
  {
    path: "/table",
    name: "Table View",
    icon: "nc-icon nc-notes",
    component: TableView,
    layout: "/main",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: TextFont,
    layout: "/main",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/main",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Home,
    layout: "/main",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/main",
  },
  {
    path: "/ui/button",
    name: "UiButton",
    icon: "nc-icon nc-chart-pie-36",
    component: UiButtonView,
    layout: "/main",
  },
  {
    path: "/ui/form",
    name: "UiForm",
    icon: "nc-icon nc-controller-modern",
    component: UiFormView,
    layout: "/main",
  },
  {
    path: "/ui/general",
    name: "UiGeneral",
    icon: "nc-icon nc-headphones-2",
    component: UiGeneralView,
    layout: "/main",
  },
  {
    path: "/properties",
    name: "Properties",
    icon: "nc-icon nc-bank",
    component: PropertiesView,
    layout: "/main",
  },
  {
    path: "/matches",
    name: "Matches",
    icon: "nc-icon nc-bulb-63",
    component: MatchesView,
    layout: "/main",
    redirect: true
  },
  {
    path: "/dashboard1",
    name: "Dashboard 1",
    icon: "nc-icon nc-battery-81",
    component: Dashboard1,
    layout: "/main",
    redirect: true
  },
  {
    path: "/dashboard2",
    name: "Dashboard 2",
    icon: "nc-icon nc-backpack",
    component: Dashboard2,
    layout: "/main",
    redirect: true
  },
  {
    path: "/posts",
    name: "Posts",
    icon: "nc-icon nc-apple",
    component: PostView,
    layout: "/main",
    redirect: true
  },
  {
    path: "/shortlist",
    name: "Shortlist",
    icon: "nc-icon nc-cctv",
    component: ShortlistView,
    layout: "/main",
    redirect: true
  },

]

export default dashboardRoutes;
