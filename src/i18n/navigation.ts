import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
import NextLink from "next/link";

export { NextLink as Link };
export { redirect, usePathname, useRouter } from "next/navigation";
export const { getPathname } = createNavigation(routing);
