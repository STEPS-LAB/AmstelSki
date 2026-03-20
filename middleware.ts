import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware({
  ...routing,
  localePrefix: "never",
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
