import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import enUS from "./icons/enUS.svg";
import ptBR from "./icons/ptBR.svg";

export const locales = ["ptBR", "enUS"] as const;
export type Locale = (typeof locales)[number];

interface LocaleData {
  flag: StaticImport;
  label: string;
}

export const localesData: Record<Locale, LocaleData> = {
  ptBR: {
    flag: ptBR,
    label: "Português",
  },
  enUS: {
    flag: enUS,
    label: "English",
  },
};

export const routing = defineRouting({
  locales,
  defaultLocale: "ptBR",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
