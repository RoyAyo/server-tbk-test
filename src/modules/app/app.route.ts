import express from "express";

//routes
import EventRoute from "../events/event.route";
import UserRoute from "../users/user.route";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/users",
    route: UserRoute
  },
  {
    path: "/events",
    route: EventRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;