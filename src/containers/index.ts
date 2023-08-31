import { lazy } from "react";

export const Vessel = lazy(() => import("./Vessel"));
export const Dashboard = lazy(() => import("./Dashboard"));
export const Flight = lazy(() => import("./Flight"));
export const Price = lazy(() => import("./Price"));
export const Login = lazy(() => import("./Login"));
export const Locations = lazy(() => import("./Itineraries/Locations"));
export const Ports = lazy(() => import("./Itineraries/Ports"));
export const Routes = lazy(() => import("./Itineraries/Routes"));
export const Bookings = lazy(() => import("./Booking"));
