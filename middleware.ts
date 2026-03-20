// Middleware disabled for static routing
// import createMiddleware from "next-intl/middleware";
// import { routing } from "./src/i18n/routing";

// export default createMiddleware({
//   ...routing,
//   localePrefix: "never",
// });

// export const config = {
//   matcher: ["/((?!_next|.*\\..*).*)"],
// };

export function middleware() {
  // No-op middleware for static routing
}

export const config = {
  matcher: [],
};
