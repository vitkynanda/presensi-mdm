/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
// import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import VirtualReality from "layouts/virtual-reality";
// Soft UI Dashboard React icons
// import CreditCard from "components/Icons/CreditCard";
// import Cube from "components/Icons/Cube";
// import Settings from "components/Icons/Settings";
// import Shop from "components/Icons/Shop";

import { lazy, Suspense } from "react";

import Office from "components/Icons/Office";
import Document from "components/Icons/Document";
import CustomerSupport from "components/Icons/CustomerSupport";
import SpaceShip from "components/Icons/SpaceShip";
import FallbackUI from "layouts/fallback-ui";

const Profile = lazy(() => import("layouts/profile"));
const SignIn = lazy(() => import("layouts/authentication/sign-in"));
const SignUp = lazy(() => import("layouts/authentication/sign-up"));
const Managements = lazy(() => import("layouts/management"));

const routes = [
  // {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   route: "/dashboard",
  //   icon: <Shop size="12px" />,
  //   component: <Dashboard />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: (
      <Suspense fallback={<FallbackUI />}>
        <Profile />
      </Suspense>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Managements",
    key: "managements",
    route: "/managements",
    icon: <Office size="12px" />,

    component: (
      <Suspense fallback={<FallbackUI />}>
        <Managements />
      </Suspense>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: (
      <Suspense fallback={<FallbackUI />}>
        <SignIn />
      </Suspense>
    ),
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: (
      <Suspense fallback={<FallbackUI />}>
        <SignUp />
      </Suspense>
    ),
    noCollapse: true,
  },
];

export default routes;

export const newRoutes = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
];
