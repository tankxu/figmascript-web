import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("custom-script", "routes/custom-script.tsx"),
] satisfies RouteConfig;
